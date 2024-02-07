const mainCg = document.querySelector("#mainCg");
const urlCg = "http://localhost:3001/cuidadores";
const genderSelectCg = document.querySelector("#nombreCg");
const ageSelectCg = document.querySelector("#edadCg");
const citySelectCg = document.querySelector("#ciudadCg");
const btnCerrarSesion = document.getElementById("btn-cerrarSesion");


document.addEventListener("DOMContentLoaded", function () {
	//preloader
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);

	// Cargar usuarios al inicio
	loadUsers();
});


// Event listeners para los elementos <select>
genderSelectCg.addEventListener("change", function (event) {
	loadUsers();
});
ageSelectCg.addEventListener("change", function (event) {
	loadUsers();
});
citySelectCg.addEventListener("change", function (event) {
	loadUsers();
});

// Función para cargar usuarios al inicio
async function loadUsers() {
	const response = await fetch(urlCg);
	const data = await response.json();

	let dataFilter = data
		.filter(filterByAge)
		.filter(filterByCity)
		.filter(filterByGender);
	console.log(dataFilter);

	console.log("Bogota".includes("Bogotá"));
	printUsers(dataFilter);
}

function filterByCity(user) {
	if (citySelectCg.value == "") {
		return user;
	}

	return user.cityCg == citySelectCg.value;
}

function filterByAge(user) {
	if (ageSelectCg.value == "") {
		return user;
	}

	if (ageSelectCg.value == "18-30") {
		console.log(Number(user) >= 18);
		return Number(user.ageCg) >= 18 && Number(user.ageCg) <= 30;
	}

	if (ageSelectCg.value == "31-40") {
		return Number(user.ageCg) >= 31 && Number(user.ageCg) <= 40;
	}

	if (ageSelectCg.value == "41-50") {
		return Number(user.ageCg) >= 41 && Number(user.ageCg) <= 50;
	}

	if (ageSelectCg.value == "51-60") {
		return Number(user.ageCg) >= 51 && Number(user.ageCg) <= 60;
	}

	if (ageSelectCg.value > "60+") {
		return Number(user.ageCg) > 60;
	}
}

function filterByGender(user) {
	if (genderSelectCg.value == "") {
		return user;
	}

	return user.genderCg == genderSelectCg.value;
}

// Función para imprimir usuarios en el contenedor principal
function printUsers(data) {
	mainCg.innerHTML = ""; // Limpiar el contenido existente
	data.forEach((user) => {
		mainCg.innerHTML += `
				<div class="card">
					<div class="wrapper">
					<div class="profile">
						<img src="${user.profilePicCg}" class="thumbnail" id="imgCaregiver"/>
						<h3 class="name" id="nameUserCg">${user.nameCg}</h3>
						<div class="rating-container" id="rating-container">
							<div class="star" data-value="1">&#9733;</div>
							<div class="star" data-value="2">&#9733;</div>
							<div class="star" data-value="3">&#9733;</div>
							<div class="star" data-value="4">&#9733;</div>
							<div class="star" data-value="5">&#9733;</div>
					</div>
					<button type="button" class="btn"></button>
				</div>
				<div class="social-icons">
					<div class="info">
						<div class="icon">
							<h4 id="ageDisplayCg">${user.ageCg}</h4>
							<p>Edad</p>
					</div>
					<div class="icon">
						<h4 id="cityCg">${user.cityCg}</h4>
						<p>Ciudad</p>
					</div>
				</div>
					<div class="info">
						<div class="icon">
							<h4 id="genderCg">${user.genderCg}</h4>
							<p>Género</p>
						</div>
						<div class="icon">
							<h4 id="workScheduleCg">${user.scheduleCg}</h4>
							<p>Jornada laboral</p>
						</div>
					</div>
				</div>
				<div class="buttons">
					<button class="dislike" data-id="${user.idCg}" onclick="dislikeAction(this)">
						No me gusta
					</button>
					<button class="like" data-id="${user.idCg}" onclick="likeAction(this)">Me gusta</button>
				</div>
			</div>
		</div>
	`;
	});
}

// Cards Animations
async function likeAction(btn) {
	const chat = document.querySelector(".chat");
	const idCg = btn.getAttribute("data-id");

	const respuesta = await fetch(`${urlCg}/${idCg}`);
	const data = await respuesta.json();
	console.log(data);

	chat.innerHTML += `
	<li class="message">
	<button data-bs-toggle="modal" data-bs-target="#chatModal" type="submit" class="btn-chat">
	<img class="logo" src="${data.profilePicCg}" alt=""/>
	<p class="nameChat">Haz click para chatear con <strong>${data.nameCg}</strong></p>
	</button>
	</li>
	`;

	const card = btn.closest(".card");
	card.classList.add("like-animation");
	setTimeout(() => {
		card.remove();
	}, 1000);
}

function dislikeAction(button) {
	const card = button.closest(".card");
	card.classList.add("dislike-animation");
	setTimeout(() => {
		card.remove();
	}, 1000);
}

function sendMessage() {
	let messageInput = document.getElementById("messageInput");
	let chatMessages = document.getElementById("chatMessages");

	let message = messageInput.value;

	if (message.trim() !== "") {
		let newMessage = document.createElement("div");
		newMessage.textContent = message;
		chatMessages.appendChild(newMessage);

		// Limpiar el cuadro de entrada
		messageInput.value = "";

		// Desplazar el scroll hacia abajo para mostrar el nuevo mensaje
		chatMessages.scrollTop = chatMessages.scrollHeight;
	}
}

async function findProfile(button) {
	const contenedorInfo = document.querySelector("#FindprofileContainer");

	const idCg = button.getAttribute("data-id");
	const respuesta = await fetch(`${url}/${idCg}`);
	const data = await respuesta.json();

	contenedorInfo.innerHTML = `
		<div
			class="modal fade"
			id="infoProfile"
			tabindex="-1"
			role="dialog"
			aria-labelledby="infoProfile"
			aria-hidden="false"
			>
			<div class="modal-dialog modal-dialog-centered" role="document">
				<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
					<button
					type="button"
					class="close"
					data-dismiss="modal"
					aria-label="Close"
					>
					<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">...</div>
				<div class="modal-footer">
					<button
					type="button"
					class="btn btn-secondary"
					data-dismiss="modal"
					>
					Close
					</button>
					<button type="button" class="btn btn-primary">Save changes</button>
				</div>
				</div>
			</div>
			</div>
			`;
	console.log(data);
	console.log(contenedorInfo);
}

btnCerrarSesion.addEventListener("click", ()=>{
	cerrarSesion()
})
const main = document.querySelector("#mainCb");
const url = "http://localhost:3001/beneficiarios";
const genderSelect = document.querySelector("#nombre");
const ageSelect = document.querySelector("#edad");
const citySelect = document.querySelector("#ciudad");
const cerrarsesion = document.querySelector("#sesionCerrar");

document.addEventListener("DOMContentLoaded", function () {
	// Preloader
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);

	// Cargar usuarios al inicio
	loadUsers();
});

//cerrar sesión
function cerrarSesion() {
	const verificarExistenciaCbId = localStorage.getItem("userId");
	const verificarExistenciaCgId = localStorage.getItem("userIdCg");

	if ((verificarExistenciaCbId || verificarExistenciaCgId) == null) {
		alert("No tienes sesión que cerrar");
		return;
	}
	localStorage.removeItem("userId");
	localStorage.removeItem("userIdCg");
	window.location.href = "index.html";
}
cerrarsesion.addEventListener("click", () => {
	cerrarSesion();
});

// Event listeners para los elementos <select>
genderSelect.addEventListener("change", function (event) {
	loadUsers();
});
ageSelect.addEventListener("change", function (event) {
	loadUsers();
});
citySelect.addEventListener("change", function (event) {
	loadUsers();
});

// Función para cargar usuarios al inicio
async function loadUsers() {
	const response = await fetch(url);
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
	if (citySelect.value == "") {
		return user;
	}

	return user.cityCb == citySelect.value;
}

function filterByAge(user) {
	if (ageSelect.value == "") {
		return user;
	}

	if (ageSelect.value == "18-30") {
		console.log(Number(user) >= 18);
		return Number(user.ageCb) >= 18 && Number(user.ageCb) <= 30;
	}

	if (ageSelect.value == "31-40") {
		return Number(user.ageCb) >= 31 && Number(user.ageCb) <= 40;
	}

	if (ageSelect.value == "41-50") {
		return Number(user.ageCb) >= 41 && Number(user.ageCb) <= 50;
	}

	if (ageSelect.value == "51-60") {
		return Number(user.ageCb) >= 51 && Number(user.ageCb) <= 60;
	}

	if (ageSelect.value > "60+") {
		return Number(user.ageCb) > 60;
	}
}

function filterByGender(user) {
	if (genderSelect.value == "") {
		return user;
	}

	return user.genderCb == genderSelect.value;
}

// Función para imprimir usuarios en el contenedor principal
function printUsers(data) {
	main.innerHTML = ""; // Limpiar el contenido existente
	data.forEach((user) => {
		main.innerHTML += `
            <div class="card">
                <div class="wrapper">
                    <div class="profile">
                        <img src="${user.profilePicCb}" class="thumbnail"/>
                        <h3 class="name">${user.nameCb}</h3>
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
                                <h4>${user.ageCb}</h4>
                                <p>Edad</p>
                            </div>
                            <div class="icon">
                                <h4>${user.cityCb}</h4>
                                <p>Ciudad</p>
                            </div>
                        </div>
                        <div class="info">
                            <div class="icon">
                                <h4>${user.genderCb}</h4>
                                <p>Género</p>
                            </div>
                            <div class="icon">
                                <h4>${user.scheduleCb}</h4>
                                <p>Jornada laboral</p>
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="dislike" data-id="${user.idCb}" onclick="dislikeAction(this)">
                            No me gusta
                        </button>
                        <button class="like" data-id="${user.idCb}" onclick='likeAction(this)'>Me gusta</button>
                    </div>
                </div>
            </div>
        `;
	});
}

// Cards Animations
async function likeAction(btn) {
	const chat = document.querySelector(".chat");
	const idCb = btn.getAttribute("data-id");

	const respuesta = await fetch(`${url}/${idCb}`);
	const data = await respuesta.json();
	console.log(data);

	chat.innerHTML += `
        <li class="message">
			<button data-bs-toggle="modal" data-bs-target="#chatModal" type="submit" class="btn-chat">
            <img class="logo" src="${data.profilePicCb}" alt=""/>
            <p class="nameChat">Haz click para chatear con <strong>${data.nameCb}</strong></p>
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

	const idCb = button.getAttribute("data-id");
	const respuesta = await fetch(`${url}/${idCb}`);
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

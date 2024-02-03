const mainCg = document.querySelector("#mainCg");
const urlCg = "http://localhost:3001/cuidadores";

//preloader
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);

	printUsers();
});

async function printUsers() {
	const response = await fetch(urlCg);
	const data = await response.json();
	console.log(data);
	data.forEach((user) => {
		mainCg.innerHTML += `
		<div class="card">
				<div class="wrapper">
					<div class="profile">
						<img
							src="${user.profilePicCg}"
							class="thumbnail"
						/>
						// <h3 class="name">${user.nameCg}</h3>
                            <p>${user.professionCg}</p>
						<div class="rating-container" id="rating-container">
							<!-- Se crean 5 estrellas con un ícono de estrella Unicode (☆) -->
							<div class="star" data-value="1">&#9733;</div>
							<div class="star" data-value="2">&#9733;</div>
							<div class="star" data-value="3">&#9733;</div>
							<div class="star" data-value="4">&#9733;</div>
							<div class="star" data-value="5">&#9733;</div>
						</div>

						<button type="button" class="btn">Give me a rating</button>
					</div>

					<div class="social-icons">
						<div class="info">
							<div class="icon">
								<h4>${user.ageCg}</h4>
								<p>Edad</p>
							</div>

							<div class="icon">
								<h4>${user.cityCg}</h4>
								<p>Ciudad</p>
							</div>
						</div>
						<div class="info">
							<div class="icon">
								<h4>${user.genderCg}</h4>
								<p>Género</p>
							</div>

							<div class="icon">
								<h4>${user.scheduleCg}</h4>
								<p>Jornada laboral</p>
							</div>
						</div>
					</div>
					<div class="buttons">
						<button class="dislike" data-id="${user.id}" onclick="dislikeAction(this)">
							No me gusta
						</button>
						<button class="like" data-id="${user.id}" onclick="likeAction(this)">Me gusta</button>
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
		<img
			class="logo"
			src="${data.profilePicCg}"
			alt=""
		/>
		<p class="nameChat">Haz click para chatear con <strong>${data.nameCg}</strong></p>
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

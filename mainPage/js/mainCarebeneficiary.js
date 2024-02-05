const main = document.querySelector("#mainCb");
const url = "http://localhost:3001/beneficiarios";

//preloader
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);

  printUsers();
});

async function printUsers() {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  data.forEach((user) => {
    main.innerHTML += `
		<div class="card">
				<div class="wrapper">
					<div class="profile">
						<img
							src="${user.profilePicCb}"
							class="thumbnail"
						/>
						// <h3 class="name">${user.nameCb}</h3>
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
						<button class="dislike" data-id="${user.id}" onclick="dislikeAction(this)">
							No me gusta
						</button>
						<button class="like" data-id="${user.id}" onclick="likeAction(this)">Me gusta</button>
						<button type="button" class="findProfile" data-id="${user.id}" onclick="findProfile(this)" data-toggle="modal" data-target="#infoProfile">
							Ver perfil
						</button>
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
		<img
			class="logo"
			src="${data.profilePicCb}"
			alt=""
		/>
		<p class="nameChat">Haz click para chatear con <strong>${data.nameCb}</strong></p>
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
      aria-hidden="true"
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

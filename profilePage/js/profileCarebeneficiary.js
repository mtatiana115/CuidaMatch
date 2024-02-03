//obtener datos
const url = "http://localhost:3001/beneficiarios";

const nameUser = document.querySelector("#nameUser");
const ageDisplay = document.querySelector("#ageDisplay");
const city = document.querySelector("#city");
const gender = document.querySelector("#gender");
const workSchedule = document.querySelector("#workSchedule");
const skills = document.querySelector("#skills");
const experience = document.querySelector("#experience");
const imgprofile = document.querySelector("#imgprofile");
const btnEditar = document.querySelector("#btn-editar");

//estrellas
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);

	const stars = document.querySelectorAll(".star");
	const result = document.getElementById("result");

	stars.forEach((star) => {
		star.addEventListener("click", () => {
			const value = parseInt(star.getAttribute("data-value"));
			updateRating(value);
		});
	});

	function updateRating(value) {
		stars.forEach((star) => {
			const starValue = parseInt(star.getAttribute("data-value"));
			star.classList.toggle("active", starValue <= value);
		});

		result.textContent = `Calificación: ${value} estrella${
			value !== 1 ? "s" : ""
		}`;
	}

	//Agregar usuario
	getUser();
});

async function getUser() {
	// const userId = "018";
	// localStorage.setItem("userId", "002")
	const userId = localStorage.getItem("userId");
	console.log(userId);
	try {
		console.log(`${url}/${userId}`);
		const response = await fetch(`${url}/${userId}`);
		const data = await response.json();
		console.log(data);

		//actualizar perfil despues de obtener los datos
		actualizarPerfil(data);
	} catch (error) {
		console.error("Error:", error);
	}
}

function actualizarPerfil(data) {
	console.log(data);
	if (!data) {
		console.log("Usuario no encontrado");
	} else {
		console.log("Actualizando:", data);
		imgprofile.src = data.profilePicCb;
		nameUser.textContent = data.nameCb;
		ageDisplay.textContent = data.ageCb;
		city.textContent = data.cityCb;
		experience.textContent = data.experienceCb;
		gender.textContent = data.genderCb;
		workSchedule.textContent = data.scheduleCb;
		data.skillsCb.forEach((element) => {
			skills.innerHTML += `<li>${element}</li>`;
		});
		// como subir la foto
	}
}

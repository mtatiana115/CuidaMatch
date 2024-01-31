//obtener datos
const url = "http://localhost:3001/beneficiarios";

const container = document.querySelector("#container");
const nameUser = document.querySelector("#nameUser");
const ageDisplay = document.querySelector("#ageDisplay");

//estrellas
document.addEventListener("DOMContentLoaded", function () {
	// const stars = document.querySelectorAll(".star");
	// const result = document.getElementById("result");

	// stars.forEach((star) => {
	// 	star.addEventListener("click", () => {
	// 		const value = parseInt(star.getAttribute("data-value"));
	// 		updateRating(value);
	// 	});
	// });

	// function updateRating(value) {
	// 	stars.forEach((star) => {
	// 		const starValue = parseInt(star.getAttribute("data-value"));
	// 		star.classList.toggle("active", starValue <= value);
	// 	});

	// 	result.textContent = `Calificación: ${value} estrella${
	// 		value !== 1 ? "s" : ""
	// 	}`;
	// }

	//Agregar usuario
	getUser();
});

async function getUser() {
	const userId = localStorage.getItem("userId");
	console.log(userId);
	try {
		console.log(`${url}/${userId}`);
		const response = await fetch(`${url}?idCb=${userId}`);
		const data = await response.json();
		console.log(data);

		//actualizar perfil despues de obtener los datos
		actualizarPerfil(data[0]);
	} catch (error) {
		console.error("Error:", error);
	}
}

function actualizarPerfil(data) {
	if (!data) {
		console.log("Usuario no encontrado");
	} else {
		console.log("Actualizando:", data);
		nameUser.textContent = data.nameCb;
		ageDisplay.textContent = data.ageCb;
	}
}

//obtener datos
const url = "http://localhost:3001/cuidadores";

const nameUserCg = document.querySelector("#nameUserCg");
const ageDisplayCg = document.querySelector("#ageDisplayCg");
const professionCg = document.querySelector("#professionCg");
const cityCg = document.querySelector("#cityCg");
const genderCg = document.querySelector("#genderCg");
const workScheduleCg = document.querySelector("#workScheduleCg");
const aboutMeCg = document.querySelector("#aboutMeCg");
const skillsCg = document.querySelector("#skillsCg");
const experienceCg = document.querySelector("#experienceCg");




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
	const userIdCaregiver = localStorage.getItem("userIdCg");
	console.log(userIdCaregiver);
	try {
		// console.log(`${url}/${userIdCaregiver}`);
		const response = await fetch(`${url}/${userIdCaregiver}`);
		const data = await response.json();
		console.log(data);

		//actualizar perfil despues de obtener los datos
		actualizarPerfil(data);
	} catch (error) {
		console.error("Error:", error);
	}
}


function actualizarPerfil(data) {
	if (!data) {
		console.log("Usuario no encontrado");
	} else {
		console.log("Actualizando:", data);

		nameUserCg.textContent = data.nameCg;
		ageDisplayCg.textContent = data.ageCg;
		cityCg.textContent = data.cityCg;
		experienceCg.textContent = data.experienceCg;
		genderCg.textContent = data.genderCg;
		professionCg.textContent = data.professionCg;
		workScheduleCg.textContent = data.scheduleCg;
		data.skillsCg.forEach((element) => {
			skillsCg.innerHTML += `<li>${element}</li>`;
		});
		//profilepic
	}

	editar();
}

const lista_datos = [];
let usuarioEliminar;
let actualizando = false;

function editar(){

	const btnEditar = document.querySelector("#btn-editar");

	btnEditar.forEach((boton) =>{
		boton.addEventListener("click", (event) =>{
			const datoEditar = boton.getAttribute("nombre-usuario");
			const usuarioEditar = lista_datos.find(
				(usuario) => usuario.dato == datoEditar
			);

			nameUserCg.value = usuarioEditar.name;
			ageDisplayCg.value = usuarioEditar.age;
			cityCg.value = usuarioEditar.city;
			experienceCg.value = usuarioEditar.experience;
			genderCg.value = usuarioEditar.gender;
			professionCg.value = usuarioEditar.profession;
			workScheduleCg.value = usuarioEditar.workSchedule;
			actualizando = true;

			datoEliminar = datoEditar;
		});
	});
}
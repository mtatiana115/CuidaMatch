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
const imgCaregiver = document.querySelector("#imgCaregiver")
// const holi = document.getElementById("holi")

//Selectores de Editar

// const nombreEditar = document.getElementById("nombre-editar");
// const edadEditar = document.getElementById("edad-editar");
// const generoEditar = document.getElementById("genero-editar");
// const ciudadEditar = document.getElementById("ciudad-editar");
// const horarioTrabajoEditar = document.getElementById("horarioTrabajo-editar");
// const interesesEditar = document.getElementById("intereses-editar");
// const experienciaEditar = document.getElementById("experiencia-editar");
// const formCambios = document.getElementById("cambios");






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
	console.log(data);
	if (!data) {
		console.log("Usuario no encontrado");
	} else {
		console.log("Actualizando:", data);
		imgCaregiver.src = data.profilePicCg;
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
		// holi.setAttribute("dataid", `${data.idCg}`)
	}

	
	// editar();
}



// function editar(){

// nombreEditar.value = nameUserCg.textContent;
// edadEditar.value = ageDisplayCg.textContent;
// generoEditar.value = genderCg.textContent;
// ciudadEditar.value = cityCg.textContent;
// horarioTrabajoEditar.value = workScheduleCg.textContent;



// formCambios.addEventListener("submit", (event)=>{
// 	event.preventDefault();
// 	document.getElementById("close").click();
// 	actualizarBaseDatos();
// 	getUser();
// });
// };

// async function actualizarBaseDatos(){
// 	const userIdCaregiver = localStorage.getItem("userIdCg");
// 	await fetch (`${url}/${userIdCaregiver}`,{
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json"
// 		},
// 		body: JSON.stringify({
// 	"idCg": "123456",
      
//       "nameCg": "Valeria Henao",
      
//       "passwordCg": "12356",
      
//       "idCg": "123456",
//       "ageCg": "28",
//       "cityCg": "Medellin",
//       "genderCg": "Femenino",
//       "scheduleCg": "Por horas",
//       "professionCg": "Psicologia",
//       "experienceCg": "toda la vida",
//       "skillsCg": [
//         "Acompañamiento a citas",
//         "Compañía constante",
//         "Actividades lúdicas o fisioterapia",
//         "Cuidados postoperatorios"
//       ]
		
// 	})
// });
// }

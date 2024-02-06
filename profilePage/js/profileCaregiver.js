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

//Selectores de Editar

const btnEnviarCambios = document.querySelector("#btn_submitCarebeneficiary")
const nameInputModal = document.getElementById("nameCaregiver");
const ageInputModal = document.getElementById("ageCaregiver");
const cityInputModal = document.getElementById("cityCaregiver");
const genderInputModal = document.getElementById("genderCaregiver");
const scheduleInputModal = document.getElementById("scheduleCaregiver");
const experienceInputModal = document.getElementById("experienceCaregiver");
const opciones_CuidadoInputModal = document.getElementById("opciones_Cuidado");
const edicion = false
const userIdCaregiver = localStorage.getItem("userIdCg");

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

	btnEnviarCambios.addEventListener("click", async(event)=>{
		try {

			const skillsModificate = []

			const response = await fetch(`${url}/${userIdCaregiver}`);

			const data = await response.json();
		

			opciones_CuidadoInputModal.querySelectorAll("input").forEach((input)=>{
				if(input.checked){
					skillsModificate.push(input.value)
				}
			})

			await fetch(`${url}/${userIdCaregiver}`,{
				method: "PUT",
				headers: {
					"Content-Type" : "application/json",
				},
				body: JSON.stringify({
					"profilePicCg": await data.profilePicCg,
     				"nameCg": nameInputModal.value,
      				"emailCg": await data.emailCg,
      				"passwordCg": await data.passwordCg,
      				"confirmPasswordCg": await data.confirmPasswordCg,
      				"idCg": data.idCg,
      				"ageCg": ageInputModal.value,
      				"cityCg":  cityInputModal.value,
      				"genderCg": genderInputModal.value,
      				"scheduleCg": scheduleInputModal.value,
      				"professionCg": await data.professionCg,
      				"experienceCg": experienceInputModal.value,
      				"skillsCg": skillsModificate
				})
			}
			
			);
	
			//actualizar perfil despues de obtener los datos
		} catch (error) {
			console.error("Error:", error);
		}
	})

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

		
		nameInputModal.value = data.nameCg;
		ageInputModal.value = data.ageCg;
		experienceInputModal.textContent = data.experienceCg;
		selectValue(cityInputModal, data.cityCg);
		selectValue(genderInputModal, data.genderCg)
		selectValue(scheduleInputModal, data.scheduleCg)

		opciones_CuidadoInputModal.querySelectorAll("input").forEach((input)=>{
			if(data.skillsCg.includes(input.value)){
				input.checked = "true"
			}
		})
	}	
};

function selectValue(select, dataValue){
	options = select.querySelectorAll("option");
	
	options.forEach((option)=>{
		if(option.value == dataValue ) {
			option.selected = "true"
		}
	})
};




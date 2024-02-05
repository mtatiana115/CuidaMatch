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

//Selectores de editar

const btnEnviarCambios = document.querySelector("#btn_submitCarebeneficiary")
const nameInputModal = document.getElementById("nameCarebeneficiary")
const ageInputModal = document.getElementById("ageCarebeneficiary")
const cityInputModal = document.getElementById("cityCarebeneficiary")
const genderInputModal = document.getElementById("genderCarebeneficiary")
const scheduleInputModal = document.getElementById("scheduleCarebeneficiary")
const experienceInputModal = document.getElementById("experienceCarebeneficiary")
const opciones_CuidadoInputModal = document.getElementById("opciones_Cuidado")
const edicion = false
const userIdCarebeneficiary = localStorage.getItem("userId")

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

	btnEnviarCambios.addEventListener("click", async(event) =>{
		try {
			const skillsModificate = []

			const response = await fetch(`${url}/${userIdCarebeneficiary}`);

			const data = await response.json();

			opciones_CuidadoInputModal.querySelectorAll("input").forEach((input) => {
				if(input.checked){
					skillsModificate.push(input.value)
				}
			})

			await fetch(`${url}/${userIdCarebeneficiary}`,{
				method: "PUT",
				headers: {
					"Content-Type" : "application/json",
				},
				body: JSON.stringify({
					
					"profilePicCb": await data.profilePicCb,
					"nameCb": nameInputModal.value,
					"emailCb": await data.emailCb,
      				"passwordCb": await data.passwordCb,
      				"confirmPasswordCb": await data.confirmPasswordCb,
      				"idCb": data.idCb,
      				"ageCb": ageInputModal.value,
      				"cityCb":  cityInputModal.value,
      				"genderCb": genderInputModal.value,
      				"scheduleCb": scheduleInputModal.value,
      				"professionCb": await data.professionCb,
      				"experienceCb": experienceInputModal.value,
      				"skillsCb": skillsModificate
				})
			}
			
			);

			//actualizar perfil después de obtener los datos
		} catch (error) {
			console.log("Error", error);
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

	console.log(userIdCarebeneficiary);
	try {
		// console.log(`${url}/${userIdCarebeneficiary}`);
		const response = await fetch(`${url}/${userIdCarebeneficiary}`);
		const data = await response.json();
		console.log(data);
		//actualizar perfil despues de obtener los datos
		actualizarPerfil(data);
	} catch (error) {
		console.error("Error:", error);
	}
}

function actualizarPerfil(data) {
	// console.log(data);
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
		

		nameInputModal.value = data.nameCb;
		ageInputModal.value = data.ageCb;
		experienceInputModal.textContent = data.experienceCb;
		selectValue(cityInputModal, data.cityCb);
		selectValue(genderInputModal, data.genderCb);
		selectValue(scheduleInputModal, data.scheduleCb);


		opciones_CuidadoInputModal.querySelectorAll("input").forEach((input)=>{
			if(data.skillsCb.includes(input.value)){
				input.checked = "true"
			}
		})
	}
};

function selectValue(select, dataValue){
	options = select.querySelectorAll("option");

	options.forEach((option) =>{
		if(option.value == dataValue){
			option.selected = "true"
		}
	})
};

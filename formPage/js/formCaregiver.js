const urlCg = "http://localhost:3001/cuidadores";
let selectedSkillsListCg = [];

//selectores
//2. primero selecciono el form para estar escuchando cuando el usuario haga submit, los user para cuando el usuario haga eso obtener la info y agregarla

const yourPicCaregiver = document.querySelector("#yourPicCaregiver");
const nameCaregiver = document.querySelector("#nameCaregiver");
const emailCaregiver = document.querySelector("#emailCaregiver");
const passwordCaregiver = document.querySelector("#passwordCaregiver");
const confirmPasswordCaregiver = document.querySelector(
	"#confirmPasswordCaregiver"
);
const idNumberCaregiver = document.querySelector("#idNumberCaregiver");
const ageCaregiver = document.querySelector("#ageCaregiver");
const cityCaregiver = document.querySelector("#cityCaregiver");
const genderCaregiver = document.querySelector("#genderCaregiver");
const scheduleCaregiver = document.querySelector("#scheduleCaregiver");
const professionCaregiver = document.querySelector("#professionCaregiver");
const experienceCaregiver = document.querySelector("#experienceCaregiver");
const skillsCaregiver = document.querySelector("#skillsCaregiver");
const hvFormCaregiver = document.querySelector("#hvFormCaregiver");

//EVENTOS
//cuando el usuario da submit

//++
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);
});

hvFormCaregiver.addEventListener("submit", (event) => {
	event.preventDefault();

	validateUserId();
});

//validar Id
async function validateUserId() {
	const userIdCg = idNumberCaregiver.value;
	const response = await fetch(urlCg);
	const data = await response.json();
	const isDuplicate = data.some((user) => user.idCg === userIdCg);

	if (isDuplicate) {
		alert("El número Id ingresado ya existe.");
	} else {
		getSkillsList();
	}
}

function getSkillsList() {
	const checkboxList = document.querySelectorAll(
		'.checkbox-list input[name="skills"]'
	);
	selectedSkillsListCg = Array.from(checkboxList)
		.filter((checkbox) => checkbox.checked)
		.map((checkbox) => checkbox.value);

	addUser();
}

//creo funcion y hago async fetch
async function addUser() {
	const newUserCg = {
		profilePicCg: yourPicCaregiver.value,
		nameCg: nameCaregiver.value,
		emailCg: emailCaregiver.value,
		idCg: idNumberCaregiver.value,
		ageCg: ageCaregiver.value,
		cityCg: cityCaregiver.value,
		genderCg: genderCaregiver.value,
		scheduleCg: scheduleCaregiver.value,
		professionCg: professionCaregiver.value,
		experienceCg: experienceCaregiver.value,
		skillsCg: selectedSkillsListCg,
		id: idNumberCaregiver.value,
	};

	//hago fetch para CREAR con POST
	const response = await fetch(urlCg, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUserCg),
	});

	const data = await response.json();
	console.log(data);
	// Obtengo el ID del nuevo usuario del input idNumberCaregiver
	const userIdCg = idNumberCaregiver.value;

	//almaceno ID en localstorage
	localStorage.setItem("userIdCg", newUserCg.id);
	window.location.href = "../profilePage/profileCaregiver.html";
}

//creo una funcion para obtener los usuarios y que esta sea llamada al domcontentload
function getUsers() {
	fetch(urlCg)
		.then((respuesta) => respuesta.json())
		.then((data) => console.log(data));
}

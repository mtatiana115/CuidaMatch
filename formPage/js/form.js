const urlBase = "http://localhost:3001/users";

//selectores
//2. primero selecciono el form para estar escuchando cuando el usuario haga submit, los user para cuando el usuario haga eso obtener la info y agregarla

const yourPicCarebeneficiary = document.querySelector(
	"#yourPicCarebeneficiary"
);
const nameCarebeneficiary = document.querySelector("#nameCarebeneficiary");
const emailCarebeneficiary = document.querySelector("#emailCarebeneficiary");
const idNumberCarebeneficiary = document.querySelector(
	"#idNumberCarebeneficiary"
);
const ageCarebeneficiary = document.querySelector("#ageCarebeneficiary");
const cityCarebeneficiary = document.querySelector("#cityCarebeneficiary");
const genderCarebeneficiar = document.querySelector("#genderCarebeneficiary");
const scheduleCarebeneficiary = document.querySelector(
	"#scheduleCarebeneficiary"
);
const experienceCarebeneficiary = document.querySelector(
	"#experienceCarebeneficiary"
);
const skillsCarebeneficiary = document.querySelector("#skillsCarebeneficiary");
const btnSubmitCarebeneficiar = document.querySelector(
	"#hvFormCarebeneficiary"
);

//EVENTOS
//cuando el usuario da submit

//++
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);
});

btnSubmitCarebeneficiar.addEventListener("submit", (event) => {
	event.preventDefault();

	addUser();
});

//creo funcion y hago async fetch
async function addUser() {
	const newUser = {
		profilePicCb: yourPicCarebeneficiary.value,
		nameCb: nameCarebeneficiary.value,
		emailCb: emailCarebeneficiary.value,
		idCb: idNumberCarebeneficiary.value,
		ageCb: ageCarebeneficiary.value,
		cityCb: cityCarebeneficiary.value,
		genderCb: genderCarebeneficiar.value,
		scheduleCb: scheduleCarebeneficiary.value,
		experienceCb: experienceCarebeneficiary.value,
		skillsCb: skillsCarebeneficiary.value,
	};

	//hago fetch para CREAR con POST
	const response = await fetch(urlBase, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUser),
	});

	// Obtengo el ID del nuevo usuario del input idNumberCarebeneficiary
	const userId = idNumberCarebeneficiary.value;

	//almaceno ID en localstorage
	localStorage.setItem("userId:", userId);
}

//creo una funcion para obtener los usuarios y que esta sea llamada al domcontentload
function getUsers() {
	fetch(urlBase)
		.then((respuesta) => respuesta.json())
		.then((data) => console.log(data));
}

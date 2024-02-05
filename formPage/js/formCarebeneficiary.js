const urlBase = "http://localhost:3001/beneficiarios";
let selectedSkillsList = [];

//selectores
//2. primero selecciono el form para estar escuchando cuando el usuario haga submit, los user para cuando el usuario haga eso obtener la info y agregarla

const yourPicCarebeneficiary = document.querySelector(
  "#yourPicCarebeneficiary"
);
const nameCarebeneficiary = document.querySelector("#nameCarebeneficiary");
const emailCarebeneficiary = document.querySelector("#emailCarebeneficiary");
const passwordCarebeneficiary = document.querySelector("#password");
const confirmPasswordCarebeneficiary =
  document.querySelector("#confirmPassword");
const idNumberCarebeneficiary = document.querySelector(
  "#idNumberCarebeneficiary"
);
const ageCarebeneficiary = document.querySelector("#ageCarebeneficiary");
const cityCarebeneficiary = document.querySelector("#cityCarebeneficiary");
const genderCarebeneficiary = document.querySelector("#genderCarebeneficiary");
const scheduleCarebeneficiary = document.querySelector(
  "#scheduleCarebeneficiary"
);
const experienceCarebeneficiary = document.querySelector(
  "#experienceCarebeneficiary"
);
const skillsCarebeneficiary = document.querySelector("#skillsCarebeneficiary");
const hvFormCarebeneficiary = document.querySelector("#hvFormCarebeneficiary");

//EVENTOS
//cuando el usuario da submit

//++
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);
});

hvFormCarebeneficiary.addEventListener("submit", (event) => {
  event.preventDefault();

  validateUserId();
});

//validar Id y contraseña 

function comprobarContraseñas() {
	const regexp_password = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  
    if (passwordCarebeneficiary.value !== confirmPasswordCarebeneficiary.value) {
        showAlert("Las contraseñas deben ser iguales");
        return false;
    }
    if (!regexp_password.test(passwordCarebeneficiary.value)) {
        showAlert("Contraseña no válida")
        return false;
    };

    return true;
}

async function validateEmail() {
  try {
      const response = await fetch(`${urlBase}?emailCb=${emailCarebeneficiary.value}`);
      const data = await response.json();
      return data.length;
  } catch (error) {
      return false;
  }
}

async function validateUserId() {
  
  if (!comprobarContraseñas()) {
		return;
	}
	
	if (await validateEmail()) {
		showAlert("Este email ya se encuentra registrado.");
		return;
	}

  const userId = idNumberCarebeneficiary.value;
  const response = await fetch(urlBase);
  const data = await response.json();
  const isDuplicate = data.some((user) => user.idCb === userId);

  if (isDuplicate) {
    showAlert("El número Id ingresado ya existe.");
  } else {
    getSkillsList();
  }
}

function getSkillsList() {
  const checkboxList = document.querySelectorAll(
    '.checkbox-list input[name="skills"]'
  );
  selectedSkillsList = Array.from(checkboxList)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  addUser();
}
// console.log(selectedSkillsList);

//creo funcion y hago async fetch
async function addUser() {
  const fileCb = yourPicCarebeneficiary.files[0];
  const formDataCb = new FormData();
  formDataCb.append("file", fileCb);
  formDataCb.append("upload_preset", "ofhdugqi");

  const responseImgCb = await fetch(
    "https://api.cloudinary.com/v1_1/dnftdsxo1/image/upload",
    {
      method: "POST",
      body: formDataCb,
    }
  );

  const dataImgCb = await responseImgCb.json();
  console.log(dataImgCb);

  const newUser = {
    profilePicCb: dataImgCb.url,
    nameCb: nameCarebeneficiary.value,
    emailCb: emailCarebeneficiary.value,
    passwordCb: passwordCarebeneficiary.value,
    confirmPasswordCb: confirmPasswordCarebeneficiary.value,
    idCb: idNumberCarebeneficiary.value,
    ageCb: ageCarebeneficiary.value,
    cityCb: cityCarebeneficiary.value,
    genderCb: genderCarebeneficiary.value,
    scheduleCb: scheduleCarebeneficiary.value,
    experienceCb: experienceCarebeneficiary.value,
    skillsCb: selectedSkillsList,
    id: idNumberCarebeneficiary.value,
  };

  //hago fetch para CREAR con POST
  const response = await fetch(urlBase, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });

  const data = await response.json();
  console.log(data);
  // Obtengo el ID del nuevo usuario del input idNumberCarebeneficiary
  const userId = idNumberCarebeneficiary.value;

  //almaceno ID en localstorage
  localStorage.setItem("userId", newUser.id);
  window.location.href = "../profilePage/profileCarebeneficiary.html";
}

//creo una funcion para obtener los usuarios y que esta sea llamada al domcontentload
function getUsers() {
  fetch(urlBase)
    .then((respuesta) => respuesta.json())
    .then((data) => console.log(data));
}

function showAlert(msg) {
  Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Ir de nuevo',
      timer: 2000,
      toast: "true",
      position: "bottom-right",
      showConfirmButton: false
  })
}
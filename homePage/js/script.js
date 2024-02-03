import { exportar } from "../../Footer_Header/Insert.js";

exportar();

const cboxCuidador = document.querySelector("#cboxCuidador");
const cboxCliente = document.querySelector("#cboxCliente");
const cboxCuidadorlog = document.querySelector("#cboxCuidadorlogin");
const cboxClientelog = document.querySelector("#cboxClientelogin");
const ir_Regristro = document.querySelector("#goRegistro");
const login = document.querySelector("#from-login");
const userEmail = document.getElementById("exampleInputEmail1");
const userPassword = document.getElementById("exampleInputPassword1");
const URLcuidador = "http://localhost:3001/cuidadores";
const URLbeneficiarios = "http://localhost:3001/beneficiarios";
const autenticadorCb = localStorage.getItem("userId");
const autenticadorCg = localStorage.getItem("userIdCg");

//preloader + eventos
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.querySelector(".preloader").style.display = "none";
  }, 1000);
});

cboxCuidadorlog.addEventListener("change", function () {
  if (cboxCuidadorlog.checked) {
    cboxClientelog.checked = false;
  }
});
cboxClientelog.addEventListener("change", function () {
  if (cboxClientelog.checked) {
    cboxCuidadorlog.checked = false;
  }
});

cboxCuidador.addEventListener("change", function () {
  if (cboxCuidador.checked) {
    cboxCliente.checked = false;
  }
});
cboxCliente.addEventListener("change", function () {
  if (cboxCliente.checked) {
    cboxCuidador.checked = false;
  }
});

ir_Regristro.addEventListener("click", function () {
  
  if (autenticadorCb || autenticadorCg ) {
    showAlert("Tienes una sesión iniciada, cierra sesión para continuar");
    return;
  }
  
  if (cboxCliente.checked) {
    window.location.href = "../formPage/carebeneficiaryForm.html";
  } else if (cboxCuidador.checked) {
    window.location.href = "../formPage/caregiverForm.html";
  } else {
    Swal.fire({
      title: "Parece que no elegiste una opción",
      text: "Inténtalo de nuevo",
      icon: "question",
      timer: 2000,
      showConfirmButton: false,
    });
  }
});
// termina eventos

// cargar
login.addEventListener("submit", function (event) {
  event.preventDefault();

  if (autenticadorCb || autenticadorCg ) {
    showAlert("Tienes una sesión iniciada, cierra sesión para continuar");
    return;
  }
  
  if (cboxCuidadorlog.checked) {
    logCuidador();
  } else if (cboxClientelog.checked) {
    logBeneficiario();
  } else {
    Swal.fire({
      title: "Parece que no elegiste una opción",
      text: "Inténtalo de nuevo",
      icon: "question",
      timer: 2000,
      showConfirmButton: false,
    });
  }
});

async function logCuidador() {
  if (!(await validarCuidador())) {
    showAlert("El email no se encuentra registrado.");
    return;
  }
  console.log("Iniciando sesión...");
}

async function logBeneficiario() {
  if (!(await validarBeneficiario())) {
    showAlert("El email no se encuentra registrado.");
    return;
  }
  console.log("Iniciando sesión...");
}

async function validarCuidador() {
  try {
    const response = await fetch(
      `${URLcuidador}?emailCg=${userEmail.value}&passwordCg=${userPassword.value}`
    );

    const data = await response.json();
    const id = data[0].idCg;
    localStorage.setItem("userIdCg", id);
    window.location.href = "../profilePage/profileCaregiver.html";
    return data.length;
  } catch (error) {
    return false;
  }
}

async function validarBeneficiario() {
  try {
    const response = await fetch(
      `${URLbeneficiarios}?emailCb=${userEmail.value}&passwordCb=${userPassword.value}`
    );
    const data = await response.json();
    const id = data[0].idCb;
    localStorage.setItem("userId", id);
    window.location.href = "../profilePage/profileCarebeneficiary.html";
    console.log(id);
    return data.length;
  } catch (error) {
    return false;
  }
}

function showAlert(msg) {
  Swal.fire({
    title: "Error!",
    text: msg,
    icon: "error",
    confirmButtonText: "Ir de nuevo",
    timer: 2000,
    toast: "true",
    position: "bottom-right",
    showConfirmButton: false,
  });
}

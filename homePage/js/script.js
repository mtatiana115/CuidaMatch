import { exportar } from "../../Footer_Header/Insert.js";

exportar();

const cboxCuidador = document.querySelector("#cboxCuidador");
const cboxCliente = document.querySelector("#cboxCliente");
const ir_Regristro = document.querySelector("#goRegistro");

//preloader
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);
});


cboxCuidador.addEventListener("change", function () {
	if (cboxCuidador.checked) {
		cboxCliente.disabled = true;
	} else {
		cboxCliente.disabled = false;
	}
});
cboxCliente.addEventListener("change", function () {
	if (cboxCliente.checked) {
		cboxCuidador.disabled = true;
	} else {
		cboxCuidador.disabled = false;
	}
});

ir_Regristro.addEventListener("click", function () {
	if (cboxCliente.checked) {
		window.location.href = "../formPage/carebeneficiaryForm.html";
	}
	else if (cboxCuidador.checked) {
		window.location.href = "../formPage/caregiverForm.html";
	}
	else {
		Swal.fire({
			title: "Parece que no elegiste una opción",
			text: "Inténtalo de nuevo",
			icon: "question",
			timer: 2000,
			showConfirmButton: false
		});
	}
});
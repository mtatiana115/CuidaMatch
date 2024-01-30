import {exportar} from "../../Footer_Header/Insert.js";

exportar();

//preloader
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);
});

const cboxCuidador = document.querySelector("#cboxCuidador");
const cboxCliente = document.querySelector("#cboxCliente");

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
import {exportar} from "../../Footer_Header/Insert.js";

exportar();

//preloader
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);
});
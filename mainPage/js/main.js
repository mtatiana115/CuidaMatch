const nameCardsCg = document.querySelector("#nameCardsCg");
const professionCardsCg = document.querySelector("#professionCardsCg");
const ageCardsCg = document.querySelector("#ageCardsCg");
const cityCardsCg = document.querySelector("#cityCardsCg");
const genderCardsCg = document.querySelector("#genderCardsCg");
const workScheduleCardsCg = document.querySelector("workScheduleCardsCg");
const url = "http://localhost:3001/beneficiarios";

//preloader
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);

	// printUsers();
});

// async function printUsers() {
// 	const response = await fetch(url);
// 	const data = await response.json();
// 	console.log(data);
// 	console.log(data[contador]);
// 	data.forEach((user) => {});
// }

// Cards Animations
function likeAction(button) {
	console.dir(button.closest(".card"));
	const card = button.closest(".card");
	card.classList.add("like-animation");
	setTimeout(() => {
		card.remove();
	}, 500);
}

let contador = 0;
async function dislikeAction(button) {
	const card = button.closest(".card");
	const iDcard = document.querySelector("main");
	card.classList.add("dislike-animation");
	setTimeout(() => {
		card.remove();
	}, 500);

	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
	console.log(data[contador]);

	console.log(contador);

	contador++;
}

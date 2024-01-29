//preloader
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(function () {
		document.querySelector(".preloader").style.display = "none";
	}, 1000);
});

// Cards Animations
function likeAction(button) {
	const card = button.closest(".card");
	card.classList.add("like-animation");
	setTimeout(() => {
		card.remove();
	}, 500);
}

function dislikeAction(button) {
	const card = button.closest(".card");
	card.classList.add("dislike-animation");
	setTimeout(() => {
		card.remove();
	}, 500);
}

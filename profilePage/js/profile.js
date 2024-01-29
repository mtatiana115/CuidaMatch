document.addEventListener("DOMContentLoaded", function () {
	const stars = document.querySelectorAll(".star");
	const result = document.getElementById("result");

	stars.forEach((star) => {
		star.addEventListener("click", () => {
			const value = parseInt(star.getAttribute("data-value"));
			updateRating(value);
		});
	});

	function updateRating(value) {
		stars.forEach((star) => {
			const starValue = parseInt(star.getAttribute("data-value"));
			star.classList.toggle("active", starValue <= value);
		});

		result.textContent = `Calificación: ${value} estrella${
			value !== 1 ? "s" : ""
		}`;
	}
});
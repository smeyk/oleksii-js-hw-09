const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.querySelector("body");

let timerId = null;

function getRandomHexColor() {
	return `#${Math.floor(Math.random() *
		16777215).toString(16).padStart(6, 0)}`
		;
}

const changeBodyBgColor = () => {
	startBtn.disabled = true;
	stopBtn.disabled = false;
	timerId = setInterval(() => {
		body.style.backgroundColor = getRandomHexColor();
	}, 1000);
}

const stopChangeBodyBgColor = () => {
	clearInterval(timerId);
	stopBtn.disabled = true;
	startBtn.disabled = false;
}

startBtn.addEventListener("click", changeBodyBgColor);
stopBtn.addEventListener("click", stopChangeBodyBgColor);
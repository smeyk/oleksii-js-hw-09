import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
	timerId: null,
	input: document.querySelector("#datetime-picker"),
	btnTimerStart: document.querySelector('[data-start]'),
	timerFieldDays: document.querySelector('[data-days]'),
	timerFielHours: document.querySelector('[data-hours]'),
	timerFieldMinutes: document.querySelector('[data-minutes]'),
	timerFieldSeconds: document.querySelector('[data-seconds]'),
};

refs.btnTimerStart.disabled = true;


const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		const currentDate = new Date();
		if (selectedDates[0] - currentDate > 0) {
			refs.btnTimerStart.disabled = false;
		} else {
			refs.btnTimerStart.disabled = true;
			Notify.failure("Please choose a date in the future");
		}
	},
};

function convertMs(ms) {
	// Number of milliseconds per unit of time
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;
	// Remaining days
	const days = Math.floor(ms / day);
	// Remaining hours
	const hours = Math.floor((ms % day) / hour);
	// Remaining minutes
	const minutes = Math.floor(((ms % day) % hour) / minute);
	// Remaining seconds
	const seconds = Math.floor((((ms % day) % hour) % minute) /
		second);
	return { days, hours, minutes, seconds };
}

const addLeadingZero = (value) => {
	return String(value).padStart(2, 0);
}


function onTimerStart() {
	const selectedDate = fp.selectedDates[0];

	refs.timerId = setInterval(() => {
		const startTime = new Date();
		const countdown = selectedDate - startTime;
		refs.btnTimerStart.disabled = true;

		if (countdown < 0) {
			clearInterval(timerId);
			return;
		}
		updateTimerFace(convertMs(countdown));
	}, 1000);
}

function updateTimerFace({ days, hours, minutes, seconds }) {
	refs.timerFieldDays.textContent = addLeadingZero(days);
	refs.timerFielHours.textContent = addLeadingZero(hours);
	refs.timerFieldMinutes.textContent = addLeadingZero(minutes);
	refs.timerFieldSeconds.textContent = addLeadingZero(seconds);
}

const fp = flatpickr(refs.input, options);
refs.btnTimerStart.addEventListener('click', onTimerStart);
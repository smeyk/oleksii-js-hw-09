import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");

const createPromise = (position, delay) => {
	const shouldResolve = Math.random() > 0.3;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldResolve) {
				resolve({ position, delay })
			} else {
				reject({ position, delay })
			}
		}, delay)
	})
}

const onFormSubmit = (event) => {
	event.preventDefault();

	let delay = Number(form.delay.value);
	let step = Number(form.step.value);
	let amount = Number(form.amount.value);

	for (let i = 1; i <= amount; i++) {
		createPromise(i, delay)
			.then(({ position, delay }) => {
				Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
			})
			.catch(({ position, delay }) => {
				Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
			});
		delay += step;
	}
}


form.addEventListener("submit", onFormSubmit);
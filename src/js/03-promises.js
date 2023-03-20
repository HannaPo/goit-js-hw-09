import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmitForm);

function handleSubmitForm(e) {
  e.preventDefault();

  const { delay, step, amount } = e.currentTarget.elements;

  if (delay.value < 0 || step.value < 0 || amount.value <= 0) {
    Notiflix.Notify.warning(`Please enter positive numbers!`);
  } else {
    for (let i = 0; i < amount.value; i += 1) {
      let position = i + 1;
      let delays = Number(delay.value) + step.value * i;

      createPromise(position, delays)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  }
}

function createPromise(position, delay) {
  return new Promise((fulfill, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        fulfill({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

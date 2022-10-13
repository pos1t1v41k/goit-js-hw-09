import Notiflix from 'notiflix';
const formEl = document.querySelector('.form');
const firstDelayEl = document.querySelector('[name = delay]');
const delayStepEl = document.querySelector('[name = step]');
const amountEl = document.querySelector('[name = amount]');

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const firstDelay = Number(firstDelayEl.value);
  const delayStep = Number(delayStepEl.value);
  for (let i = 0; i < amountEl.value; i += 1) {
    createPromise(i + 1, firstDelay + i * delayStep)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  };
});

function createPromise(position, delay) {
  return new Promise((resole, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resole({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};
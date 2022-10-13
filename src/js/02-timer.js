import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputPickerEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const timerDaysEl = document.querySelector('[data-days]');
const timerHoursEl = document.querySelector('[data-hours]');
const timerMinutesEl = document.querySelector('[data-minutes]');
const timerSecondsEl = document.querySelector('[data-seconds]');

startBtnEl.disabled = true;

const addLeadingZero = value => {
   return String(value).padStart(2, '0');
};

const convertMs = (ms) => {
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;
   const days = addLeadingZero(Math.floor(ms / day));
   const hours = addLeadingZero(Math.floor((ms % day) / hour));
   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
   return { days, hours, minutes, seconds };
}


const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      if (selectedDates[0] < Date.now()) {
         Notiflix.Notify.failure('Please choose a date in the future');
         startBtnEl.disabled = true;
      } else {
         startBtnEl.disabled = false;
         Notiflix.Notify.success('OK');
      }
   },
};

startBtnEl.addEventListener('click', event => {
   setInterval(() => {
      const startTime = new Date(inputPickerEl.value);
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      if (deltaTime >= 0) {
         const { days, hours, minutes, seconds } = convertMs(deltaTime);
         timerDaysEl.textContent = days;
         timerHoursEl.textContent = hours;
         timerMinutesEl.textContent = minutes;
         timerSecondsEl.textContent = seconds;
         if (seconds <= 9) {
            timerSecondsEl.style.color = "red";
         }
         else {
            timerSecondsEl.style.color = 'inherit';
         }
      }
   }, 1000);

   startBtnEl.disabled = true;
});

flatpickr(inputPickerEl, options);

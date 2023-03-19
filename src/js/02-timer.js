import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datePicker = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let timerId = null;
let INTERVAL = 1000;

// Date selection
flatpickr(datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] >= new Date()) {
      Notiflix.Notify.success('Ready to start');
      btnStart.disabled = false;
    } else {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    }
  },
});

btnStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    let countdown = new Date(datePicker.value) - new Date();
    btnStart.disabled = true;

    if (countdown >= 0) {
      let timeData = convertMs(countdown);

      days.textContent = addLeadingZero(timeData.days);
      hours.textContent = addLeadingZero(timeData.hours);
      minutes.textContent = addLeadingZero(timeData.minutes);
      seconds.textContent = addLeadingZero(timeData.seconds);
    } else {
      Notiflix.Notify.success('Finished');
      clearInterval(timerId);
      btnStart.disabled = false;
    }
  }, INTERVAL);
});

// Counting time
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Time formatting
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

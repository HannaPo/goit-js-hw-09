 function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let timerId = null;

btnStart.addEventListener("click", (e) => {
  e.target.setAttribute('disabled', true);
  btnStop.removeAttribute('disabled');
  
  timerId = setInterval(() => {
   body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

btnStop.addEventListener("click", (e) => {
  e.target.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');

  clearInterval(timerId);
});

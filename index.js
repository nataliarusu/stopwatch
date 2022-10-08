const timeSpans = document.querySelectorAll('span');
const hoursEl = document.querySelector('#hours');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');
const csSecondsEl = document.querySelector('#mseconds');
const start_pause_btn = document.querySelector('.toggleTimer');
const reset_btn = document.querySelector('.reset');
let interval;

const timer = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  cs_seconds: 0,
};

const displayStartBtn = () => {
  start_pause_btn.classList.remove('pause');
  start_pause_btn.classList.add('start');
  start_pause_btn.innerHTML = 'START';
};
const displayPauseBtn = () => {
  start_pause_btn.classList.remove('start');
  start_pause_btn.classList.add('pause');
  start_pause_btn.innerHTML = 'PAUSE';
};

const timerOn = () => {
  interval = setInterval(() => {
    timer.cs_seconds += 1;
    if (timer.cs_seconds === 100) {
      timer.cs_seconds = 0;
      timer.seconds += 1;
      secondsEl.innerHTML =
        timer.seconds < 10 ? `0${timer.seconds}` : `${timer.seconds}`;
    }
    if (timer.seconds === 60) {
      timer.seconds = 0;
      timer.minutes += 1;
      minutesEl.innerHTML =
        timer.minutes < 10 ? `0${timer.minutes}` : `0${timer.minutes}`;
    }
    if (timer.minutes === 60) {
      timer.minutes = 0;
      timer.hours += 1;
      hoursEl.innerHTML =
        timer.hours < 10 ? `0${timer.hours}` : `${timer.hours}`;
    }
    csSecondsEl.innerHTML =
      timer.cs_seconds < 10 ? `0${timer.cs_seconds}` : `${timer.cs_seconds}`;
  }, 10);
};
const timerOff = () => {
  clearInterval(interval);
};

const startPauseHandler = () => {
  if (start_pause_btn.classList.contains('start')) {
    //start the timer
    displayPauseBtn();
    timerOn();
  } else {
    displayStartBtn();
    timerOff();
  }
};
const resetAllHandler = () => {
  displayStartBtn();
  timerOff();
  for (const span of timeSpans) {
    span.innerHTML = '00';
  }
  for (const key in timer) {
    timer[key] = 0;
  }
  clearLaps();
};
checkSavedLaps();

start_pause_btn.addEventListener('click', startPauseHandler);
reset_btn.addEventListener('click', resetAllHandler);

const main_timerSpans = document.querySelectorAll('.main-timer-output span');
const lap_timerSpans = document.querySelectorAll('.lap-timer-output span');

const hoursEl = document.querySelector('#hours');
const minutesEl = document.querySelector('#minutes');
const secondsEl = document.querySelector('#seconds');
const csSecondsEl = document.querySelector('#mseconds');
const lap_hoursEl = document.querySelector('#lap_hours');
const lap_minutesEl = document.querySelector('#lap_minutes');
const lap_secondsEl = document.querySelector('#lap_seconds');
const lap_csSecondsEl = document.querySelector('#lap_mseconds');
const start_pause_btn = document.querySelector('.toggleTimer');
const reset_btn = document.querySelector('.reset');

let interval;

const main_timer = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  cs_seconds: 0,
};
const lap_timer = {
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
    startTimer(main_timer, csSecondsEl, secondsEl, minutesEl, hoursEl);
    startTimer(
      lap_timer,
      lap_csSecondsEl,
      lap_secondsEl,
      lap_minutesEl,
      lap_hoursEl
    );
  }, 10);
};

const startTimer = (timer, ...htmlEls) => {
  const [csSecondsEl, secondsEl, minutesEl, hoursEl] = htmlEls;

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
    hoursEl.innerHTML = timer.hours < 10 ? `0${timer.hours}` : `${timer.hours}`;
  }
  csSecondsEl.innerHTML =
    timer.cs_seconds < 10 ? `0${timer.cs_seconds}` : `${timer.cs_seconds}`;
};

const timerOff = () => {
  clearInterval(interval);
  reset_Timer(lap_timer);
  reset_Span(lap_timerSpans);
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

const reset_Timer = (timer) => {
  for (const key in timer) {
    timer[key] = 0;
  }
};

const reset_Span = (spans) => {
  for (const span of spans) {
    span.innerHTML = '00';
  }
};

const resetAllHandler = () => {
  displayStartBtn();
  timerOff();
  reset_Span(main_timerSpans);
  reset_Timer(main_timer);
  clearLaps();
};
checkSavedLaps();

start_pause_btn.addEventListener('click', startPauseHandler);
reset_btn.addEventListener('click', resetAllHandler);

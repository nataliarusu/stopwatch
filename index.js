import { addLap, clearLaps, checkSavedLaps } from './scripts/lap.js';
import { Timer } from './scripts/Timer.js';

const lap_timerSpans = document.querySelectorAll('.lap-timer-output span');
const addLapBtn = document.querySelector('.add-lap');
const clearLapsBtn = document.querySelector('.clear-lap');
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

const main_timer = new Timer(csSecondsEl, secondsEl, minutesEl, hoursEl);
const lap_timer = new Timer(lap_csSecondsEl, lap_secondsEl,lap_minutesEl,lap_hoursEl);

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

const startTimer = () => {
  interval = setInterval(() => {
    main_timer.count();
    lap_timer.count();
  }, 10);
};

const stopTimer = () => {
  clearInterval(interval);
  lap_timer.reset();
};

const startPauseHandler = () => {
  if (start_pause_btn.classList.contains('start')) {
    displayPauseBtn();
    startTimer();
  } else {
    displayStartBtn();
    stopTimer();
  }
};

const resetAllHandler = () => {
  main_timer.reset();
  lap_timer.reset();
  clearLaps();
};

const addLapHandler = () => { 
  addLap(main_timer, lap_timer, lap_timerSpans);
  lap_timer.reset();
};

const clearLapsHandler=()=>{
  clearLaps();
}

checkSavedLaps(lap_timer, lap_timerSpans);

start_pause_btn.addEventListener('click', startPauseHandler);
reset_btn.addEventListener('click', resetAllHandler);
clearLapsBtn.addEventListener('click', clearLapsHandler);
addLapBtn.addEventListener('click', addLapHandler);

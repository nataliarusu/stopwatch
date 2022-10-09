const addLapBtn = document.querySelector('.add-lap');
const clearLapsBtn = document.querySelector('.clear-lap');
const ol = document.querySelector('.laps');

let laps = [];
let split_lap = [];

const renderLapItem = (ltd, mtd) => {
  const li = document.createElement('li');
  li.classList.add('lap-item');
  const ltd_span = document.createElement('span');
  const mtd_span = document.createElement('span');
  ltd_span.innerHTML = ltd;
  mtd_span.innerHTML = mtd;
  li.append(ltd_span, mtd_span);
  ol.append(li);
};

const generateStrLap = (timer) => {
  let str = '';
  for (const key in timer) {
    if (timer[key] < 10) {
      str += `0${timer[key]}:`;
    } else {
      str += `${timer[key]}:`;
    }
  }
  return str.slice(0, -1);
};

const addLapHandler = () => {
  let lap_timer_data = generateStrLap(lap_timer);
  let main_timer_data = generateStrLap(main_timer);

  laps.push([lap_timer_data, main_timer_data]);
  renderLapItem(lap_timer_data, main_timer_data);
  if (laps.length > 5) {
    ol.classList.add('scroll');
  }
  localStorage.setItem('lap-data', JSON.stringify(laps));
  reset_Timer(lap_timer);
  reset_Span(lap_timerSpans);
};

const checkSavedLaps = () => {
  const savedLaps = JSON.parse(localStorage.getItem('lap-data')) || [];
  if (savedLaps.length > 0) {
    laps = [...savedLaps];
    laps.forEach((data) => renderLapItem(data[0], data[1]));
  }
  if (laps.length > 5) {
    ol.classList.add('scroll');
  }
};

const clearLaps = () => {
  reset_Timer(lap_timer);
  reset_Span(lap_timerSpans);
  localStorage.removeItem('lap-data');
  laps = [];
  ol.innerHTML = '';
  ol.classList.remove('scroll');
};
clearLapsBtn.addEventListener('click', clearLaps);
addLapBtn.addEventListener('click', addLapHandler);

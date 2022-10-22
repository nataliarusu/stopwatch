const ol = document.querySelector('.laps');

let laps = [];
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
  for (const [key, value] of Object.entries(timer)) {
    //Object.entries(timer) own props only, not prototype
    if (timer[key] !== timer.timerDOMels) {
      if (value < 10) {
        str += `0${value}:`;
      } else {
        str += `${value}:`;
      }
    }
  }
  return str.slice(0, -1);
};
/**
 *
 * @param {Timer} main_timer
 * @param {Timer} lap_timer
 *
 */
export const addLap = (main_timer, lap_timer) => {
  let lap_timer_data = generateStrLap(lap_timer);
  let main_timer_data = generateStrLap(main_timer);

  laps.push([lap_timer_data, main_timer_data]);
  renderLapItem(lap_timer_data, main_timer_data);
  if (laps.length > 5) {
    ol.classList.add('scroll');
  }
  localStorage.setItem('lap-data', JSON.stringify(laps));
  lap_timer.reset();
};

export const checkSavedLaps = () => {
  const savedLaps = JSON.parse(localStorage.getItem('lap-data')) || [];
  if (savedLaps.length > 0) {
    laps = [...savedLaps];
    laps.forEach((data) => renderLapItem(data[0], data[1]));
  }
  if (laps.length > 5) {
    ol.classList.add('scroll');
  }
};

export const clearLaps = () => {
  localStorage.removeItem('lap-data');
  laps = [];
  ol.innerHTML = '';
  ol.classList.remove('scroll');
};

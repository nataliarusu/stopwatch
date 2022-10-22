/**
 *
 * @param  {...DOMElements} els //csSecondsEl, secondsEl, minutesEl, hoursEl
 *
 */
export function Timer(...els) {
  this.hours = 0;
  this.minutes = 0;
  this.seconds = 0;
  this.cs_seconds = 0;
  this.timerDOMels = els;
}

Timer.prototype = {
  constructor: Timer,
  count: function () {
    const [csSecondsEl, secondsEl, minutesEl, hoursEl] = this.timerDOMels;

    this.cs_seconds += 1;
    if (this.cs_seconds === 100) {
      this.cs_seconds = 0;
      this.seconds += 1;
      secondsEl.innerHTML =
        this.seconds < 10 ? `0${this.seconds}` : `${this.seconds}`;
    }
    if (this.seconds === 60) {
      this.seconds = 0;
      this.minutes += 1;
      minutesEl.innerHTML =
        this.minutes < 10 ? `0${this.minutes}` : `0${this.minutes}`;
    }
    if (this.minutes === 60) {
      this.minutes = 0;
      this.hours += 1;
      hoursEl.innerHTML = this.hours < 10 ? `0${this.hours}` : `${this.hours}`;
    }
    csSecondsEl.innerHTML =
      this.cs_seconds < 10 ? `0${this.cs_seconds}` : `${this.cs_seconds}`;
  },
  reset: function () {
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.cs_seconds = 0;
    for (const span of this.timerDOMels) {
      span.innerHTML = '00';
    }
  },
};

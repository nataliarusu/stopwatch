const timerBlock=document.querySelectorAll('span');
const hoursEl=document.querySelector('#hours');
const minutesEl=document.querySelector('#minutes');
const secondsEl=document.querySelector('#seconds');
const msSecondsEl=document.querySelector('#mseconds');
const start_pause_btn=document.querySelector('.toggleTimer');
const reset_btn=document.querySelector('.reset');

const timer={
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
};
let interval;

const timerOn=()=>{
    interval=setInterval(()=>{
        timer.milliseconds+=1;        
        if(timer.milliseconds===100){
            timer.milliseconds=0;
            timer.seconds+=1;            
            secondsEl.innerHTML=timer.milliseconds<10 ?`0${timer.seconds}`:`${timer.seconds}`;
        }
        if(timer.seconds===60){
            timer.seconds=0;
            timer.minutes+=1;
            minutesEl.innerHTML=timer.milliseconds<10 ?`0${timer.minutes}`:`0${timer.minutes}`;
        }
        if(timer.minutes===60){
            timer.minutes=0;
            timer.hours+=1;
            hoursEl.innerHTML=timer.milliseconds<10 ?`0${timer.hours}`:`${timer.hours}`;
        }
        msSecondsEl.innerHTML=`${timer.milliseconds}`
    },10);
}
const timerOff=()=>{
    clearInterval(interval);
}
const displayStartBtn=()=>{
    start_pause_btn.classList.remove('pause');
    start_pause_btn.classList.add('start');
    start_pause_btn.innerHTML='START'; 
}
const displaypauseBtn=()=>{
    start_pause_btn.classList.remove('start');
    start_pause_btn.classList.add('pause');
    start_pause_btn.innerHTML='PAUSE';  
}

const startpauseHandler=()=>{
    if(start_pause_btn.classList.contains('start')){//start the timer
        displaypauseBtn();
        timerOn();
    } else {
        displayStartBtn();
        timerOff();
    } 
}
const resetHandler=()=>{
    displayStartBtn();
    for(const span of timerBlock){
        span.innerHTML="00";
    }
    for(const key in timer){
        timer[key]=0;
    }
    timerOff();
}

start_pause_btn.addEventListener('click', startpauseHandler);
reset_btn.addEventListener('click', resetHandler);
const addLapBtn=document.querySelector('.add-lap');
const clearLapsBtn=document.querySelector('.clear-lap');
const ul=document.querySelector('.laps');

let laps=[];

const generateLapItem=(data)=>{
    const li = document.createElement('li');
    li.innerHTML=data;
    ul.append(li); 
}

const  addLapHandler=()=>{
    let str='';
    for(const key in timer){
        if(timer[key]<10){
            str+=`0${timer[key]}:`;
        } else{
            str+=`${timer[key]}:`
        }
    }
    let data=str.slice(0,-1);
    laps.push(data);
    generateLapItem(data);
    localStorage.setItem('lap-data', JSON.stringify(laps));    
}

const checkSavedLaps=()=>{
   const savedLaps= JSON.parse(localStorage.getItem('lap-data'))||[];   
   if(savedLaps.length>0){
    laps=[...savedLaps];
    savedLaps.forEach(data=>{
        generateLapItem(data)
    });
   }
}

const clearLaps=()=>{
    localStorage.removeItem('lap-data');
    laps=[];
    ul.innerHTML='';
}
clearLapsBtn.addEventListener('click', clearLaps);
addLapBtn.addEventListener('click', addLapHandler);
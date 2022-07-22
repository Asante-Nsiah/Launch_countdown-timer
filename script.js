const secondsEl = document.getElementById('seconds');
const minutesEl = document.getElementById('minutes');
const hoursEl = document.getElementById('hours');
const daysEl = document.getElementById('days');
const pauseButton = document.getElementById('pauseBtn');
const resumeButton = document.getElementById('resumeBtn');


const padZeros = num => {
  return num >= 0 && num < 10 ? `0${num}` : num;
};

const flipCard = (el, card) => {
  card.addEventListener('transitionend', () => {
    const clonedCard = card.cloneNode(true);
    clonedCard.classList.remove('flipped');
    
    try {
      el.replaceChild(clonedCard, card);
    } catch (e) {
      console.log(e);
    }
    card = clonedCard;
  });

  if (!card.classList.contains('flipped')) {
    card.classList.add('flipped');
  }
};

const setupCard = (el, currentTime, nextTime, resetTime) => {
  currentTime = padZeros(currentTime);
  nextTime = padZeros(nextTime);

  const card = el.querySelector('.card');
  const cardFaceFront = el.querySelector('.card-face__front');
  const cardFaceBack = el.querySelector('.card-face__back');

  el.setAttribute('data-current-number', currentTime);
  el.setAttribute('data-next-number', nextTime);

  
  cardFaceFront.innerText = nextTime;
  cardFaceBack.innerText = currentTime;

  resetTime && flipCard(el, card);
};

const updateDOM = (el, currentTime, resetTime) => {
  let nextTime = currentTime ;
  
  if (resetTime) {
    if (currentTime === 60) {
      nextTime = resetTime ;
    } else if (currentTime === -1) {
      currentTime = resetTime;
      nextTime = resetTime ;
    }
  }

  setupCard(el, currentTime, nextTime, resetTime);
};

const HOURS = 24; 
const MINUTES = 60; 
const SECONDS = 59; 

let days = 14;
let hours = 24;
let minutes = 60;
let seconds = 60;

let interval;

const countdownDays = () => {
  if (days > 0) {
    days--;
    updateDOM(daysEl, days, days);
  } else {
    return;
  }
};

const countdownHours = () => {
  hours--;
  updateDOM(hoursEl, hours, HOURS);

  if (hours < 0) {
    countdownDays();
    hours = HOURS;
  }
};

const countdownMinutes = () => {
  minutes--;
  updateDOM(minutesEl, minutes, MINUTES);

  if (minutes < 0) {
    countdownHours();
    minutes = MINUTES;
  }
};

const countdownSeconds = () => {
  seconds--;
  updateDOM(secondsEl, seconds, SECONDS);

  if (seconds < 0) {
    countdownMinutes();
    seconds = SECONDS;
  }
};

const countdown = () => {
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    console.log('END!!');
    clearInterval(interval);
    return;
  }

  countdownSeconds();
};

pauseButton.addEventListener('click', () => {
    clearInterval(interval);
});

resumeButton.addEventListener('click', () => {
    interval = setInterval(countdown, 1000);
  resumeButton.removeEventListener('click', () => {
    interval = setInterval(countdown, 1000);
})
  
  

});

const startCountdown = () => {
  interval = setInterval(countdown, 1000);
};

updateDOM(secondsEl, seconds);
updateDOM(minutesEl, minutes);
updateDOM(hoursEl, hours);
updateDOM(daysEl, days);

startCountdown();


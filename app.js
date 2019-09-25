

/* Dots change */
let dots = document.querySelector('.work-dots');

let dotsChange = function ()  {
  if (dots.innerHTML.length < 3) {
    dots.innerHTML += ".";
  }
  else {
    dots.innerHTML = "";
  }
}

window.setInterval(dotsChange,400);


/* RANDOM NUMBER */

let randomNumber = (enu => Math.floor(Math.random() * enu.length));




/* BUTTON FUNCTIONALITY */
const sessionMore = document.querySelector('.timer-more-session');
const sessionLess = document.querySelector('.timer-less-session');
const breakMore = document.querySelector('.timer-more-break');
const breakLess = document.querySelector('.timer-less-break');
const startWorking = document.querySelector('.button-play');
const pauseWorking = document.querySelector('.button-pause');
const stopWorking = document.querySelector('.button-stop');
const restartWorking = document.querySelector('.button-replay');

startWorking.addEventListener('click', function() {
  if (timerObject.playing == false && timerObject.started == true) {
    timerObject.pause = false;
    timerObject.playing = true;
    timerObject.startTimer(true);
    timerObject.start_messages(true);
    startAnim();
    return;
  } else if (timerObject.playing == false) {
    timerObject.startTimer(false);
    timerObject.pause = false;
    timerObject.started = true;
    timerObject.playing = true;
    timerObject.minutes = timerObject.session_time;
    timerObject.current_session_time = timerObject.session_time;
    timerObject.startTimer(true);
    timerObject.start_messages(true);
    startAnim();
  }

})

pauseWorking.addEventListener('click', function() {
  if (timerObject.playing == true) {
    deleteAnim();
    timerObject.playing = false;
    timerObject.pause = true;
    timerObject.startTimer(false);
    timerObject.start_messages(false);
  }

})

let functionStopWork = () => {
  deleteAnim();
  if (timerObject.started == true) {
    timerObject.startTimer(false);
    timerObject.start_messages(false);
    timerObject.playing = false;
    timerObject.pause = false;
    timerObject.started = false;
    timerObject.current_session_time = timerObject.session_time;
    timerObject.minutes = timerObject.session_time;
    timerObject.seconds = "0" + 0;
    timerObject.adjutsViewValues();
  }
}

stopWorking.addEventListener('click', functionStopWork);



restartWorking.addEventListener('click', function() {
  deleteAnim();
  timerObject.start_messages(false);
  timerObject.restart();
})

sessionMore.addEventListener('click', function() {
  if(timerObject.session_time < 60) {
  timerObject.session_time = timerObject.session_time + 1;
  sessionTime.innerHTML = timerObject.session_time;
}
  if (!timerObject.started) {
    minutes.innerHTML = timerObject.session_time;
  }
})

sessionLess.addEventListener('click', function() {
  if(timerObject.session_time > 1) {
    timerObject.session_time = timerObject.session_time - 1;
    sessionTime.innerHTML = timerObject.session_time;
  }
  if (!timerObject.started) {
    minutes.innerHTML = timerObject.session_time;
  }
})
/* BREAK LINE */
let breakTimer = document.querySelector('.break-timer');

breakMore.addEventListener('click', function() {
  if(timerObject.break_time < 60) {
  timerObject.break_time = timerObject.break_time + 1;
  breakTime.innerHTML = timerObject.break_time;
    }
})

breakLess.addEventListener('click', function() {
  if(timerObject.break_time > 1) {
  timerObject.break_time = timerObject.break_time - 1;
  breakTime.innerHTML = timerObject.break_time;
    }
})

let deleteAnim = function() {
  if (workTab.classList.contains('work-tab-animated')) {
    workTab.classList.remove('work-tab-animated');
    workTab.classList.add('work-tab-animated-back');
  }
}

let startAnim = function() {
  if (!workTab.classList.contains('work-tab-animated')) {
    workTab.classList.remove('work-tab-animated-back');
    workTab.className += ' work-tab-animated';
  }
}
/* TIMER OBJECT */

let sessionTime = document.querySelector('.session-time');
let breakTime = document.querySelector('.break-time');
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');

let timerObject = {
  minutes: 25,
  seconds : 0,

  session_time: 25,
  current_session_time: 25,

  started: false,
  playing: false,
  pause: false,

  break_time: 5,
  break: false,
  break_seconds: 0,
  break_minutes: 1,

  start : function() {},

  messagesEvent: null,
  start_messages: function(flag) {
    if (flag) {
      this.messagesEvent = setInterval(messagesRollLogic,3000);
    } else {
      clearInterval(this.messagesEvent);
    }
  },

  countEvent: null,
  startTimer: function(flag) {
    if (flag) {
      if (!timerObject.break) {
        timerObject.break_minutes = timerObject.break_time;
      }
      this.countEvent = setInterval(timerTime, 100);
    } else {
      clearInterval(this.countEvent);
    }
  },
  breakCountEvent: null,
  startBreakTimer: function(flag) {
    if (flag) {
      this.breakCountEvent = setInterval(timerBreak, 1000);
    } else {
      clearInterval(this.breakCountEvent);
    }
  },

  restart: function() {
    if (this.countEvent && this.started == true) {
      this.startTimer(false);
      this.minutes = this.current_session_time;
      this.session_time = this.minutes;
      minutes.innerHTML = this.minutes;
      seconds.innerHTML = this.seconds;
      this.seconds = '0' + 0;
      this.playing = false;
      this.started = false;
      this.pause = false;
      this.adjutsViewValues();
    }

  },

  adjutsViewValues: function() {
    minutes.innerHTML = this.minutes;
    seconds.innerHTML = this.seconds;
  },


}

/* MESSAGES */
let workTab = document.querySelector('.work-tab');
let messagesDiv = document.querySelector('.messages');
let messagesArray = ['You can do it!', 'Break a leg!', 'Believe in yourself!',
    'Just a little more!', 'I believe in You!', "You're doing great!",
    "You're doing amazing!", 'Keep it up!', 'Nice work!', 'Focus!',
    'Fight!'];

let randomTop = () => {
  return Math.floor(Math.random() * 60) + 20 + "%";
}

function messagesRollLogic () {
    x = document.createElement('div');
    x.innerHTML = messagesArray[randomNumber(messagesArray)];
    x.setAttribute('class', 'message');
    x.style.top = randomTop();
    x.addEventListener('animationend', function(e) {
      e.target.parentNode.removeChild(e.target);
    })
    messagesDiv.appendChild(x)
}


/* PROPER TIME VIEW - MINUTE | SECOND LOGIC */

let breakButton = document.querySelector('.break-modal-button');
let breakModal = document.querySelector('.break-modal');

let confetti = document.querySelector('.confetti');

let timerTime = () => {
  if (timerObject.seconds > 0) {
    timerObject.seconds = timerObject.seconds - 1;
    if (timerObject.seconds < 10) {
      timerObject.seconds = "0" + timerObject.seconds;
    }
  } else if(timerObject.minutes == 0 && timerObject.seconds == 0) {
    timerObject.started = false;
    timerObject.playing = false;
    timerObject.paused = false;
    timerObject.start_messages(false);
    timerObject.startTimer(false);
    breakModal.style.display='block';
    confetti.style.display = 'block';
    timerObject.current_session_time = timerObject.session_time;
    timerObject.minutes = timerObject.session_time;
    timerObject.seconds = "0" + 0;
    deleteAnim();
    timerObject.break = true;
    timerObject.startBreakTimer(true);
    timerObject.adjutsViewValues();
  }   else {
    timerObject.seconds = 59;
    timerObject.minutes = timerObject.minutes - 1;
  }
  minutes.textContent = timerObject.minutes;
  seconds.textContent = timerObject.seconds;
}

let timerBreak = () => {

  if (timerObject.break_seconds > 0) {
    timerObject.break_seconds--;
      if (timerObject.break.seconds < 10) {
        timerObject.break_seconds = "0" + timerObject.break_seconds;
  }
} else if (timerObject.break_seconds == 0 && timerObject.break_minutes == 0) {
  timerObject.break = false;
  timerObject.startBreakTimer(false);
  timerObject.break_minutes = timerObject.break_time;
  timerObject.break_seconds = "0"+0;
  breakModal.style.display = 'none';
  confetti.style.display = 'none';

} else {
  timerObject.break_minutes--;
  timerObject.break_seconds = 59;
}
breakTimer.innerHTML = timerObject.break_minutes + ":" + timerObject.break_seconds;
}


/* MODAL */
let modal = document.getElementsByClassName('modal')[0];
let modalContent = document.getElementsByClassName('modal-content')[0];
let button = document.getElementsByTagName('button')[1];

button.addEventListener('click', function() {
  sessionStorage.visited = true;
  modalContent.className += ' cardAway';
  modal.style.animation += 'fadeAway 1s forwards';
  setTimeout(function() {
    modal.style.display = "none";
  }, 1000);
})

/* AUDIO */
// let audiobutton = document.querySelector('.audo-button');
//
// audiobutton.addEventListener('click', audioAssign);
//
// let audioAssign = () => {
//
// }

/* ACCEPTED FIRST VISIT */

let acceptAndCheck = () => {
  if (sessionStorage.getItem('visited')) {
    modal.style.display = 'none';
  }
}

/* SETUP */

let setup = () => {
sessionTime.innerHTML = timerObject.session_time;
breakTime.innerHTML = timerObject.break_time;
}

window.onload = function() {
  setup();
  acceptAndCheck();
}

/* BREAK TIME */
// let breakContent = document.querySelector('.break-modal-content');

breakButton.addEventListener('click', function() {
  timerObject.break = false;
  breakModal.style.display = "none";
  confetti.style.display = 'none';
  timerObject.startBreakTimer(false);
  timerObject.break_minutes = timerObject.break_time;
  timerObject.break_seconds = "0"+0;
});

/* ARROW ADJUST CURRENT TIME */
let moreTime = document.querySelector('.time-adjust-more')
let lessTime = document.querySelector('.time-adjust-less')

moreTime.addEventListener('click', function() {
  if(timerObject.minutes < 60) {
  timerObject.minutes = timerObject.minutes + 1;
  minutes.innerHTML = timerObject.minutes;
}
});

lessTime.addEventListener('click', function() {
  if(timerObject.minutes > 0) {
    timerObject.minutes = timerObject.minutes - 1;
    minutes.innerHTML = timerObject.minutes;
  }
});


/* BREAK BACKGROUND TEST */

// let break_modal_content = document.querySelector('.break-modal-content');
// var backgroundBreak = 0
// setInterval(function() {
//   var yeet = "linear-gradient("+ backgroundBreak  +"deg, rgba(104, 198, 23, 0.7), rgba(104, 198, 232, 0.7) ), url('./office.png')"
//   break_modal_content.style.backgroundImage = yeet;
//   backgroundBreak++;
// },50)





/* BUG FIX */
// If you switch the tab during the working session, messages would stack in one place, so we stop them, when we switch the tab

// let checkFocus = () => {
//   if (!document.hasFocus() && timerObject.messagesEvent ) {
//     console.log('I lost focus and timerobject.messagesevent was on');
//     timerObject.start_messages(false);
//   } else if (document.hasFocus() && timerObject.started && timerObject.messagesEvent == false) {
//     console.log('Im trying to get my even back');
//     timerObject.start_messages(true);
//   }
// }
//
// setInterval(checkFocus, 1000);

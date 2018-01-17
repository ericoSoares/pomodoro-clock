var minutes = 25;
var seconds = 0;
var minBreak = 5;
var secBreak = 0;
var totalTime = minutes*60;
var curTime = totalTime;
var circleMaxSize = 38;
var displayMin = minutes;
var displaySec = seconds;
var interval = null;
var stage = true; //Controls the clock, true = work time, false = break time

$(document).ready(function() {
  update();
});

function update() {
  //Concat 0 before number and display it
  $('#time').text(addZero(displayMin) + ':' + addZero(displaySec));
  function addZero(n) {
    return (n < 10 ? '0' : '') + n;
  }
  //Updates circle animation
  $('#timer').css('clip-path', 'circle('+(curTime*38)/totalTime+'% at 50% 50%)');
  if(stage) {
    $('#timer').css('background-color', 'lightgreen');
  } else {
    $('#timer').css('background-color', 'skyblue');
  }
  
}

function clockRun() {
  if(displayMin == 0 && displaySec == 0) {
    if(stage) {
      displayMin = minBreak;
      displaySec = secBreak;
      totalTime = minBreak*60;
      curTime = totalTime;
      stage = false;
    } else {
      displayMin = minutes;
      displaySec = seconds;
      stage = true;
      totalTime = minutes*60;
      curTime = totalTime;
    }
  } else {
    if(displaySec > 0) {
      displaySec--;
      curTime--;
    } else {
      displayMin--;
      displaySec = 59;
    }
  }
  update();
}

$('button').click(function() {
  if(!interval) {
    switch($(this).attr('id')) {
      case 'minusS':
        if(minutes > 0) {
          minutes--;
        }
        break;
      case 'plusS':
        minutes++;
        break;
      case 'minusB':
        if(minBreak > 0) {
          minBreak--;
        }
        break;
      case 'plusB':
        minBreak++;
        break;
    }
  }
  //Updates setters text
  $('#runTime').text(minutes);
  $('#breakTime').text(minBreak);
});

$('#clear').click(function() {
  if(!interval) {
    displayMin = minutes;
    displaySec = seconds;
    totalTime = minutes*60;
    curTime = totalTime;
    stage = true;
    update();
  }
  
});

$('#time').click(function() {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  } else {
    interval = setInterval(clockRun, 1000);
  }
});
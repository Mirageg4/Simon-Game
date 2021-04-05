'use strict';

const buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern =[]

// Generate Random # between 0 & 3, and store in randomNumber 
function nextSequence(){
    let randomNumber = Math.trunc(Math.random) * 3 + 1;

//the random number above selects a color and adds to gamePattern array
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

//Select the button with the same id as randomChosenColor
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

//play sound for button selected
let audio = newAudio("sounds/" + randomChosenColor + ".mp3"); audio.play();
  
}
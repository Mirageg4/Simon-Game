'use strict';

const buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];

let userClickedPattern = [];

//keep track of game start. nextSquence() only called on first kepress
let started = false;

let level = 0;

//jQuery detects keypress... 1st keypress calls nextSequence()
//h1 title changes to Level 0
$(document).keypress(function() { 
if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}
});

//jQuery detects button click to trigger the handler function
//userChosencolor stores the id of the clicked button
// variable contents(button clicked) are then added to the end of userClickedPattern
$(".btn").click (function() {
    let userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    //check to see if button click builds array
    //console.log(userClickedPattern); 
    
    //play sound same way as nextSequence
    playSound(userChosenColor);
    animatePress(userChosenColor);
// Call checkAnswer() after a user has clicked and chosen an answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(currentLevel) {
    //Check if most recent user answer is the same as the game pattern. If so, then log "success", otherwise log "wrong".
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        //If the the most recent answer is right above, then check that they have finished their sequence with another if statement.

        if(userClickedPattern.length === gamePattern.length) {

        //Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
            nextSequence();
        }, 1000);

        }
    }   else {
        console.log("wrong");
    }
}

function nextSequence () {

    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
}

// Generate Random # between 0 & 3, and store in randomNumber 
function nextSequence(){
    let randomNumber = Math.trunc(Math.random) * 3 + 1;

//the random number above selects a color and adds to gamePattern array
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

//Select the button with the same id as randomChosenColor
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);


playSound(randomChosenColor);
}

function playSound(name) {
//play sound for button selected
let audio = newAudio("sounds/" + name + ".mp3"); 
audio.play(); 
}
//add pressed class to clicked button
function animatePress(currentColor) {
$("#" +currentColor).addClass("pressed");

//remove pressed class to clicked button after 100 milliseconds
setTimeout(function () {
    $("#" +currentColor).removeClass("pressed");
}, 100);

}


   
'use strict';

var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];

var userClickedPattern = [];

//keep track of game start. nextSquence() only called on first kepress
var started = false;
var level = 0;

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
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    //play sound same way as nextSequence
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    // Call checkAnswer() after a user has clicked and chosen an answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);  
});

function checkAnswer(currentLevel) {
    //Check if most recent user answer is the same as the game pattern. If so, then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        //If the the most recent answer is right above, then check that they have finished their sequence with another if statement.

        if (userClickedPattern.length === gamePattern.length) {

        //Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }

    }   else {
        // plays sound if answer is wrong
        playSound("wrong");

        //Apply class to the body of the website, when the answer is wrong, and then remove it after 200 milliseconds.
        $("body").addClass("game-over");

         //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
         $("level-title").text("Game Over, Press any key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence () {

    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

// Generate Random # between 0 & 3, and store in randomNumber 
    //let randomNumber = Math.trunc(Math.random) * 3 + 1;
    var randomNumber = Math.floor(Math.random() * 4);

//the random number above selects a color and adds to gamePattern array
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

//Select the button with the same id as randomChosenColor
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}

//add pressed class to clicked button
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    
    //remove pressed class to clicked button after 100 milliseconds
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
    }

function playSound(name) {
//play sound for button selected
var audio = newAudio("sounds/" + name + ".mp3"); 
audio.play(); 
}

function startOver () {
    level = 0;
    gamePattern = [];
    started =  false;
}



   
'use strict';

const buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];

let userClickedPattern = [];

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
    
});

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


   
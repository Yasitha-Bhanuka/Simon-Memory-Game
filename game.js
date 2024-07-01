$(document).ready(function () {

  alert('After press any key you see can see the color, You should memorise it and click the same color button, If you correct you can go to the next level, Then you can see the another color again. Now you need to click the previous color and new color buttons at the same sequece. Like wise you can play this game.');

});

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// first key down
$(document).keydown(function () {

  if (started == false) {

    nextSequence();

    started = true;
  }
});

// button clicking
$(".btn").click(function () {

  userClickedPattern.push($(this).attr("id"));

  playSound($(this).attr("id"));

  animatePress($(this).attr("id"));

  checkAnswer(userClickedPattern.length - 1);
});

// play sound
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// sequence using console
function nextSequence() {
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

  $("#level-title").text("Level " + level);

  level++;
}

// animatePress
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// check answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    console.log("Success");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence()
      }, 2000);
    }


  } else {
    console.log("Wrong");

    playSound("wrong");

    $("body").addClass("game-over");

    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// start over
function startOver() {
  gamePattern = [];

  started = false;
}
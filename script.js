var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;

$(".lost").fadeOut(100);

$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").html("Level " + level);
    nextSequence();
    gameStarted = true;
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    youLoser();
    // startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").html("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  $("h1").html("Press Any Keyboard Key to Start");
}

function youLoser() {
  $(".container").fadeOut(100);
  $(".lost").fadeIn(100);
  $("h1").html("You loser<br>Your parents never loved you<br> and you will die alone");

  setTimeout(function () {
    $(".container").fadeIn(100);
    $(".lost").fadeOut(100);
    startOver();
  }, 3000);
}

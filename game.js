//-----------------------------------------------------------------------------//

//Game code

var level = 0,
  flag = 0,
  highestLevel = 0;
var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];

// Start the game

$(document).keydown(function () {
  flag++;
  if (flag === 1) {
    newSequence();
  }
});

// Creating a new sequence

function newSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // Show user the new button in the new sequence
  $("#" + randomChosenColor).fadeOut();
  addSound(randomChosenColor);
  $("#" + randomChosenColor).fadeIn();

  level++;
  $("h1").text("Level " + level);

  if (highestLevel < level) {
    highestLevel++;
  }

  $("#score").text("Highest Level: " + highestLevel);
}

//-----------------------------------------------------------------------------//

// Animate pressed buttons

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor)
      .delay(100)
      .removeClass("pressed");
  }, 100);
}

// Add sounds to buttons

function addSound(color) {
  switch (color) {
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;

    default:
      break;
  }
}

//-----------------------------------------------------------------------------//

// Register user clicked pattern

$(".btn").click(function () {
  if (flag !== 0) {
    addSound(this.id);
    userClickedPattern.push(this.id);
    animatePress(this.id);
    if (level === userClickedPattern.length) {
      checkAnswer();
    } else {
    }
  }
});

// Check user's response

function checkAnswer() {
  var flag = 0;

  for (var i = 0; i < userClickedPattern.length; i++) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      flag = 1;
      break;
    } else {
      continue;
    }
  }

  if (flag === 0) {
    newSequence();
    userClickedPattern.splice(0, userClickedPattern.length);
  } else {
    var wrong = new Audio("public/sounds/wrong.mp3");
    $("body").addClass("game-over");
    wrong.play();
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// Start Over

function startOver() {
  $("h1").text("Game Over, Press Any Key to Restart");
  flag = 0;
  level = 0;
  userClickedPattern.splice(0, userClickedPattern.length);
  gamePattern.splice(0, gamePattern.length);
}

//-----------------------------------------------------------------------------//

// Close the rules pop-up

$(".close").click(function () {
  $(".message-box").addClass("close-box");
});

// Help button

$(".help").click(function () {
  $(".message-box").removeClass("close-box");
});

// Quit button

$(".quit").click(function () {
  startOver();
});

//-----------------------------------------------------------------------------//

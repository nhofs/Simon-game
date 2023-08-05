//game instructions
alert("Press A to start the game. Then press the buttons in the order they light up. If you get the order wrong, you lose. Good luck!");

//start game when press a
$(window).on("keydown", (event) => {
  if (event.key === "a" && gamePattern.length === 0) {
    gameFailed = false;
    $("h1").text("Level 1");
    makeSound(randomChosenColor);
    $("." + randomChosenColor)
      .fadeOut(100)
      .fadeIn(100);
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
  }
});
//check if button pressed is correct and start next level
$(".btn").on("click", (event) => {
  if (event.target.id === gamePattern[i]) {
    makeSound(gamePattern[i]);
    $("." + gamePattern[i])
      .fadeOut(100)
      .fadeIn(100);

    if (i === gamePattern.length - 1) {
      randomChosenColor = buttonColors[nextSequence()];
      gamePattern.push(randomChosenColor);
      $("h1").text("Level " + gamePattern.length);
      console.log(gamePattern + " " + i);
      i = 0;
      setTimeout(nextLevel, 1000);
    } else {
      i++;
    }
  } 
  //if button pressed is wrong set end screen
  else {
    $("h1").text("Game Over, Press A Key to Restart");
    gamePattern = [];
    i = 0;
  }
});
//variables
buttonColors = ["red", "blue", "green", "yellow"];
randomChosenColor = buttonColors[nextSequence()];
gamePattern = [];
var i = 0;
//function to start next level
async function nextLevel() {
  for (var j = 0; j < gamePattern.length; j++) {
    var currentColor = gamePattern[j];
    makeSound(currentColor);
    $("." + currentColor)
      .fadeOut(100)
      .fadeIn(100);
    await new Promise((r) => setTimeout(r, 500));
  }
}
//function to make sound occur with button click / on sequence
function makeSound(randomChosenColor) {
  switch (randomChosenColor) {
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;

    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;

    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;

    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;

    default:
      console.log(randomChosenColor);
  }
}
//random color selection
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  return randomNumber;
}

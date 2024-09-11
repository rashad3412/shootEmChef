/* This is a helper function for the game Im using this to add circles dynamically to the dom in two different Javascript files. */

let shouldAnimate = true;
let gameisActive = false;

function setUpGame() {
  // start button of the game when it is clicked
  const startButton = document.getElementById("start-game-button");
  const gameContainer = document.getElementById("game-container");

  document.addEventListener("DOMContentLoaded", () => {
    if (startButton) {
      startButton.addEventListener("click", function () {
        gameisActive = true; // Global varible

        startButton.parentElement.style.display = "none";
        gameContainer.style.display = "block";

        // adding Id from game.html as arg adding circles
        addImagesToPage("img-container", 15);
        moveImagesDown();
        animateBottomCircle();

        // Game animation func for circles to go down page.
      });
    } else {
      ("");
    }
  });
}

///////////////////////////////

const playAgain = document.getElementById("play-again-button");
const playAgainSection = document.getElementById("play-again-button-section");

function resetGame() {
  // reset button for the game

  if (playAgain) {
    playAgain.addEventListener("click", () => {
      gameisActive = true;
      shouldAnimate = true;

      currentScore = 0; //

      playAgainSection.style.display = "none";
      score.textContent = currentScore;

      window.imgIntervals.forEach((interval) => clearInterval(interval));
      window.imgIntervals = [];

      addImagesToPage("img-container", 15);
      moveImagesDown();
      animateBottomCircle();
      resetScore();
    });
  } else {
    ("");
  }
}

setUpGame();
resetGame();

function updateScore(increment) {
  const scoreElement = document.getElementById("score");

  // Ensure currentScore is defined before incrementing
  if (typeof currentScore === "undefined") {
    currentScore = 0;
  }

  currentScore += increment;
  scoreElement.textContent = currentScore;
}

///////////////////////////////////

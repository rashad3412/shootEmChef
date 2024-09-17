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
        addImagesToPage("img-container", 18);
        moveImagesDown();
        bottomCircle();
        animateBottomCircle();

        // Game animation func for circles to go down page.
      });
    } else {
      ("");
    }
  });
}

/////////////////////////////////////////////

function updateScore(increment) {
  const scoreElement = document.getElementById("score");

  // Ensure currentScore is defined before incrementing
  if (typeof currentScore === "undefined") {
    currentScore = 0;
  }

  currentScore += increment;
  scoreElement.textContent = currentScore;
}

///////////////////////////////

const playAgain = document.getElementById("play-again-button");
const playAgainSection = document.getElementById("play-again-button-section");

function resetGame() {
  // reset button for the game
  gameOver = false;

  if (playAgain) {
    playAgain.addEventListener("click", () => {
      playAgainShown = false;
      gameisActive = true;
      shouldAnimate = true;

      // Hide the Play Again section
      playAgainSection.style.display = "none";

      // Clear all intervals related to images and projectiles
      clearAllIntervals();

      // Remove any remaining projectiles from the DOM
      const projectiles = document.querySelectorAll(".shots");
      projectiles.forEach((projectile) => {
        projectile.remove();
      });

      // Remove any remaining images from the DOM
      const images = document.querySelectorAll("#img-container img");
      images.forEach((img) => {
        img.remove();
      });

      // Reset the score to zero
      resetScore();

      // Restart the game
      addImagesToPage("img-container", 18);
      moveImagesDown();
      animateBottomCircle();
      bottomCircle();
    });
  } else {
    ("");
  }
}

setUpGame();
resetGame();

///////////////////////////////////
// Function to clear all intervals including shooting and movement
function clearAllIntervals() {
  // Stop all image intervals
  if (window.imgIntervals) {
    window.imgIntervals.forEach((interval) => clearInterval(interval));
    window.imgIntervals = [];
  }

  // Stop all shooting intervals
  if (window.imageIntervals) {
    window.imageIntervals.forEach((interval) => clearInterval(interval));
    window.imageIntervals = [];
  }
}

function resetScore() {
  currentScore = 0;
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = currentScore;
}

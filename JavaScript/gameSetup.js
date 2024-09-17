/* This is a helper function for the game Im using this to add circles dynamically to the dom in two different Javascript files. */

let shouldAnimate = true;
let gameisActive = false;

function setUpGame() {
  const startButton = document.getElementById("start-game-button");
  const gameContainer = document.getElementById("game-container");

  function startGame() {
    gameisActive = true; // Global variable indicating game is active

    // Hide the start button and show the game container
    startButton.parentElement.style.display = "none";
    gameContainer.style.display = "block";

    // Add images to the page and start animations
    addImagesToPage("img-container", 18);
    moveImagesDown();
    bottomCircle();
    animateBottomCircle();
  }

  // Wait for DOM content to be loaded before adding the event listener
  document.addEventListener("DOMContentLoaded", () => {
    if (startButton) {
      startButton.addEventListener("click", startGame);
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

function clearDOMElements(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.remove();
  });
}

function resetGame() {
  // Reset game state variables
  gameOver = false;
  playAgainShown = false;
  gameisActive = true;
  shouldAnimate = true;

  // Hide the Play Again section
  playAgainSection.style.display = "none";

  // Clear all intervals related to game animations
  clearAllIntervals();

  // Remove any remaining projectiles and images from the DOM
  clearDOMElements(".shots");
  clearDOMElements("#img-container img");

  // Reset the score to zero
  resetScore();

  // Restart the game
  addImagesToPage("img-container", 18);
  moveImagesDown();
  animateBottomCircle();
  bottomCircle();
}

// Attach event listener for the "Play Again" button
if (playAgain) {
  playAgain.addEventListener("click", resetGame);
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

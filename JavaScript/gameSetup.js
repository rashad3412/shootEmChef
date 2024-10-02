/* This is a helper function for the game Im using this to add Images dynamically to the dom in different Javascript files. */

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
    addImagesToPage("img-container", totalImages);
    moveImagesDown();
    ChefImage();
    animateChefMovements();
  }

  // Wait for DOM content to be loaded before adding the event listener
  document.addEventListener("DOMContentLoaded", () => {
    if (startButton) {
      startButton.addEventListener("click", startGame);
    }
  });
}

setUpGame();

/////////////////////////////////////////////

const playAgain = document.getElementById("play-again-button");
const playAgainSection = document.getElementById("play-again-button-section");

// function to clear the projectiles and images from the dom when the reorder button has appered on the screen.

function clearProjectilesAndImages(selector) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.remove();
  });
}

function resetGame() {
  // Reset game state variables
  // gameOver = false;
  currentLevel = 1;
  totalImages = 10;
  // playAgainShown = false;
  gameisActive = true;
  shouldAnimate = true;

  // Hide the Play Again section
  playAgainSection.style.display = "none";

  // Clear all intervals related to game animations
  clearAllIntervals();

  // Remove any remaining projectiles and images from the DOM
  clearProjectilesAndImages(".shots");
  clearProjectilesAndImages("#img-container img");

  // Reset the score to zero
  resetScore();

  // Restart the game
  addImagesToPage("img-container", totalImages);
  moveImagesDown();
  animateChefMovements();
  ChefImage();

  showLevelMessage(currentLevel);
}

// Attach event listener for the "Play Again" button
if (playAgain) {
  playAgain.addEventListener("click", resetGame);
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

// Reset Score
function resetScore() {
  currentScore = 0;
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = currentScore;
}

///////////////////////////////////

// Function to clear all intervals including shooting and movement
function clearAllIntervals() {
  // Stop all image intervals
  if (window.imgIntervals) {
    window.imgIntervals.forEach((interval) => clearInterval(interval));
    window.imgIntervals = [];
  }

  // Stop all shooting intervals
  if (window.projectileIntervals) {
    window.projectileIntervals.forEach((interval) => clearInterval(interval));
    window.projectileIntervals = [];
  }
}

let gameWon = false;

function stopGameAnimation() {
  console.log("Game stopped");

  // Set game status to inactive
  gameisActive = false;
  shouldAnimate = false;

  // Check if the game has been won or not
  if (!gameWon) {
    // Show the Play Again button if the game wasn't won
    const playAgainSection = document.getElementById(
      "play-again-button-section"
    );
    if (playAgainSection) {
      playAgainSection.style.display = "flex";
      console.log("Displaying 'Play Again' button.");
    } else {
      console.error("Play Again section not found!");
    }
  } else {
    // Hide the Play Again button if the game was won
    const playAgainSection = document.getElementById(
      "play-again-button-section"
    );
    if (playAgainSection) {
      playAgainSection.style.display = "none";
      console.log("Hiding 'Play Again' button because game is won.");
    }
  }

  // Reset the score display to zero
  const score = document.getElementById("score");
  if (score) {
    score.textContent = "0";
  }

  // Clear any ongoing image intervals
  window.imgIntervals.forEach((interval) => clearInterval(interval));
  window.imgIntervals = [];

  console.log("All intervals cleared, game fully stopped.");
}

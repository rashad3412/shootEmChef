let currentLevel = 1;
let totalImages = 10;
let maxLevel = 2;

// Function to check if all images are shot down and handle level completion
function checkImagesAndLevel() {
  if (document.querySelectorAll("#img-container img").length === 0) {
    if (gameisActive) {
      updatedLevel();
    } else {
      stopGameAnimation(); // Game resets when it ends
    }
  }
}

// Function to update the level and show a "Level Up" message
function updatedLevel() {
  if (currentLevel >= maxLevel) {
    winGame();
    stopGameAnimation();
  } else {
    currentLevel++;
    totalImages += 5; // Increase total images for the next level

    // Show level-up message
    showLevelMessage(currentLevel);

    // Start the new level without resetting the entire game
    setTimeout(() => {
      loadNextLevel();
    }, 2000); // Give a short delay to show the level message before starting the next level
  }
}

// Function to show the level-up message
function showLevelMessage(level) {
  const levelMessage = document.createElement("div");
  levelMessage.classList.add("level-message");
  levelMessage.textContent = `Level ${level}`;
  document.body.appendChild(levelMessage);

  // Remove the message after a few seconds
  setTimeout(() => {
    levelMessage.remove();
  }, 1500); // The message stays for 1.5 seconds
}

function loadNextLevel() {
  // Clear the current images and projectiles
  clearProjectilesAndImages(".shots");
  clearProjectilesAndImages("#img-container img");

  // Add new images for the next level
  addImagesToPage("img-container", totalImages);
  moveImagesDown(); // Restart the animation for the new set of images

  // Ensure the chef movements and shooting are re-enabled
  animateChefMovements();
  ChefImage();
}

function winGame() {
  gameWon = true;
  const winMessage = document.createElement("div");
  winMessage.classList.add("win-message");
  winMessage.textContent = `You WIN!`;
  document.body.appendChild(winMessage);
  console.log(winMessage);
}

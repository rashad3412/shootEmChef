let currentLevel = 1;
let totalImages = 10;
let maxLevel = 1;

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
  // Ensure there's no existing level message before creating a new one
  const existingMessage = document.querySelector(".level-message");
  if (existingMessage) {
    existingMessage.remove(); // Remove any old level message
  }

  const levelMessage = document.createElement("div");
  levelMessage.classList.add("level-message");
  levelMessage.textContent = `Order ${level}`;
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
  winMessage.textContent = `COOKED EM!`;
  document.body.appendChild(winMessage);

  const buttonContainer = document.querySelector(".button-container");
  if (!buttonContainer) {
    console.error("button container not found");
  }
  buttonContainer.style.display = "flex";

  const yesButton = document.getElementById("yes-button");
  const noButton = document.getElementById("no-button");

  yesButton.replaceWith(yesButton.cloneNode(true));
  noButton.replaceWith(noButton.cloneNode(true));

  const newYesButton = document.getElementById("yes-button");
  const newNoButton = document.getElementById("no-button");

  if (!yesButton || !noButton) {
    console.error("Yes or No button not found!");
  }

  // Attach event listener for yes button to reset the game
  newYesButton.addEventListener("click", () => {
    resetGame();
    winMessage.remove();
    buttonContainer.style.display = "none"; // Hide the button container
  });

  // Attach event listener for no button to handle "No" action
  newNoButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

/* This is a helper function for the game Im using this to add circles dynamically to the dom in two different Javascript files. */

function addCirclesToPage(elementId, add) {
  // Adding the circle elements to the page
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = "";
    for (let i = 0; i < add; i++) {
      let createCircle = document.createElement("div");
      createCircle.classList.add("circle");
      element.append(createCircle);
    }
  } else {
    console.error(`Element with ID ${elementId} not found.`);
  }
}

function setUpGame() {
  // start button of the game when it is clicked
  const startButton = document.getElementById("start-game-button");
  const gameContainer = document.getElementById("game-container");

  document.addEventListener("DOMContentLoaded", () => {
    if (startButton) {
      startButton.addEventListener("click", function () {
        startButton.parentElement.style.display = "none";
        gameContainer.style.display = "block";
        addCirclesToPage("game-circles", 13);
        moveCirclesDown();
      });
    } else {
      console.log("not working");
    }
  });
}

const playAgain = document.getElementById("play-again-button");
const playAgainSection = document.getElementById("play-again-button-section");
const score = document.getElementById("score");

function resetGame() {
  // reset button for the game
  playAgain.addEventListener("click", () => {
    playAgainSection.style.display = "none";
    score.textContent = "0";

    window.circleIntervals.forEach((interval) => clearInterval(interval));
    window.circleIntervals = [];

    addCirclesToPage("game-circles", 13);
    moveCirclesDown();
  });
}

setUpGame();
resetGame();

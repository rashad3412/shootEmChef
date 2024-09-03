/* This is a helper function for the game Im using this to add circles dynamically to the dom in two different Javascript files. */

function setUpGame() {
  // start button of the game when it is clicked
  const startButton = document.getElementById("start-game-button");
  const gameContainer = document.getElementById("game-container");

  document.addEventListener("DOMContentLoaded", () => {
    if (startButton) {
      startButton.addEventListener("click", function () {
        startButton.parentElement.style.display = "none";
        gameContainer.style.display = "block";

        // adding Id from game.html as arg adding circles
        addCirclesToPage("game-circles", 13);

        // Game animation func for circles to go down page.
        moveCirclesDown();
      });
    } else {
      ("");
    }
  });
}

const playAgain = document.getElementById("play-again-button");
const playAgainSection = document.getElementById("play-again-button-section");
const score = document.getElementById("score");

function resetGame() {
  // reset button for the game

  if (playAgain) {
    playAgain.addEventListener("click", () => {
      playAgainSection.style.display = "none";
      score.textContent = "0";

      // Create intervals to manage timing of the circles
      window.circleIntervals.forEach((interval) => clearInterval(interval));
      window.circleIntervals = [];

      addCirclesToPage("game-circles", 13);
      moveCirclesDown();
    });
  } else {
    ("");
  }
}

setUpGame();
resetGame();

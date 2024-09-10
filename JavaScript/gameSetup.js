/* This is a helper function for the game Im using this to add circles dynamically to the dom in two different Javascript files. */

let shouldAnimate = true;
let gameisActive = false;

function setUpGame() {
  // start button of the game when it is clicked
  const startButton = document.getElementById("start-game-button");
  const gameContainer = document.getElementById("game-container");
  const bottomCircle = document.getElementById("bottom-circle");

  document.addEventListener("DOMContentLoaded", () => {
    if (startButton) {
      startButton.addEventListener("click", function () {
        gameisActive = true; // Global varible

        startButton.parentElement.style.display = "none";
        gameContainer.style.display = "block";
        bottomCircle.style.animation = "sideToSide 2s ease-in-out infinite";

        // adding Id from game.html as arg adding circles
        animateBottomCircle();
        addImagesToPage("img-container", 18);
        moveImagesDown();

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
const score = document.getElementById("score");

let currentScore = 0;

function resetGame() {
  // reset button for the game
  updateScore(0);

  if (playAgain) {
    playAgain.addEventListener("click", () => {
      gameisActive = true;
      shouldAnimate = true;

      playAgainSection.style.display = "none";
      score.textContent = "0";

      window.imgIntervals.forEach((interval) => clearInterval(interval));
      window.imgIntervals = [];

      addImagesToPage("img-container", 18);
      moveImagesDown();
      animateBottomCircle();
    });
  } else {
    ("");
  }
}

setUpGame();
document.addEventListener("DOMContentLoaded", () => {
  resetGame();
});

///////////////////////////////////

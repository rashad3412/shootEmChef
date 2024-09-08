/* This is a helper function for the game Im using this to add circles dynamically to the dom in two different Javascript files. */

function setUpGame() {
  // start button of the game when it is clicked
  const startButton = document.getElementById("start-game-button");
  const gameContainer = document.getElementById("game-container");
  const bottomCircle = document.getElementById("bottom-circle");

  document.addEventListener("DOMContentLoaded", () => {
    if (startButton) {
      startButton.addEventListener("click", function () {
        gameisActive = true;

        startButton.parentElement.style.display = "none";
        gameContainer.style.display = "block";
        bottomCircle.style.animation = "sideToSide 2s ease-in-out infinite";

        // adding Id from game.html as arg adding circles
        animateBottomCircle();
        addCirclesToPage("game-circles", 15);
        moveCirclesDown();

        // Game animation func for circles to go down page.
      });
    } else {
      ("");
    }
  });
}

const playAgain = document.getElementById("play-again-button");
const playAgainSection = document.getElementById("play-again-button-section");
const score = document.getElementById("score");

let currentScore = 0;

function resetGame() {
  currentScore = 0;
  // reset button for the game
  updateScore(0);

  if (playAgain) {
    playAgain.addEventListener("click", () => {
      gameisActive = true;
      playAgainSection.style.display = "none";
      score.textContent = "0";

      window.circleIntervals.forEach((interval) => clearInterval(interval));
      window.circleIntervals = [];

      addCirclesToPage("game-circles", 35);
      shouldAnimate = true;
      moveCirclesDown();
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

function stopGameAnimation() {
  gameisActive = false;
  playAgainSection.style.display = "flex";
  score.textContent = "0";

  window.circleIntervals.forEach((interval) => clearInterval(interval));
  window.circleIntervals = [];

  shouldAnimate = false;
}

/* Game Javascript File */

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("game-button");
  const gameContainer = document.getElementById("game-container");

  if (startButton) {
    startButton.addEventListener("click", function () {
      startButton.parentElement.style.display = "none";
      gameContainer.style.display = "block";
      addCirclesToPage("game-circles", 10);
      moveCirclesDown();
    });
  } else {
    console.log("not working");
  }
});

/* Game Javascript File */

document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("navigated")) {
    window.location.href = "index.html";
  }
  sessionStorage.removeItem("navigated");
});

window.circleIntervals = [];

function moveCirclesDown() {
  // controlling the movement of the circles going down
  const circles = document.querySelectorAll(".circle");
  let playAgainShown = false;

  circles.forEach((circle, index) => {
    let position = 0;

    const speed = Math.random() * 2 + 1;
    const interval = setInterval(() => {
      if (position >= window.innerHeight) {
        clearInterval(interval);
        if (!playAgainShown) {
          window.circleIntervals.forEach((interval) => clearInterval(interval));
          window.circleIntervals = [];

          playAgainSection.style.display = "flex";
          playAgainShown = true;
        }
      } else {
        position += speed;
        circle.style.transform = `translateY(${position}px)`;
      }
    }, 30);

    window.circleIntervals.push(interval);
  });
}

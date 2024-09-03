function addCirclesToPage(elementId, add) {
  // Adding the circle elements to the page
  // For the game it will start at the top of the screen
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

// For circles to move down the screen and pushed into another array.
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

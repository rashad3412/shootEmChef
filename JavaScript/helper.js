/* This is a helper function for the game Im using this to add circles dynamically to the dom in two different Javascript files. */

function addCirclesToPage(elementId, add) {
  const element = document.getElementById(elementId);
  if (element) {
    for (let i = 0; i < add; i++) {
      let createCircle = document.createElement("div");
      createCircle.classList.add("circle");
      element.append(createCircle);
    }
  } else {
    console.error(`Element with ID ${elementId} not found.`);
  }
}

function moveCirclesDown() {
  const circles = document.querySelectorAll(".circle");
  circles.forEach((circle, index) => {
    let position = 0;
    const interval = setInterval(() => {
      if (position >= window.innerHeight) {
        clearInterval(interval);
      } else {
        position += 2;
        circle.style.transform = `translateY(${position}px)`;
      }
    }, 30);
  });
}

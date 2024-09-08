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

//////////////////////////////////////

function addImagesToPage(elementId, imageCount) {
  const container = document.getElementById(elementId);

  if (!container) {
    console.error(`Element with ID ${elementId} not found.`);
    return; // Exit the function if the container isn't found
  }

  container.innerHTML = "";

  for (let i = 1; i <= imageCount; i++) {
    let img = document.createElement("img");
    img.src = `assets/FoodPic/FoodPic${i}.png`; // Ensure no spaces in the file path
    img.alt = `Image ${i}`;
    img.classList.add("game-image");
    container.appendChild(img);
  }
}

addImagesToPage("img-container", 4);

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
      position += speed;
      circle.style.transform = `translateY(${position}px)`;

      if (position >= window.innerHeight && !playAgainShown) {
        clearInterval(interval);
        removeCircle(circle);
        if (!playAgainShown) {
          stopGameAnimation();
          playAgainShown = true;
        }
      }
    }, 100);

    window.circleIntervals.push(interval);
  });
}

function bottomCircle() {
  const bottomCircle = document.getElementById("bottom-circle");
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && gameisActive) {
      if (bottomCircle) {
        shootCircle(bottomCircle);
      } else {
        console.error("bottom-circle element not found");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", bottomCircle);

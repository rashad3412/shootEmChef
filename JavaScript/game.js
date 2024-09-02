/* Game Javascript File */

// this is checking to see if the game.html file is reloaded/refreshed if it is refreshed it redirects back to the index.html file.
// document.addEventListener("DOMContentLoaded", () => {
//   if (!sessionStorage.getItem("navigated")) {
//     window.location.href = "index.html";
//   }
//   sessionStorage.removeItem("navigated");
// });

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

function bottomCircle() {
  document.addEventListener("DOMContentLoaded", () => {
    const bottomCircle = document.getElementById("bottom-circle");

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        // Check if bottomCircle is actually fetched before calling the function
        if (bottomCircle) {
          shootCircle(bottomCircle);
        } else {
          console.error("bottom-circle element not found");
        }
      }
    });
  });
}

bottomCircle();

function shootCircle(fromElement) {
  if (!fromElement) {
    console.error("shootCircle was called without a valid element.");
    return;
  }

  let newCircle = document.createElement("div");
  newCircle.style.position = "absolute";
  newCircle.style.width = "10px";
  newCircle.style.height = "10px";
  newCircle.style.borderRadius = "50%";
  newCircle.style.backgroundColor = "#76e46c";
  newCircle.style.border = "1px solid black";

  // Calculate the position at the moment of firing
  const rect = fromElement.getBoundingClientRect(); // Gets the element's position relative to the viewport
  newCircle.style.left = rect.left + rect.width / 2 - 5 + "px"; // Center the circle horizontally
  newCircle.style.bottom = window.innerHeight - rect.top + "px"; // Position at the bottom of the element

  document.body.appendChild(newCircle);

  let position = parseInt(newCircle.style.bottom, 10);

  let interval = setInterval(() => {
    position += 4; // Adjust this value to control the speed of the shooting
    newCircle.style.bottom = position + "px";
    if (position > window.innerHeight) {
      clearInterval(interval);
      document.body.removeChild(newCircle);
    }
  }, 20);
}

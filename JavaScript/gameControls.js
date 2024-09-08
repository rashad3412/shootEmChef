/* 

Game Controls

*/

//  checking to see if the session for game.html has beem closed or refreshed on the page if the page is refreshed the window will redirect to the index.html file.

document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("navigated")) {
    window.location.href = "index.html";
  }
  sessionStorage.removeItem("navigated");
});

// Game Functions

function shootCircle(fromElement) {
  // Validate the provided element
  if (!fromElement) {
    console.error("shootCircle was called without a valid element.");
    return;
  }

  // Create the new circle element
  const newCircle = document.createElement("div");
  newCircle.classList.add("new-circle");
  document.body.appendChild(newCircle);

  // Get the dimensions and position of the shooting element

  const rect = fromElement.getBoundingClientRect();
  const initialLeft = rect.left + rect.width / 2 - 5;
  const bottom = window.innerHeight - rect.top;

  // Set the new circle's position and style

  newCircle.style.position = "absolute";
  newCircle.style.left = `${initialLeft}px`;
  newCircle.style.bottom = `${bottom}px`;

  // Animate the movement and collision detection of the shooting circle

  let position = parseInt(newCircle.style.bottom, 10);

  const interval = setInterval(() => {
    position += 4; // Speed of the projectile
    newCircle.style.bottom = `${position}px`;

    // Check for collisions with every descending circle
    document.querySelectorAll(".circle").forEach((circle) => {
      if (checkCollision(newCircle, circle)) {
        clearInterval(interval);
        removeCircle(newCircle); // Remove the shooting circle smoothly
        removeCircle(circle); // Remove the hit circle smoothly
        updateScore(1); // Update the score on collision
      }
    });

    // Remove the circle if it goes off screen
    if (position > window.innerHeight) {
      clearInterval(interval);
      removeCircle(newCircle);
    }
  }, 20);
}

//////////////////////////////

function removeCircle(circle) {
  circle.classList.add("removing"); // Start the fade-out and shrink effect
  setTimeout(() => {
    circle.parentNode.removeChild(circle); // Remove the element from the DOM after the transition
  }, 300); // 300ms matches the CSS transition duration
}

function updateScore(increment) {
  const scoreElement = document.getElementById("score");
  currentScore += increment; // Increment the current score
  scoreElement.textContent = currentScore; // Update the DOM
}

///////////////////////////////

function animateBottomCircle() {
  const bottomCircle = document.getElementById("bottom-circle");
  if (!bottomCircle) {
    console.error("bottom-circle element not found");
    return;
  }

  //////////////////////////////

  let positionX = bottomCircle.offsetLeft;
  let moveRight = true;
  const circleWidth = bottomCircle.offsetWidth;
  const screenWidth = window.innerWidth;

  function updatePosition() {
    if (!shouldAnimate) {
      bottomCircle.style.animation = "none";
      return;
    }
    if (moveRight) {
      positionX += 2;
      if (positionX + circleWidth > screenWidth) {
        moveRight = false;
      }
    } else {
      positionX -= 2;
      if (positionX < 0) {
        moveRight = true;
      }
    }

    bottomCircle.style.left = positionX + "px";
    requestAnimationFrame(updatePosition);
  }
  // Start the animation loop
  requestAnimationFrame(updatePosition);
}

//////////////////////////////

function removeCircle(circle) {
  circle.classList.add("removing");
  setTimeout(() => {
    if (circle.parentNode) {
      // Ensure the node is still part of the DOM
      circle.parentNode.removeChild(circle);
    }
  }, 300);
}

//////////////////////////////

function checkCollision(circle1, circle2) {
  const rect1 = circle1.getBoundingClientRect();
  const rect2 = circle2.getBoundingClientRect();

  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

requestAnimationFrame(moveCircle);

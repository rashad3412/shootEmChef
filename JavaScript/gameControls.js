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

/*

Game Functions Start Here

*/

function shootCircle(fromElement) {
  if (!fromElement) {
    console.error("shootCircle was called without a valid element.");
    return;
  }

  let newCircle = document.createElement("div");
  newCircle.classList.add("new-circle");
  document.body.appendChild(newCircle);

  const rect = fromElement.getBoundingClientRect();
  newCircle.style.position = "absolute";
  newCircle.style.left = `${rect.left + rect.width / 2 - 5}px`;
  newCircle.style.bottom = `${window.innerHeight - rect.top}px`;

  let position = parseInt(newCircle.style.bottom, 10);

  let interval = setInterval(() => {
    position += 4; // Speed of the projectile
    newCircle.style.bottom = `${position}px`;

    // Check for collisions with each descending circle
    document.querySelectorAll(".circle").forEach((circle) => {
      if (checkCollision(newCircle, circle)) {
        clearInterval(interval);
        removeCircle(newCircle); // Remove the shooting circle smoothly
        removeCircle(circle); // Remove the hit circle smoothly
        updateScore(1);
      }
    });

    if (position > window.innerHeight) {
      clearInterval(interval);
      removeCircle(newCircle); // Smoothly remove if it goes off screen
    }
  }, 20);
}

function updateScore(increment) {
  const scoreElement = document.getElementById("score");
  currentScore += increment; // Increment the current score
  scoreElement.textContent = currentScore; // Update the DOM
}

function removeCircle(circle) {
  circle.classList.add("removing"); // Start the fade-out and shrink effect
  setTimeout(() => {
    circle.parentNode.removeChild(circle); // Remove the element from the DOM after the transition
  }, 300); // 300ms matches the CSS transition duration
}

function animateBottomCircle() {
  const bottomCircle = document.getElementById("bottom-circle");
  if (!bottomCircle) {
    console.error("bottom-circle element not found");
    return;
  }

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
  requestAnimationFrame(updatePosition);
}

function removeCircle(circle) {
  circle.classList.add("removing");
  setTimeout(() => {
    if (circle.parentNode) {
      // Ensure the node is still part of the DOM
      circle.parentNode.removeChild(circle);
    }
  }, 300);
}

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

/* 

Game Controls

*/

//  checking to see if the session for game.html has beem closed or refreshed on the page if the page is refreshed the window will redirect to the index.html file.

if (!window.imageIntervals) {
  window.imageIntervals = [];
}

document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("navigated")) {
    window.location.href = "index.html";
  }
  sessionStorage.removeItem("navigated");
});

// Game Functions

function shootImages(fromElement) {
  if (!fromElement) {
    console.error("shootCircle was called without a valid element.");
    return;
  }

  const shootingProjectile = document.createElement("div");
  shootingProjectile.classList.add("shots");
  document.body.appendChild(shootingProjectile);

  const rect = fromElement.getBoundingClientRect();
  const initialLeft = rect.left + rect.width / 2 - 5;
  const bottom = window.innerHeight - rect.top;

  shootingProjectile.style.position = "absolute";
  shootingProjectile.style.left = `${initialLeft}px`;
  shootingProjectile.style.bottom = `${bottom}px`;

  let position = parseInt(shootingProjectile.style.bottom, 10);

  const interval = setInterval(() => {
    position += 4;
    shootingProjectile.style.bottom = `${position}px`;

    document.querySelectorAll("#img-container img ").forEach((img) => {
      if (checkCollision(shootingProjectile, img)) {
        clearInterval(interval);
        removeImageAndShotProjectile(shootingProjectile);
        removeImageAndShotProjectile(img);
        updateScore(1);
      }
    });

    if (position > window.innerHeight) {
      clearInterval(interval);
      shootingProjectile.remove();
    }
  }, 15);

  if (!window.imageIntervals) {
    window.imageIntervals = [];
  }

  window.imageIntervals.push(interval);
}

//////////////////////////////

function removeImageAndShotProjectile(img) {
  // Remove the image from the DOM
  img.parentNode.removeChild(img);

  // Check if all images have been shot down
  if (document.querySelectorAll("#img-container img").length === 0) {
    stopGameAnimation(); // Stop the game because all images have been shot down
  }
}

///////////////////////////////

function animateBottomCircle() {
  const bottomCircle = document.getElementById("bottom-circle");

  if (!bottomCircle) {
    console.error("bottom-circle element not found");
    bottomCircle.style.animation = "sideToSide 2s ease-in-out infinite";
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

function checkCollision(img1, img2) {
  const rect1 = img1.getBoundingClientRect();
  const rect2 = img2.getBoundingClientRect();

  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

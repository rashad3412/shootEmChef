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

if (!window.imageIntervals) {
  window.imageIntervals = [];
}

// Game Functions

function shootImages(fromElement) {
  if (!fromElement) {
    console.error("shootImages was called without a valid element.");
    return;
  }

  const shootingProjectile = document.createElement("div");
  shootingProjectile.classList.add("shots");
  document.body.appendChild(shootingProjectile);

  const rect = fromElement.getBoundingClientRect();
  const initialLeft = rect.left + rect.width / 2 - 30; // Adjust if needed
  const bottom = window.innerHeight - rect.bottom + 83; // Adjust for initial position

  // Set the initial position of the projectile
  shootingProjectile.style.left = `${initialLeft}px`; // No horizontal movement, just shoot straight
  shootingProjectile.style.bottom = `${bottom}px`;

  let position = parseInt(shootingProjectile.style.bottom, 10);

  const interval = setInterval(() => {
    // Move the projectile straight upward
    position += 4; // Adjust speed if needed
    shootingProjectile.style.bottom = `${position}px`;

    // Check collision with images
    document.querySelectorAll("#img-container img").forEach((img) => {
      if (checkCollision(shootingProjectile, img)) {
        clearInterval(interval);
        removeImageAndShotProjectile(shootingProjectile);
        removeImageAndShotProjectile(img);
        updateScore(1);
      }
    });

    // Remove projectile if it goes off the screen
    if (position > window.innerHeight) {
      clearInterval(interval);
      shootingProjectile.remove();
    }
  }, 20);

  if (!window.projectileIntervals) {
    window.projectileIntervals = [];
  }
  window.projectileIntervals.push(interval);
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

//////////////////////////////

function removeImageAndShotProjectile(img) {
  // Ensure the image exists and hasn't already been removed
  if (img && img.parentNode && img.getAttribute("data-removed") !== "true") {
    // Mark the image as removed to prevent future interaction
    img.setAttribute("data-removed", "true");

    // Remove the image from the DOM
    img.parentNode.removeChild(img);
  } else {
    console.warn(
      "Attempted to remove an image that no longer exists or is null:",
      img
    );
  }

  // Check if all images have been shot down
  if (document.querySelectorAll("#img-container img").length === 0) {
    if (gameisActive) {
      updatedLevel();
    } else {
      setTimeout(() => {
        stopGameAnimation();
      }, 500);
    }
  }
}

///////////////////////////////
function animateChefMovements() {
  const chefMovements = document.getElementById("chefImg");

  if (!chefMovements) {
    console.error("chefImg element not found");
    return;
  }

  let positionX = chefMovements.offsetLeft; // Starting position
  let moveRight = true; // Direction of movement
  const chefWidth = chefMovements.offsetWidth; // Width of the chef image
  const screenWidth = window.innerWidth; // Screen width

  function updatePosition() {
    if (!shouldAnimate) {
      return;
    }

    // Move the chef image based on the direction
    if (moveRight) {
      positionX += 5.5; // Move to the right
      if (positionX + chefWidth >= screenWidth) {
        moveRight = false; // Switch to move left when hitting the right edge
      }
    } else {
      positionX -= 5.5; // Move to the left
      if (positionX <= 0) {
        moveRight = true; // Switch to move right when hitting the left edge
      }
    }

    // Update the position of the chef image
    chefMovements.style.left = `${positionX}px`;

    // Continue the animation loop
    requestAnimationFrame(updatePosition);
  }

  // Start the animation loop
  requestAnimationFrame(updatePosition);
}

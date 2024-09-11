//////////////////////////////////////

function addImagesToPage(elementId, imageCount) {
  const container = document.getElementById(elementId);

  if (!container) {
    console.error(`Element with ID ${elementId} not found.`);
    return;
  }

  container.innerHTML = "";

  for (let i = 1; i <= imageCount; i++) {
    let img = document.createElement("img");
    img.src = `assets/FoodPic/foodPic${i}.png`;
    img.alt = `Image ${i}`;
    img.classList.add("game-image");

    // Fix the position of each image so they don't move unexpectedly
    img.style.position = "absolute";
    img.style.top = `${Math.random() * 100}px`; // Random starting position
    img.style.left = `${Math.random() * (container.offsetWidth - 50)}px`; // Random horizontal placement

    container.appendChild(img);
  }
}

//////////////////////////////////////

window.imgIntervals = [];

function moveImagesDown() {
  const imagesGoingDownScreen = document.querySelectorAll("#img-container img");
  let playAgainShown = false;
  let totalImages = imagesGoingDownScreen.length;

  imagesGoingDownScreen.forEach((img, index) => {
    let position = 0;
    const speed = Math.random() * 2 + 1;

    const interval = setInterval(() => {
      position += speed;
      img.style.transform = `translateY(${position}px)`;

      if (position >= window.innerHeight) {
        clearInterval(interval);
        removeImageAndShotProjectile(img);

        totalImages--;
        if (!playAgainShown) {
          stopGameAnimation();
          playAgainShown = true;
        }
      }
    }, 35);

    window.imgIntervals.push(interval);
  });
}

function stopGameAnimation() {
  gameisActive = false; // Global varible
  shouldAnimate = false; // Global varible

  playAgainSection.style.display = "flex";
  score.textContent = "0";

  window.imgIntervals.forEach((interval) => clearInterval(interval));
  window.imgIntervals = [];
}

// Your bottomCircle function to prevent shooting after reset
function bottomCircle() {
  const bottomCircle = document.getElementById("bottom-circle");
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && gameisActive) {
      // Ensure shooting is only possible when the game is active
      if (bottomCircle) {
        shootImages(bottomCircle);
      } else {
        console.error("bottom-circle element not found");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", bottomCircle);

//////////////////////////////////////

function addImagesToPage(elementId, imageCount) {
  const container = document.getElementById(elementId);

  if (!container) {
    console.error(`Element with ID ${elementId} not found.`);
    return; // Exit the function if the container isn't found
  }

  container.innerHTML = "";

  const addedImages = new Set();

  for (let i = 1; i <= imageCount; i++) {
    const imgSrc = `assets/FoodPic/foodPic${i}.png`;

    if (!addedImages.has(imgSrc)) {
      let img = document.createElement("img");

      img.src = imgSrc;
      img.alt = `Image ${i}`;
      img.classList.add("game-image");

      // Add image to the container
      container.appendChild(img);

      // Track this image to prevent duplicates
      addedImages.add(imgSrc);
    }
  }
}

//////////////////////////////////////

window.imgIntervals = [];

function moveImagesDown() {
  // controlling the movement of the circles going down
  const imagesGoingDownScreen = document.querySelectorAll("#img-container img");

  let playAgainShown = false;

  imagesGoingDownScreen.forEach((img, index) => {
    let position = 0;
    const speed = Math.random() * 2 + 1;

    const interval = setInterval(() => {
      position += speed;
      img.style.transform = `translateY(${position}px)`;

      if (position >= window.innerHeight) {
        clearInterval(interval);
        removeImageAndShotProjectile(img);

        if (!playAgainShown) {
          stopGameAnimation();
          // playAgainShown = true;
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

function bottomCircle() {
  const bottomCircle = document.getElementById("bottom-circle");
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && gameisActive) {
      if (bottomCircle) {
        shootImages(bottomCircle);
      } else {
        console.error("bottom-circle element not found");
      }
    }
  });
}

bottomCircle();

document.addEventListener("DOMContentLoaded", bottomCircle);

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

      // Fix the position of each image so they don't move unexpectedly
      img.style.position = "absolute";
      img.style.top = `${Math.random() * 100}px`; // Random starting position
      img.style.left = `${Math.random() * (container.offsetWidth - 50)}px`; // Random horizontal placement

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
  const imagesGoingDownScreen = document.querySelectorAll("#img-container img");
  console.log(imagesGoingDownScreen);

  imagesGoingDownScreen.forEach((img, index) => {
    let position = 0;
    const speed = Math.random() * 3 + 1;

    const interval = setInterval(() => {
      // Check if the game is still active and image hasn't been removed
      if (!img.getAttribute("data-removed")) {
        position += speed;
        img.style.transform = `translateY(${position}px)`;

        // If the image reaches the bottom of the screen
        if (position >= window.innerHeight - img.height) {
          clearInterval(interval);

          // Ensure the image is handled only once
          if (img.getAttribute("data-removed") !== "true") {
            console.log("Image hit the bottom:", img);
            removeImageAndShotProjectile(img); // Safely remove the image
            stopGameAnimation();
          }
        }
      } else {
        // Image has been removed, clear the interval
        clearInterval(interval);
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
      event.preventDefault(); // Ensure shooting is only possible when the game is active
      if (bottomCircle) {
        shootImages(bottomCircle);
      } else {
        console.error("bottom-circle element not found");
      }
    }
  });
}

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

      if (position >= window.innerHeight && !playAgainShown) {
        clearInterval(interval);
        removeImageAndShotProjectile(img);
        if (!playAgainShown) {
          stopGameAnimation();
          playAgainShown = true;
        }
      }
    }, 35);

    window.imgIntervals.push(interval);
  });
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

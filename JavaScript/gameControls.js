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

  // styles are added in CSS
  newCircle.classList.add("new-circle");

  const rect = fromElement.getBoundingClientRect();

  // Gets the element's position relative to the viewport

  newCircle.style.left = rect.left + rect.width / 2 - 5 + "px";
  // Center the circle horizontally

  newCircle.style.bottom = window.innerHeight - rect.top + "px";
  // Position at the bottom of the element

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

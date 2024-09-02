document.addEventListener("DOMContentLoaded", function () {
  addCirclesToPage("circles", 5);
});

// main.js
document.addEventListener("DOMContentLoaded", () => {
  const newGameLink = document.querySelector('a[href="game.html"]');
  if (newGameLink) {
    newGameLink.addEventListener("click", function (event) {
      sessionStorage.setItem("navigated", "true");
    });
  }
});

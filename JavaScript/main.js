// This is checking to see if the game.html file is still in session in the browswer when the page is refreshed or closed it redirects back to the index.html

document.addEventListener("DOMContentLoaded", () => {
  const newGameLink = document.querySelector('a[href="game.html"]');

  if (newGameLink) {
    // Handle both click and touch events for mobile
    newGameLink.addEventListener("click", function (event) {
      sessionStorage.setItem("navigated", "true");
    });

    newGameLink.addEventListener("touchstart", function (event) {
      sessionStorage.setItem("navigated", "true");
    });
  }
});

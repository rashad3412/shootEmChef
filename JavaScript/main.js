// As the Document is loaded this is adding the circles to the index.html file.

// document.addEventListener("DOMContentLoaded", function () {
//   addCirclesToPage("circles", 5);
// });

// As the document is loaded this is taking a new Game link Varible and checking to see if the game.html file is reloaded/refreshed if the file is reloaded it directs back to the index.html file
document.addEventListener("DOMContentLoaded", () => {
  const newGameLink = document.querySelector('a[href="game.html"]');
  if (newGameLink) {
    newGameLink.addEventListener("click", function (event) {
      sessionStorage.setItem("navigated", "true");
    });
  }
});

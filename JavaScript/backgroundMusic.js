let backgroundMusic = new Audio("sounds/backgroundMusic.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;
// backgroundMusic.playbackRate = 0.9;

function playBackgroundMusic() {
  backgroundMusic.play();
}

function stopBackGroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}

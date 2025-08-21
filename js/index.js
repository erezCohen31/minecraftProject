// Get DOM elements
const video = document.getElementById("bgVideo");
const continueGameBtn = document.getElementById("continueGameBtn");

// Slow down background video playback
video.playbackRate = 0.5;

// Handle "Continue Game" button click
continueGameBtn.addEventListener("click", () => {
  // Check if there is a saved map in localStorage
  if (localStorage.getItem("mapGeneral")) {
    localStorage.setItem("gameState", "continue"); // Mark that we want to continue
    window.location.href = "./pages/game.html"; // Go to the game page
  } else {
    alert("No saved game found!"); // Show alert if no saved game
  }
});

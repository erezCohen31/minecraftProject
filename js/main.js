import { MapManager } from "./mapManager.js";
import { InteractionManager } from "./interactionManager.js";
import { loadMap, saveMap } from "./utils.js";
import { StorageManager } from "./storageManager.js";

// --- DOM elements ---
const main = document.querySelector("#map-container"); // Map container
const toolsContainer = document.getElementById("tools"); // Tools panel
const storage = document.querySelector(".storege"); // Storage section
const savedStorage = localStorage.getItem("storageTiles");

let map = [];

// --- Load saved map from localStorage ---
const savedMap = loadMap();

// --- Determine if we should continue a saved game or start a new one ---
if (savedMap.length > 0 && localStorage.getItem("gameState") === "continue") {
  map = savedMap; // Use the saved map
  console.log("Continuing saved game...");
} else {
  map = MapManager.generateMap(); // Generate a new map
  saveMap(map); // Save it immediately
  console.log("Starting a new game...");
}

// --- Load saved storage if exists ---
if (savedStorage && localStorage.getItem("gameState") === "continue") {
  StorageManager.storageTiles = JSON.parse(savedStorage);

  // Update the visual display for all tiles
  for (let tile in StorageManager.storageTiles) {
    StorageManager.updateStorage(tile, 0); // delta=0 just refreshes the display
  }
}

// --- Render the map ---
MapManager.renderMap(map, main);

// --- Setup user interactions for tools and storage ---
InteractionManager.setupInteractions(main, toolsContainer, storage);

// --- Clear the gameState flag to avoid auto-continuing next time ---
localStorage.removeItem("gameState");

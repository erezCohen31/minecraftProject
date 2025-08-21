import { MapManager } from "./mapManager.js";
import { InteractionManager } from "./interactionManager.js";
import { loadMap, saveMap } from "./utils.js";

// DOM elements
const main = document.querySelector("#map-container"); // Container for the map
const toolsContainer = document.getElementById("tools"); // Tools selection panel
const storage = document.querySelector(".storege"); // Storage section

let map = [];

// Load saved map from localStorage
const savedMap = loadMap();

// Determine whether to continue a saved game or start a new one
if (savedMap.length > 0 && localStorage.getItem("gameState") === "continue") {
  map = savedMap; // Use the saved map
} else {
  map = MapManager.generateMap(); // Generate a new map
  saveMap(map); // Save it immediately
}

// Render the map in the DOM
MapManager.renderMap(map, main);

// Set up user interactions (tools and storage clicks)
InteractionManager.setupInteractions(main, toolsContainer, storage);

// Clear the gameState flag to avoid accidentally continuing next time
localStorage.removeItem("gameState");

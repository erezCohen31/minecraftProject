// === Utility functions ===

// Get a random integer between min and max (inclusive)
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Extract row (i) and column (j) from a tile ID like "tile-2-3"
export function getTileCoordinates(tileId) {
  const parts = tileId.split("-"); // ["tile", "i", "j"]
  const i = parseInt(parts[1], 10);
  const j = parseInt(parts[2], 10);
  return { i, j };
}

// === Map storage ===
export let mapGeneral = []; // current map in memory

// === Map operations using localStorage ===

// Load map from localStorage
export function loadMap() {
  const data = localStorage.getItem("mapGeneral");
  mapGeneral = data ? JSON.parse(data) : [];
  return mapGeneral;
}

// Save map to localStorage
export function saveMap(map = mapGeneral) {
  localStorage.setItem("mapGeneral", JSON.stringify(map));
}

// Update a single tile in memory and save
export function updateTile(i, j, newValue) {
  if (!mapGeneral[i] || mapGeneral[i][j] === undefined) return;

  mapGeneral[i][j] = newValue;
  saveMap(); // auto-save
}

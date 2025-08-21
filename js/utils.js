// Utility functions
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Extracts row (i) and column (j) from a tile ID

export function getTileCoordinates(tileId) {
  const parts = tileId.split("-"); // ["tile", "i", "j"]
  const i = parseInt(parts[1], 10);
  const j = parseInt(parts[2], 10);
  return { i, j };
}

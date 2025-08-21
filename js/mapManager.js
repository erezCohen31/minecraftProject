import { getRandomInt } from "./utils.js";
import { saveMap } from "./utils.js";

export const MapManager = {
  MAP_COLS: 50, // Number of columns in the map
  MAP_ROWS: 30, // Number of rows in the map
  TILE_SIZE: 32, // Tile size in pixels
  TILE_SYMBOLS: {
    d: "dirt-tile",
    s: "sky-tile",
    t: "trunk-tile",
    l: "leaf-tile",
    dt: "dirtTop-tile",
  },
  tileIndex: 0, // Optional, could be used for unique tile IDs

  // Generate a new map with sky, dirt, and trees
  generateMap() {
    const skyRow = Math.floor((this.MAP_ROWS / 3) * 1.2); // Height of the sky
    const map = [];

    for (let i = 0; i < this.MAP_ROWS; i++) {
      const row = [];
      for (let j = 0; j < this.MAP_COLS; j++) {
        // Fill row with sky, dirtTop, or dirt
        row.push(i < skyRow ? "s" : i === skyRow ? "dt" : "d");
      }
      map.push(row);
    }

    this.generateTrees(map, skyRow); // Add trees to the map

    saveMap(map); // Save the newly generated map to localStorage
    return map;
  },

  // Generate multiple trees randomly across the map
  generateTrees(map, skyRow) {
    let col = 5;
    while (col < this.MAP_COLS - 5) {
      const treeWidth = this.buildTree(map, skyRow - 1, col);
      col += treeWidth + getRandomInt(2, 5); // Random spacing between trees
    }
  },

  // Build a single tree with trunk and canopy
  buildTree(map, startRow, startCol) {
    const trunkHeight = getRandomInt(3, 5);
    const canopyHeight = 6;
    const baseWidth = 6;

    // Build the trunk
    for (let i = 0; i < trunkHeight; i++)
      if (startRow - i >= 0) map[startRow - i][startCol] = "t";

    // Build the canopy
    for (let r = 0; r < canopyHeight; r++) {
      const row = startRow - trunkHeight - r;
      if (row < 0) break;
      const halfWidth = Math.floor(baseWidth / 2 - Math.floor(r / 2));
      for (let c = -halfWidth; c <= halfWidth; c++) {
        const col = startCol + c;
        if (col >= 0 && col < this.MAP_COLS) map[row][col] = "l";
      }
    }

    return baseWidth; // Return tree width for spacing calculations
  },

  // Render the map in the DOM
  renderMap(matrixMap, main) {
    main.innerHTML = ""; // Clear previous map
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < matrixMap.length; i++) {
      for (let j = 0; j < matrixMap[i].length; j++) {
        const tile = document.createElement("div");
        tile.id = `tile-${i}-${j}`;
        tile.style.gridRow = i + 1;
        tile.style.gridColumn = j + 1;
        tile.style.width = `${this.TILE_SIZE}px`;
        tile.style.height = `${this.TILE_SIZE}px`;
        tile.classList.add(this.TILE_SYMBOLS[matrixMap[i][j]]);
        fragment.appendChild(tile);
      }
    }

    main.appendChild(fragment);

    // Setup CSS Grid for map layout
    main.style.gridTemplateColumns = `repeat(${this.MAP_COLS}, ${this.TILE_SIZE}px)`;
    main.style.gridAutoRows = `${this.TILE_SIZE}px`;
  },
};

const main = document.querySelector("main");
const viewport = document.getElementById("viewport");
const tollEvent = document.getElementById("tools");
let toolid = "";

const toolsKit = { 
  shovel: ["dirt-tile", "dirtTop-tile"],
  axe: ["trunk-tile"],
  hoe: ["leaf-tile"],
  pickaxe: ["rock-tile"]
};


let index = 0;

// === Tile symbols ===
const d = "d", // dirt
  s = "s", // sky
  t = "t", // trunk
  l = "l", // leaf
  dt = "dt"; // dirt top

// === Map configuration ===
const MAP_COLS = 50;
const MAP_ROWS = 30;
const TILE_SIZE = 32;

/**
 * Generate the base map matrix
 */
function generateMap() {
  const skyRow = (MAP_ROWS / 3) * 1.2;
  const map = [];

  for (let i = 0; i < MAP_ROWS; i++) {
    const row = [];
    for (let j = 0; j < MAP_COLS; j++) {
      if (i < skyRow) {
        row.push(s);
      } else if (i < skyRow + 1) {
        row.push(dt);
      } else {
        row.push(d);
      }
    }
    map.push(row);
  }

  generateTrees(map, skyRow);
  return map;
}

/**
 * Generate trees along the ground
 */
function generateTrees(map, skyRow) {
  let col = 5;

  while (col < MAP_COLS - 5) {
    // Build one tree and get its width
    const treeWidth = buildTree(map, skyRow - 1, col);

    // Move to the next tree position (tree width + random spacing)
    col += treeWidth + getRandomInt(2, 5);
  }
}

/**
 * Build a tree with trunk + canopy
 */
function buildTree(map, startRow, startCol) {
  const trunkHeight = getRandomInt(3, 5); // trunk height
  const canopyHeight = 6; // fixed canopy height
  const baseWidth = 6; // base width
  const topWidth = 3; // top width

  // === Trunk ===
  for (let i = 0; i < trunkHeight; i++) {
    if (startRow - i >= 0) {
      map[startRow - i][startCol] = t;
    }
  }

  // === Pyramid canopy ===
  for (let r = 0; r < canopyHeight; r++) {
    const row = startRow - trunkHeight - r;
    if (row < 0) break;

    // Decrease width every 2 rows
    const halfWidth = Math.floor(baseWidth / 2 - Math.floor(r / 2));

    for (let c = -halfWidth; c <= halfWidth; c++) {
      const col = startCol + c;
      if (col >= 0 && col < map[0].length) {
        map[row][col] = l;
      }
    }
  }

  return baseWidth; // return tree width for spacing
}

/**
 * Render the map into the DOM
 */
function loadMap(matrixMap) {
  main.innerHTML = "";
  const fragment = document.createDocumentFragment();

  const tileClasses = {
    d: "dirt-tile",
    s: "sky-tile",
    t: "trunk-tile",
    l: "leaf-tile",
    dt: "dirtTop-tile",
  };

  for (let i = 0; i < matrixMap.length; i++) {
    for (let j = 0; j < matrixMap[i].length; j++) {
      const tile = document.createElement("div");
      tile.id = `tile-${index++}`;
      tile.style.gridRow = i + 1;
      tile.style.gridColumn = j + 1;
      tile.style.width = `${TILE_SIZE}px`;
      tile.style.height = `${TILE_SIZE}px`;

      const cls = tileClasses[matrixMap[i][j]];
      if (cls) tile.classList.add(cls);

      fragment.appendChild(tile);
    }
  }

  main.appendChild(fragment);

  main.style.gridTemplateColumns = `repeat(${MAP_COLS}, ${TILE_SIZE}px)`;
  main.style.gridAutoRows = `${TILE_SIZE}px`;
}

/**
 * Click to decorate (turn any tile into sky)
 */

function decorateOnClick() {
  main.addEventListener("click", (event) => {
    const target = event.target;
    const classname = target.classList;

    const validTiles = toolsKit[toolid];
    if (validTiles.some(tile => classname.contains(tile))) {
      target.className = "";
      target.classList.add("sky-tile");
    }
  });
}
/**
 * Get random integer in range [min, max]
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// === Run ===
const map = generateMap();
loadMap(map);
decorateOnClick();

function takeToolId() {
  tollEvent.addEventListener("click", (e) => {
    toolid = e.target.id;
    console.log(toolid);
  });
}
takeToolId();

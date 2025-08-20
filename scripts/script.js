const main = document.querySelector("main");
let index = 0;

// Symbols
const d = "d";
const s = "s";
const t = "t";
const l = "l";
const dt = "dt";

// Fixed map size
const FIXED_COLS = 45;
const FIXED_ROWS = 20;

/**
 * Generates a fixed-size map
 */
function generateMap() {
  const map = [];
  for (let i = 0; i < FIXED_ROWS; i++) {
    const row = [];
    for (let j = 0; j < FIXED_COLS; j++) {
      if (i >= FIXED_ROWS - 5) row.push(d);
      else if (i >= FIXED_ROWS - 3) row.push(dt);
      else row.push(s);
    }
    map.push(row);
  }
  return map;
}

/**
 * Loads the map into the DOM
 */
function loadMap(matrixMap, tileWidth, tileHeight) {
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
      tile.style.width = `${tileWidth}px`;
      tile.style.height = `${tileHeight}px`;

      const cls = tileClasses[matrixMap[i][j]];
      if (cls) tile.classList.add(cls);

      fragment.appendChild(tile);
    }
  }

  main.appendChild(fragment);
}

/**
 * Initialize map: fixed rows/cols, tiles stretch to fill screen
 */
function init() {
  const tileWidth = window.innerWidth / FIXED_COLS;
  const tileHeight = window.innerHeight / FIXED_ROWS;

  const map = generateMap();

  main.style.display = "grid";
  main.style.gridTemplateColumns = `repeat(${FIXED_COLS}, ${tileWidth}px)`;
  main.style.gridAutoRows = `${tileHeight}px`;

  loadMap(map, tileWidth, tileHeight);
}

// Initial load
init();

// Update on window resize
window.addEventListener("resize", () => {
  index = 0;
  init();
});

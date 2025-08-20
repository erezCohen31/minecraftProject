const main = document.querySelector("main");
let index = 0;

// Define symbols
const d = "d"; // dirt
const s = "s"; // sky
const t = "t"; // trunk
const l = "l"; // leaf
const dt = "dt"; // dirt top

// Tile size in pixels
const tileSize = 18;

/**
 * Generates an empty map (sky + ground) based on the number of rows and columns
 */
function generateMap(rows, cols) {
  const map = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      if (i >= rows - 2) {
        row.push(d); // last 2 rows = ground
      } else {
        row.push(s); // sky
      }
    }
    map.push(row);
  }

  // Example: add a small tree in the middle
  const midRow = Math.floor(rows / 2);
  const midCol = Math.floor(cols / 2);
  if (rows > 4 && cols > 4) {
    map[midRow][midCol] = l;
    map[midRow + 1][midCol] = t;
  }

  return map;
}

/**
 * Loads the map into the DOM
 */
function loadMap(matrixMap) {
  main.innerHTML = ""; // reset
  const fragment = document.createDocumentFragment();

  const tileClasses = {
    [d]: "dirt-tile",
    [s]: "sky-tile",
    [t]: "trunk-tile",
    [l]: "leaf-tile",
    [dt]: "dirtTop-tile",
  };

  for (let i = 0; i < matrixMap.length; i++) {
    for (let j = 0; j < matrixMap[i].length; j++) {
      const tile = document.createElement("div");
      tile.id = `tile-${index++}`;
      tile.style.gridRow = i + 1;
      tile.style.gridColumn = j + 1;

      const cls = tileClasses[matrixMap[i][j]];
      if (cls) tile.classList.add(cls);

      fragment.appendChild(tile);
    }
  }

  main.appendChild(fragment);
}

/**
 * Responsive initialization
 */
function init() {
  const cols = Math.floor(window.innerWidth / tileSize);
  const rows = Math.floor(window.innerHeight / tileSize);
  const map = generateMap(rows, cols);

  // Set up the main CSS grid
  main.style.display = "grid";
  main.style.gridTemplateColumns = `repeat(${cols}, ${tileSize}px)`;
  main.style.gridAutoRows = `${tileSize}px`;

  loadMap(map);
}

init();

// Optional: regenerate map when window is resized
window.addEventListener("resize", () => {
  index = 0;
  init();
});

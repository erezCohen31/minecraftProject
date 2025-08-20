const main = document.querySelector("main");
const viewport = document.getElementById("viewport");
let index = 0;

// Symbols
const d = "d",
  s = "s",
  t = "t",
  l = "l",
  dt = "dt";

// Map size
const MAP_COLS = 50;
const MAP_ROWS = 30;

const TILE_SIZE = 32;

function generateMap() {
  const map = [];
  for (let i = 0; i < MAP_ROWS; i++) {
    const row = [];
    for (let j = 0; j < MAP_COLS; j++) {
      if (i >= MAP_ROWS - 13) row.push(d);
      else if (i >= MAP_ROWS - 14) row.push(dt);
      else row.push(s);
    }
    map.push(row);
  }
  return map;
}

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

function decorateOnClick() {
  main.addEventListener("click", (event) => {
    const target = event.target;
    //remove all class
    target.className = "";

    // add the good class
    target.classList.add("sky-tile");
  });
}

const map = generateMap();
loadMap(map);
decorateOnClick();

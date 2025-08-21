import { getRandomInt } from "./utils.js";

export const MapManager = {
  MAP_COLS: 50,
  MAP_ROWS: 30,
  TILE_SIZE: 32,
  TILE_SYMBOLS: {
    d: "dirt-tile",
    s: "sky-tile",
    t: "trunk-tile",
    l: "leaf-tile",
    dt: "dirtTop-tile",
  },
  tileIndex: 0,

  generateMap() {
    const skyRow = Math.floor((this.MAP_ROWS / 3) * 1.2);
    const map = [];
    for (let i = 0; i < this.MAP_ROWS; i++) {
      const row = [];
      for (let j = 0; j < this.MAP_COLS; j++) {
        row.push(i < skyRow ? "s" : i === skyRow ? "dt" : "d");
      }
      map.push(row);
    }
    this.generateTrees(map, skyRow);
    return map;
  },

  generateTrees(map, skyRow) {
    let col = 5;
    while (col < this.MAP_COLS - 5) {
      const treeWidth = this.buildTree(map, skyRow - 1, col);
      col += treeWidth + getRandomInt(2, 5);
    }
  },

  buildTree(map, startRow, startCol) {
    const trunkHeight = getRandomInt(3, 5);
    const canopyHeight = 6;
    const baseWidth = 6;

    for (let i = 0; i < trunkHeight; i++)
      if (startRow - i >= 0) map[startRow - i][startCol] = "t";

    for (let r = 0; r < canopyHeight; r++) {
      const row = startRow - trunkHeight - r;
      if (row < 0) break;
      const halfWidth = Math.floor(baseWidth / 2 - Math.floor(r / 2));
      for (let c = -halfWidth; c <= halfWidth; c++) {
        const col = startCol + c;
        if (col >= 0 && col < this.MAP_COLS) map[row][col] = "l";
      }
    }
    return baseWidth;
  },

  renderMap(matrixMap, main) {
    main.innerHTML = "";
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < matrixMap.length; i++) {
      for (let j = 0; j < matrixMap[i].length; j++) {
        const tile = document.createElement("div");
        tile.id = `tile-${this.tileIndex++}`;
        tile.style.gridRow = i + 1;
        tile.style.gridColumn = j + 1;
        tile.style.width = `${this.TILE_SIZE}px`;
        tile.style.height = `${this.TILE_SIZE}px`;
        tile.classList.add(this.TILE_SYMBOLS[matrixMap[i][j]]);
        fragment.appendChild(tile);
      }
    }
    main.appendChild(fragment);
    main.style.gridTemplateColumns = `repeat(${this.MAP_COLS}, ${this.TILE_SIZE}px)`;
    main.style.gridAutoRows = `${this.TILE_SIZE}px`;
  },
};

// StorageManager handles collected tiles and updates the storage UI
export const StorageManager = {
  // Number of tiles currently stored for each type
  storageTiles: {
    "dirt-tile": 0,
    "dirtTop-tile": 0,
    "trunk-tile": 0,
    "leaf-tile": 0,
  },

  // DOM elements corresponding to each storage tile
  storageElements: {
    "dirt-tile": document.getElementById("dirt"),
    "dirtTop-tile": document.getElementById("dirtTop"),
    "trunk-tile": document.getElementById("trunk"),
    "leaf-tile": document.getElementById("leaf"),
  },

  // Update the storage count for a tile type
  // delta can be positive (add) or negative (remove)
  updateStorage(tileClass, delta = 0) {
    if (delta !== 0) {
      this.storageTiles[tileClass] += delta;
    }

    const count = this.storageTiles[tileClass];

    // Update the display depending on count
    if (count > 0) {
      this.storageElements[tileClass].style.display = "inline-block";
      this.storageElements[tileClass].textContent = count;
      this.storageElements[tileClass].style.color = "white";
    } else {
      this.storageElements[tileClass].style.display = "none";
    }
  },
};

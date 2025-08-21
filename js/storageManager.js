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

  // Update the storage count for a specific tile type
  // delta: positive to add, negative to remove
  updateStorage(tileClass, delta = 0) {
    // Update the count in memory
    if (delta !== 0) {
      this.storageTiles[tileClass] += delta;
    }

    const count = this.storageTiles[tileClass];

    // Update the visual display
    if (count > 0) {
      const element = this.storageElements[tileClass];
      element.style.display = "inline-block";
      element.textContent = count;
      element.style.color = "white";
    } else {
      this.storageElements[tileClass].style.display = "none";
    }

    // Persist storage to localStorage
    localStorage.setItem("storageTiles", JSON.stringify(this.storageTiles));
  },
};

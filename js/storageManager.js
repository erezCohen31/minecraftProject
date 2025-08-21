// StorageManager
export const StorageManager = {
  storageTiles: {
    "dirt-tile": 0,
    "dirtTop-tile": 0,
    "trunk-tile": 0,
    "leaf-tile": 0,
  },
  storageElements: {
    "dirt-tile": document.getElementById("dirt"),
    "dirtTop-tile": document.getElementById("dirtTop"),
    "trunk-tile": document.getElementById("trunk"),
    "leaf-tile": document.getElementById("leaf"),
  },

  updateStorage(tileClass, delta = 0) {
    if (delta !== 0) {
      this.storageTiles[tileClass] += delta;
    }

    const count = this.storageTiles[tileClass];
    if (count > 0) {
      this.storageElements[tileClass].style.display = "inline-block";
      this.storageElements[tileClass].textContent = count;
      this.storageElements[tileClass].style.color = "white";
    } else {
      this.storageElements[tileClass].style.display = "none";
    }
  },
};

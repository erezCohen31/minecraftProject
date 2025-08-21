import { ToolManager } from "./toolsManager.js";
import { StorageManager } from "./storageManager.js";

export const InteractionManager = {
  selectedTool: "",
  selectedTileClass: "",

  setupInteractions(main, toolsContainer, storage) {
    // Click on map tiles
    main.addEventListener("click", (event) => {
      const target = event.target;
      const tileClass = target.className;
      const validTiles = ToolManager.toolsKit[this.selectedTool];

      // Mine tile
      if (validTiles && validTiles.includes(tileClass)) {
        target.className = "sky-tile";
        StorageManager.updateStorage(tileClass, +1);
      }
      // Place tile from storage
      else if (
        tileClass === "sky-tile" &&
        StorageManager.storageTiles[this.selectedTileClass] > 0
      ) {
        target.className = this.selectedTileClass;
        StorageManager.updateStorage(this.selectedTileClass, -1);
      }
    });

    // Select tool
    toolsContainer.addEventListener("click", (event) => {
      this.selectedTool = event.target.id;
      this.selectedTileClass = "";
      this.updateCursor();
    });

    // Select tile from storage
    storage.addEventListener("click", (event) => {
      this.selectedTileClass = event.target.className;
      this.selectedTool = "";
      this.updateCursor();
    });
  },

  // Update cursor based on selection
  updateCursor() {
    document.body.className = "";
    const type = this.selectedTool || this.selectedTileClass;
    const cursorMap = {
      axe: "cursor-axe",
      shovel: "cursor-shovel",
      hoe: "cursor-hoe",
      pickaxe: "cursor-pickaxe",
      "dirt-tile": "cursor-dirt",
      "dirtTop-tile": "cursor-dirtTop",
      "trunk-tile": "cursor-trunk",
      "leaf-tile": "cursor-leaf",
    };
    document.body.classList.add(cursorMap[type] || "cursor-default");
    console.log(document.body.classList);
    console.log(type);
  },
};

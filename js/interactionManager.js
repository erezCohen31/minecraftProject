import { ToolManager } from "./toolsManager.js";
import { StorageManager } from "./storageManager.js";
import { getTileCoordinates, updateTile } from "./utils.js";

export const InteractionManager = {
  selectedTool: "", // Currently selected tool
  selectedTileClass: "", // Currently selected tile from storage

  setupInteractions(main, toolsContainer, storage) {
    // --- Click on map tiles ---
    main.addEventListener("click", (event) => {
      const target = event.target;
      const tileClass = target.className;
      const { i, j } = getTileCoordinates(target.id);

      // Mining a tile using the selected tool
      const validTiles = ToolManager.toolsKit[this.selectedTool];
      if (validTiles && validTiles.includes(tileClass)) {
        target.className = "sky-tile"; // Change tile to sky
        updateTile(i, j, "s"); // Update mapGeneral and localStorage
        StorageManager.updateStorage(tileClass, +1); // Add to storage
      }
      // Placing a tile from storage
      else if (
        tileClass === "sky-tile" &&
        StorageManager.storageTiles[this.selectedTileClass] > 0
      ) {
        target.className = this.selectedTileClass;

        // Determine the symbol to update in the map array
        const newValue =
          this.selectedTileClass === "dirt-tile"
            ? "d"
            : this.selectedTileClass === "dirtTop-tile"
            ? "dt"
            : this.selectedTileClass === "trunk-tile"
            ? "t"
            : this.selectedTileClass === "leaf-tile"
            ? "l"
            : "s";

        updateTile(i, j, newValue); // Update mapGeneral and localStorage
        StorageManager.updateStorage(this.selectedTileClass, -1); // Remove from storage
      }
    });

    // --- Select a tool ---
    toolsContainer.addEventListener("click", (event) => {
      const toolId = event.target.id;
      if (!ToolManager.toolsKit[toolId]) return; // Ignore invalid clicks
      this.selectedTool = toolId;
      this.selectedTileClass = "";
      this.updateCursor();
      console.log("Selected tool:", this.selectedTool);
    });

    // --- Select a tile from storage ---
    storage.addEventListener("click", (event) => {
      const tileClass = event.target.className;
      if (!StorageManager.storageTiles[tileClass]) return; // Ignore empty clicks
      this.selectedTileClass = tileClass;
      this.selectedTool = "";
      this.updateCursor();
      console.log("Selected tile:", this.selectedTileClass);
    });
  },

  // --- Update cursor dynamically based on selection ---
  updateCursor() {
    document.body.className = ""; // Reset previous cursor

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
  },
};

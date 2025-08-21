import { ToolManager } from "./toolsManager.js";
import { StorageManager } from "./storageManager.js";
import { getTileCoordinates, updateTile, mapGeneral } from "./utils.js";

export const InteractionManager = {
  selectedTool: "",
  selectedTileClass: "",

  setupInteractions(main, toolsContainer, storage) {
    // --- Click on map tiles ---
    main.addEventListener("click", (event) => {
      const target = event.target;
      const tileClass = target.className;
      const { i, j } = getTileCoordinates(target.id);

      // Mining a tile with the selected tool
      const validTiles = ToolManager.toolsKit[this.selectedTool];
      if (validTiles && validTiles.includes(tileClass)) {
        target.className = "sky-tile";
        updateTile(i, j, "s"); // updates mapGeneral and localStorage
        StorageManager.updateStorage(tileClass, +1);
      }
      // Placing a tile from storage
      else if (
        tileClass === "sky-tile" &&
        StorageManager.storageTiles[this.selectedTileClass] > 0
      ) {
        target.className = this.selectedTileClass;

        // Map symbol corresponding to the tile class
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

        updateTile(i, j, newValue);
        StorageManager.updateStorage(this.selectedTileClass, -1);
      }
    });

    // --- Select a tool ---
    toolsContainer.addEventListener("click", (event) => {
      const toolId = event.target.id;
      if (!ToolManager.toolsKit[toolId]) return; // ignore invalid clicks
      this.selectedTool = toolId;
      this.selectedTileClass = "";
      this.updateCursor();
      console.log("Selected tool:", this.selectedTool);
    });

    // --- Select a tile from storage ---
    storage.addEventListener("click", (event) => {
      const tileClass = event.target.className;
      if (!StorageManager.storageTiles[tileClass]) return; // ignore empty clicks
      this.selectedTileClass = tileClass;
      this.selectedTool = "";
      this.updateCursor();
      console.log("Selected tile:", this.selectedTileClass);
    });
  },

  // --- Update cursor dynamically ---
  updateCursor() {
    document.body.className = ""; // reset previous cursor

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

    // Debug logs
    console.log("Cursor updated to:", cursorMap[type] || "cursor-default");
    console.log("Current selection:", type);
  },
};

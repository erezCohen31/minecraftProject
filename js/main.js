import { MapManager } from "./mapManager.js";
import { InteractionManager } from "./interactionManager.js";

const main = document.querySelector("main");
const toolsContainer = document.getElementById("tools");
const storage = document.querySelector(".storege");

// Generate map and render
const map = MapManager.generateMap();
MapManager.renderMap(map, main);

// Setup interactions (click on tiles, select tools, select storage)
InteractionManager.setupInteractions(main, toolsContainer, storage);

# Minecraft 2D

## Technologies Used

- **HTML5** - Website structure and layout
- **CSS3** - Styling and visual design
- **JavaScript ES6+** - Game logic and interactions
- **localStorage API** - Game state persistence

## Game Description

A 2D sandbox game inspired by Minecraft. Players navigate through a grid-based world of tiles, use different tools to collect materials, and build structures.

### How to Play

1. **Navigation** - Use arrow keys to move around the map
2. **Tools** - Click on a tool in the left panel
3. **Mining** - Click on a block that matches the selected tool
4. **Building** - Select a material from inventory and click on an empty tile

### Tools & Materials

| Tool | Compatible Materials |
|------|---------------------|
| Axe | Tree trunk |
| Hoe | Leaves |
| Shovel | Dirt, top dirt |
| Pickaxe | Rock |

## Project Structure

```
minecraft-2d/
├── index.html                 # Home page
├── pages/
│   ├── game.html             # Game page
│   └── description.html      # Instructions page
├── css/
│   ├── index.css            # Home page styles
│   ├── game.css             # Game styles
│   └── description.css      # Instructions styles
├── js/
│   ├── main.js              # Game initialization
│   ├── mapManager.js        # Map generation and rendering
│   ├── toolsManager.js      # Tool definitions
│   ├── interactionManager.js # User interactions
│   ├── storageManager.js    # Inventory system
│   ├── utils.js             # Utility functions
│   └── index.js             # Home page logic
└── assets/
    ├── imges/               # Textures and icons
    └── video/               # Background video
```

## Function Documentation

### `js/utils.js`

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getRandomInt(min, max)` | min: number, max: number | number | Returns random integer in range |
| `getTileCoordinates(tileId)` | tileId: string | {i: number, j: number} | Extracts coordinates from tile ID |
| `loadMap()` | none | array | Loads map from localStorage |
| `saveMap(map)` | map: array | none | Saves map to localStorage |
| `updateTile(i, j, newValue)` | i: number, j: number, newValue: string | none | Updates tile and saves map |

### `js/mapManager.js`

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `generateMap()` | none | array | Generates new 2D map array |
| `generateTrees(map, skyRow)` | map: array, skyRow: number | none | Adds trees to map |
| `buildTree(map, startRow, startCol)` | map: array, startRow: number, startCol: number | number | Builds single tree, returns width |
| `renderMap(matrixMap, main)` | matrixMap: array, main: HTMLElement | none | Renders map to DOM |

### `js/storageManager.js`

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `updateStorage(tileClass, delta)` | tileClass: string, delta: number | none | Updates inventory count and UI |

### `js/toolsManager.js`

| Property | Type | Description |
|----------|------|-------------|
| `toolsKit` | object | Maps tools to compatible block types |

### `js/interactionManager.js`

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `setupInteractions(main, toolsContainer, storage)` | main: HTMLElement, toolsContainer: HTMLElement, storage: HTMLElement | none | Sets up all event listeners |
| `updateCursor()` | none | none | Changes cursor based on selection |

### `js/index.js`

| Event Listener | Target | Description |
|----------------|--------|-------------|
| `continueGameBtn.addEventListener()` | Continue Game button | Checks for saved game and navigates to game page |

### `js/main.js`

**Main initialization script** - No separate functions, contains initialization code that:
1. Loads saved map or generates new one
2. Renders the map
3. Sets up interactions
4. Loads saved inventory
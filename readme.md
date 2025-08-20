# Minecraft 2D - Side-Scrolling Sandbox Adventure

A vibrant 2D sandbox game inspired by Minecraft, featuring a side-scrolling pixel world where creativity meets strategy. Built with vanilla HTML5, CSS3, and JavaScript.

![Game Preview](https://via.placeholder.com/800x400/87CEEB/000000?text=Minecraft+2D+Game)

## 🎮 Game Description

Welcome to a charming 2D sandbox adventure where players explore, mine, and build in a procedurally generated world. Navigate through different terrain layers including sky, dirt, and underground areas using specialized tools designed for each block type.

### Key Features

- **2D Side-Scrolling Gameplay**: Smooth horizontal and vertical navigation through a grid-based world
- **Multiple Block Types**: 
  - Sky blocks (aqua background)
  - Dirt blocks with realistic textures
  - Dirt-top surface layer
  - Tree trunks and leaf blocks
- **Tool-Based Interaction**: Four specialized tools for different block types
- **Responsive Design**: Optimized for desktop and mobile devices
- **Intuitive Controls**: Arrow key navigation with tile-by-tile movement
- **Retro Aesthetic**: Pixel-perfect graphics with authentic Minecraft-inspired visuals

## 🕹️ How to Play

### Navigation
- **Arrow Keys**: Move through the world
  - ⬅️ Left Arrow: Scroll left
  - ➡️ Right Arrow: Scroll right  
  - ⬆️ Up Arrow: Scroll up
  - ⬇️ Down Arrow: Scroll down

### Tools System
The game features four specialized tools, each designed for specific block types:
- **Leaf Tool**: Remove leafy foliage blocks
- **Trunk Tool**: Chop down tree trunks
- **Dirt Tool**: Dig through earth and soil
- **Sky Tool**: Clear sky blocks to open new paths

### Gameplay Strategy
- Switch between tools strategically to navigate obstacles
- Uncover hidden resources by digging through different layers
- Reshape the environment to create paths and structures
- Experiment with block removal to discover new possibilities

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required

### Installation
1. Clone or download the repository
2. Ensure all asset files are in their correct directories:
   ```
   /assets/imges/
   ├── dirt.jpg
   ├── dirtTop.jpg
   ├── trunk.jpg
   └── leaf.jpg
   ```
3. Open `index.html` in your web browser

### File Structure
```
minecraft-2d/
├── index.html              # Main menu page
├── pages/
│   ├── game.html          # Game page
│   └── description.html   # Game instructions
├── css/
│   ├── index.css          # Main menu styles
│   ├── game.css           # Game styles
│   └── description.css    # Description page styles
├── scripts/
│   ├── index.js           # Menu functionality
│   └── script.js          # Game logic
├── assets/
│   └── imges/             # Game textures
└── viduo/
    └── background.mp4     # Background video
```

## 🎯 Technical Details

### Map Generation
- **Grid Size**: 50 columns × 30 rows
- **Tile Size**: 32px × 32px
- **World Layers**: 
  - Sky layer (rows 1-16)
  - Surface layer (row 17)
  - Underground layers (rows 18-30)

### Technologies Used
- **HTML5**: Semantic structure and canvas-free grid system
- **CSS3**: Grid layout, responsive design, and visual effects
- **Vanilla JavaScript**: Game logic, event handling, and DOM manipulation
- **CSS Grid**: Efficient tile-based world rendering

### Performance Features
- Document fragment optimization for smooth map loading
- Efficient tile rendering system
- Smooth scrolling with consistent tile-based movement
- Optimized hover effects and visual feedback

## 🎨 Assets

The game uses carefully crafted texture assets:
- **Dirt Texture**: Realistic soil and earth appearance
- **Dirt-Top Texture**: Grass-covered surface layer
- **Tree Trunk**: Wooden bark texture
- **Leaf Texture**: Foliage and vegetation
- **Background Video**: Atmospheric Minecraft-inspired footage

## 🌍 Supported Languages

- **Hebrew**: Game interface includes Hebrew text for Israeli players
- **English**: Documentation and code comments in English

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🔧 Development

### Adding New Block Types
1. Define new symbol in `script.js`
2. Add corresponding CSS class in `game.css`
3. Include texture asset in `/assets/imges/`
4. Update `tileClasses` object in map loading function

### Customizing Map Generation
Modify the `generateMap()` function in `script.js` to create different world layouts and terrain distributions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:
- New block types and tools
- Performance improvements
- UI/UX enhancements
- Bug fixes

## 📄 License

This project is created for educational purposes. Minecraft is a trademark of Mojang Studios.

## 🎯 Future Enhancements

- [ ] Tool selection UI
- [ ] Block breaking animations
- [ ] Sound effects and background music
- [ ] Save/load game functionality
- [ ] Multiplayer support
- [ ] Mobile touch controls
- [ ] Inventory system

---

**Ready to dig in and craft your own story?** Start your adventure now!
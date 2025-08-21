// ToolManager stores which tiles each tool can interact with
export const ToolManager = {
  toolsKit: {
    shovel: ["dirt-tile", "dirtTop-tile"], // shovel can remove dirt and dirtTop
    axe: ["trunk-tile"], // axe can remove tree trunks
    hoe: ["leaf-tile"], // hoe can remove leaves
    pickaxe: ["rock-tile"], // pickaxe can remove rocks
  },
};

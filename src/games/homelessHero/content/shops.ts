import type { shop } from "../types/shop";
import * as i from "./items";

export const SanjayShop: shop = {
  id: 6000,
  shopName: "Sanjay Station",
  shopInventory: [i.stick, i.sodaPop],
};
  export const stuffleShop: shop = {
    id: 6001,
    shopName: `StuffleStop`,
    shopInventory: [i.heavyBat, i.SteelToeBoots, i.buffaloWing],
  };

  export const proShopStore: shop = {
    id: 6002,
    shopName: "Mission Bluffs Country Club Pro Shop",
    shopInventory: [i.woodenWood],

  }

  export const glizzyShop: shop = {
    id: 6003,
    shopName: "Gator's Glorious Glizzy's",
    shopInventory: [i.glizzy, i.mustard],
  }
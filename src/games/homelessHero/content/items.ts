import type { item } from "../types/item";

export const emptyWeapon = {
  itemName: "N/A",
  attackBonus: 0,
  defenseBonus: 0,
  speedBonus: 0,
  equipped: false
};

export const emptyWearable = {
  itemName: "N/A",
  attackBonus: 0,
  defenseBonus: 0,
  speedBonus: 0,
  equipped: false
};

export let stick: item = {
  id: 3001,
  name: "Stick",
  price: 3,
  equippable: true,
  wearable: false,
  healing: false,
  equippableStats: {
    itemName: "Stick",
    attackBonus: 1,
    defenseBonus: 0,
    speedBonus: 0,
    equipped: false,
  },
};

export let sodaPop: item = {
  id: 3002,
  name: 'Soda Pop',
  price: 6,
  equippable: false,
  wearable: false,
  healing: true,
  healingStats: { amountHealed: 3 },
};
export let shoes: item = {
  id: 3003,
  name: 'Shoes',
  price: 6,
  equippable: false,
  healing: false,
  wearable: true,
  wearableStats: {
    itemName: 'Shoes',
    attackBonus: 0,
    defenseBonus: 1,
    speedBonus: 1,
    equipped: false,
  },
};
export let pimpCane: item = {
  id: 3004,
  name: 'Pimp Cane',
  price: 18,
  equippable: true,
  healing: false,
  wearable: false,
  equippableStats: {
    itemName: 'Pimp Cane',
    attackBonus: 3,
    defenseBonus: 0,
    speedBonus: 0,
    equipped: false,
  },
};

export let ratTail: item = {
  id: 3005,
  name: 'Rat Tail',
  price: 3,
  equippable: false,
  healing: false,
  wearable: false,
};
export let partyHat: item = {
  id: 3006,
  name: 'Party Hat',
  price: 165,
  equippable: false,
  healing: false,
  wearable: true,
  wearableStats: {
    itemName: 'Party Hat',
    attackBonus: 0,
    defenseBonus: 3,
    speedBonus: 1,
    equipped: false,
  },
};

export let mobSuitcases: item = {
  id: 3007,
  name: `Mob Suitcase`,
  price: 15,
  equippable: false,
  healing: false,
  wearable: false,
};
export let boatKey: item = {
  id: 3008,
  name: `Boat Key`,
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
};

export let mallet: item = {
  id: 3009,
  name: 'Rubber Mallet',
  price: 27,
  equippable: true,
  healing: false,
  wearable: false,
  equippableStats: {
    itemName: 'Rubber Mallet',
    attackBonus: 5,
    defenseBonus: 0,
    speedBonus: 1,
    equipped: false,
  },
};

export let wdSteak: item = {
  id: 3010,
  name: 'Well-Done Steak',
  price: 12,
  equippable: false,
  wearable: false,
  healing: true,
  healingStats: { amountHealed: 5 },
};

export let mrSteak: item = {
  id: 3011,
  name: 'Medium-Rare Steak',
  price: 21,
  equippable: false,
  wearable: false,
  healing: true,
  healingStats: { amountHealed: 8 },
};

export let merFlesh: item = {
  id: 3012,
  name: `Mer-Flesh`,
  price: 3,
  equippable: false,
  wearable: false,
  healing: true,
  healingStats: { amountHealed: 12 },
};
export let merFlippers: item = {
  id: 3013,
  name: 'Mer-Flippers',
  price: 25,
  equippable: false,
  healing: false,
  wearable: true,
  wearableStats: {
    itemName: 'Mer-Flippers',
    attackBonus: 0,
    defenseBonus: 2,
    speedBonus: 5,
    equipped: false,
  },
};

export let lighthouseKey: item = {
  id: 3014,
  name: `Lighthouse Key`,
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
};

export let WyvernTail: item = {
  id: 3015,
  name: `Wyvern Tail`,
  price: 90,
  equippable: false,
  healing: false,
  wearable: false,
};

export let Spear: item = {
  id: 3016,
  name: `Blunt Spear`,
  price: 32,
  equippable: true,
  healing: false,
  wearable: false,
  equippableStats: {
    itemName: 'Blunt Spear',
    attackBonus: 6,
    defenseBonus: 0,
    speedBonus: 2,
    equipped: false,
  },
};

export let heavyBat: item = {
  id: 3017,
  name: 'Heavy Bat',
  price: 100,
  equippable: true,
  healing: false,
  wearable: false,
  equippableStats: {
    itemName: 'Heavy Bat',
    attackBonus: 12,
    defenseBonus: -2,
    speedBonus: -2,
    equipped: false,
  },
};

export let SteelToeBoots: item = {
  id: 3018,
  name: `Steel Toe Boots`,
  price: 75,
  equippable: false,
  healing: false,
  wearable: true,
  wearableStats: {
    itemName: 'Steel Toe Boots',
    attackBonus: 0,
    defenseBonus: 9,
    speedBonus: -2,
    equipped: false,
  },
};

export let buffaloWing: item = {
  id: 3019,
  name: `Buffalo Wings`,
  price: 20,
  equippable: false,
  wearable: false,
  healing: true,
  healingStats: { amountHealed: 13 },
};

export let pokerChip: item = {
  id: 3020,
  name: `Poker Chip`,
  price: 30,
  equippable: false,
  healing: false,
  wearable: false,
};

export let purpleDong: item = {
  id: 3021,
  name: `Purple Dong`,
  price: 75,
  equippable: false,
  healing: false,
  wearable: true,
  wearableStats: {
    itemName: 'PurpleDong',
    attackBonus: -2,
    defenseBonus: 5,
    speedBonus: 5,
    equipped: false,
  },
};

export let casinoKey: item = {
  id: 3022,
  name: `Casino Key`,
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
};

export let mbKeyCard: item = {
  id: 3023,
  name: `Key Card`,
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
};

export let resignationL: item = {
  id: 3024,
  name: `Letter of Resignation`,
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
};

export let passCode: item = {
  id: 3026,
  name: `Pass Code`,
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
};

export let mobIdBadge: item = {
  id: 3027,
  name: `Mob ID badge`,
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
};

export let woodenWood: item = {
  id: 3028,
  name: 'Wooden 3Wood',
  price: 100,
  equippable: true,
  healing: false,
  wearable: false,
  equippableStats: {
    itemName: 'Wooden 3Wood',
    attackBonus: 9,
    defenseBonus: 0,
    speedBonus: 0,
    equipped: false,
  },
};

export let creekPass: item = {
  id: 3029,
  name: `Creek Pass`,
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
};

export let roofies: item = {
  id: 3030,
  name: `Roofies`,
  price: 15,
  equippable: false,
  healing: true,
  healingStats: { amountHealed: -4 },
  wearable: false,
};

export let betaDocument: item = {
  id: 3031,
  name: 'Beta document',
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
}


export let bigBertha: item = {
  id: 3032,
  name: 'Big Bertha Driver',
  price: 150,
  equippable: true,
  healing: false,
  wearable: false,
  equippableStats: {
    itemName: 'Big Bertha Driver',
    attackBonus: 13,
    defenseBonus: 0,
    speedBonus: 0,
    equipped: false,
  },
};


export let fratKey: item = {
  id: 3033,
  name: "Fraternity Key",
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
}
export let pizza: item = {
  id: 3034,
  name: `Greasy Slice`,
  price: 30,
  equippable: false,
  healing: true,
  healingStats: { amountHealed: 17 },
  wearable: false,
};
export let brew: item = {
  id: 3035,
  name: 'Brewski',
  price: 25,
  equippable: false,
  healing: true,
  healingStats: { amountHealed: 15 },
  wearable: false,
}


export let chineseChicken: item = {
  id: 3036,
  name: 'Chinese Chicken',
  price: 27,
  equippable: false,
  healing: true,
  healingStats: { amountHealed: 16 },
  wearable: false,
}

export let busPass: item = {
  id: 3037,
  name: 'Bus Pass',
  price: 0,
  equippable: false,
  healing: false,
  wearable: false,
}

export let trenchCoat: item = {
  id: 3038,
  name: 'Trench Coat',
  price: 125,
  equippable: false,
  healing: false,
  wearable: true,
  wearableStats: {
    itemName: 'Trench Coat',
    attackBonus: 0,
    defenseBonus: 10,
    speedBonus: 3,
    equipped: false,
  },
};

export let ramen: item = {
  id: 3039,
  name: 'Ramen Newdles',
  price: 45,
  equippable: false,
  healing: true,
  healingStats: { amountHealed: 18 },
  wearable: false,
}

export let glizzy: item ={
id: 3040,
name : 'Glizzy',
price: 50,
equippable: false,
healing: true,
healingStats: { amountHealed: 20},
wearable: false,
}

export let mustard: item={
id: 3041,
name: 'MUSTAAAARD',
price: 40,
equippable: false,
healing: true,
healingStats:{amountHealed:2},
wearable: false,
}

export let pimpChain:item={
id: 3042,
name: 'Pimp Chain',
price: 5,
equippable: false,
wearable: false,
healing: false,
}

export let gangstaHat:item={
id:3043,
name: 'Gangssta Hat',
price: 85,
equippable: false,
wearable: true,
healing: false,
  wearableStats: {
    itemName: 'Gangsta Hat',
    attackBonus: 0,
    defenseBonus: 8,
    speedBonus: 1,
    equipped: false,
  },




}


export const allItems: item[] = [
  stick,
  sodaPop,
  shoes,
  pimpCane,
  ratTail,
  partyHat,
  mobSuitcases,
  boatKey,
  mallet,
  wdSteak,
  mrSteak,
  merFlesh,
  merFlippers,
  lighthouseKey,
  WyvernTail,
  Spear,
  heavyBat,
  SteelToeBoots,
  buffaloWing,
  pokerChip,
  purpleDong,
  casinoKey,
  mbKeyCard,
  resignationL,
  passCode,
  mobIdBadge,
  woodenWood,
  creekPass,
  roofies,
  betaDocument,
  bigBertha,
  fratKey,
  brew,
  pizza,
  chineseChicken,
  busPass,
  trenchCoat,
  ramen,
  glizzy,
  mustard,
  gangstaHat,
];

export const itemMap: Record<number, item> =
  Object.fromEntries(allItems.map(i => [i.id, i]));
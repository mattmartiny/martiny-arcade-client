import type { Location } from "../types/locations";
import * as i from "./items"
import * as s from "./shops"
export const home: Location = {
  id: 1001,
  name: "Alley way",
  description: "Where you woke up.",
  imgPath: "allyWay",
  hasEnemy: false,
  enemyNumber: 0,

  NPC: false,

  hasEntered: true,
  itemRequired: false,

  dungeonHere: false,

  shop: false,
};

export const park: Location = {
  id: 1002,
  name: "Taco Park",
  description: "A park with a rundown playground.",
  imgPath: "tacoPark",

  hasEnemy: true,
  enemyNumber: 15,

  NPC: false,
  hasEntered: false,
  itemRequired: false,

  dungeonHere: false,
  shop: false,
};

export const neighbors: Location = {
  id: 1003,
  name: 'Condos',
  description: 'Condos next to the ally way.',
  imgPath: 'condos',
  hasEnemy: true,
  enemyNumber: 5,
  NPC: false,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: true,
  shop: false,
};

export const gasStation: Location = {
  id: 1004,
  name: 'Gas Station',
  description: 'Fill up.',
  imgPath: 'sanjayStation',
  hasEnemy: false,
  enemyNumber: 0,
  hasEntered: false,
  NPC: true,
  itemRequired: false,
  dungeonHere: false,
  shop: true,
  shopHere: s.SanjayShop,
};

export const hussieHouse: Location = {
  id: 1005,
  name: 'Hussie House',
  description: 'For a good time...',
  imgPath: 'hussieHouse',
  hasEnemy: true,
  enemyNumber: 3,
  NPC: false,
  itemRequired: true,
  hasEntered: false,
  itemThatsRequired: { details: i.ratTail, quantity: 1 },
  shop: false,
  dungeonHere: false,
};

export const womensShelter: Location = {
  id: 1006,
  name: `Women's Shelter`,
  description: 'Home for battered women.',
  imgPath: 'womensShelter',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: true,
  itemRequired: false,
  hasEntered: false,
  dungeonHere: false,
  shop: false,
};

export const upperDocks: Location = {
  id: 1007,
  name: 'Upper Docks',
  description: 'fog and fog horns',
  imgPath: 'upperDocks',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: true,
  itemRequired: false,
  hasEntered: false,
  dungeonHere: false,
  shop: false,
};

export const lowerDocks: Location = {
  id: 1008,
  name: 'Lower Docks',
  description: 'Eeriness by the water',
  imgPath: 'lowerDocks',
  hasEnemy: true,
  enemyNumber: 8,
  NPC: false,
  itemRequired: false,
  hasEntered: false,
  dungeonHere: false,
  shop: false,
};

export const boat: Location = {
  id: 1009,
  name: 'Boat',
  description: `I'm on a boat MF, don't you ever forget`,
  imgPath: 'boat',
  hasEnemy: false,
  enemyNumber: 0,
  itemRequired: true,
  NPC: true,
  itemThatsRequired: { details: i.boatKey, quantity: 1 },
  hasEntered: false,
  dungeonHere: false,
  shop: false,
};

export const river: Location = {
  id: 1010,
  name: 'River',
  description: `There is a van down by it.`,
  imgPath: 'river',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  itemRequired: false,
  hasEntered: false,
  dungeonHere: false,
  shop: false,
};

export const riverBank: Location = {
  id: 1011,
  name: 'River Bank',
  description: `Park your boat here`,
  imgPath: 'riverbank',
  hasEnemy: true,
  NPC: false,
  enemyNumber: 4,
  itemRequired: false,
  hasEntered: false,
  dungeonHere: false,
  shop: false,
};

export const beach: Location = {
  id: 1012,
  name: 'Beach',
  description: `Sandy.`,
  imgPath: 'beach',
  hasEnemy: false,
  NPC: true,
  enemyNumber: 4,
  itemRequired: false,
  hasEntered: false,
  dungeonHere: false,
  shop: false,
};

export const lighthouse: Location = {
  id: 1013,
  name: 'Lighthouse',
  description: 'Helps ships avoid crashing.',
  imgPath: 'lighthouse',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: true,
  shop: false,
};

export const coralOutcrop: Location = {
  id: 1014,
  name: 'Coral Outcrop',
  description: 'A random outcrop of coral.',
  imgPath: 'coralOutcrop',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: true,
  shop: false,
};

export const rockyOutcrop: Location = {
  id: 1015,
  name: 'Rocky Outcrop',
  description: 'A rocky area with a cave.',
  imgPath: 'rockyOutcrop',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: true,
  shop: false,
};

export const skeeterForest1: Location = {
  id: 1016,
  name: 'Skeeter Ntl Forest',
  description: `Lots o' trees.`,
  imgPath: 'forest',
  hasEnemy: true,
  enemyNumber: 2,
  NPC: false,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: true,
  shop: false,
};
export const skeeterForest2: Location = {
  id: 1017,
  name: 'Skeeter Ntl Forest',
  description: `Lots o' trees.`,
  imgPath: 'forest',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
};

export const skeeterCampSite: Location = {
  id: 1018,
  name: 'Skeeter Campsite',
  description: 'Mosquitos and grossness',
  imgPath: 'campsite',
  hasEnemy: true,
  NPC: false,
  enemyNumber: 3,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
};
export const skeeterForest3: Location = {
  id: 1019,
  name: 'Skeeter Ntl Forest',
  description: `Lots o' trees.`,
  imgPath: 'forest',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
};

export const forestLot: Location = {
  id: 1020,
  name: 'Forest Parking Lot',
  description: `Semi's for days.`,
  imgPath: 'forestLot',
  hasEnemy: true,
  NPC: true,
  enemyNumber: 6,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
};

export const stuffleStop: Location = {
  id: 1021,
  name: 'StuffleStop Shop',
  description: 'The owner is tubby and bald',
  imgPath: 'stuffleShop',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: true,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: false,
  shop: true,
  shopHere: s.stuffleShop,
};
export const casinoGate: Location = {
  id: 1022,
  name: 'Casino Entrance',
  description: 'Entance to Pettey Palace Casino',
  imgPath: 'casinoGate',
  enemyNumber: 0,
  NPC: true,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
};

export const petteyPalace: Location = {
  id: 1023,
  name: 'Pettey Palace Casino',
  description: 'Degen your cash away',
  imgPath: 'petteyPalace',
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  NPC: false,
  itemRequired: true,
  itemThatsRequired: { details: i.casinoKey, quantity: 1 },
  dungeonHere: false,
  shop: false,
  ///add casino games.  (random number generator stuff)
};

export const showStage: Location = {
  id: 1024,
  name: 'Show Stage',
  description: 'A bunch of half-naked dudes are dancing...',
  imgPath: 'showStage',
  enemyNumber: 3,
  hasEnemy: true,
  NPC: false,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
};

export const petteyPalace2: Location = {
  id: 1025,
  name: 'Pettey Palace Casino',
  description: 'Degen your cash away',
  imgPath: 'petteyPalace',
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  NPC: true,
  itemRequired: false,
  dungeonHere: true,
  shop: false,
  ///add casino games.  (random number generator stuff)
};

export const lighthouse2: Location = {
  id: 1026,
  name: 'Lighthouse',
  description: 'Helps ships avoid crashing.',
  imgPath: 'lighthouse',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  hasEntered: false,
  itemRequired: false,
  dungeonHere: true,
  shop: false,
};

export const mBGate: Location = {
  id: 1027,
  name: 'Mission Bluffs Gate',
  description: 'Entrance to the gated community',
  imgPath: 'mbGate',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  itemRequired: true,
  itemThatsRequired: { details: i.mbKeyCard, quantity: 1 },
  dungeonHere: false,
  shop: false,
  hasEntered: false,
};

export const mBFountain: Location = {
  id: 1028,
  name: 'Mission Bluffs Fountain',
  description: 'A prestine Fountain',
  imgPath: 'mbFountain',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: true,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
  hasEntered: false,
};

export const countryClub: Location = {
  id: 1029,
  name: 'Mission Bluffs Country Club',
  description: 'Only for the exclusive',
  imgPath: 'countryClub',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
  hasEntered: false,
};

export const proShop: Location = {
  id: 1030,
  name: 'Pro Shop',
  description: 'Golf Stuff',
  imgPath: 'proShop',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: true,
  itemRequired: false,
  dungeonHere: false,
  shop: true,
  hasEntered: false,
  shopHere: s.proShopStore
};

export const golfCourse: Location = {
  id: 1031,
  name: 'Golf Course',
  description: 'FORE!',
  imgPath: 'golfCourse',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
  hasEntered: false,
};
export const pool: Location = {
  id: 1032,
  name: 'Club Swimming Pool',
  description: 'Better not skinny dip.',
  imgPath: 'pool',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: false,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
  hasEntered: false,
};

export const broBar: Location = {
  id: 1033,
  name: "Da Bro Bar",
  description: "Douchery Abounds",
  imgPath: 'yachtClub',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: true,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
  hasEntered: false,
}

export const fratHouse: Location = {
  id: 1034,
  name: "Fancy Frat House",
  description: "Toga party... classy.",
  imgPath: 'fancyVilla',
  hasEnemy: true, //chad
  enemyNumber: 1,
  NPC: false,
  itemRequired: true,
  itemThatsRequired: { details: i.roofies, quantity: 1 },
  dungeonHere: true,
  shop: false,
  hasEntered: false,
}

export const calfCreek: Location = {
  id: 1035,
  name: "Lil Calf Creek",
  description: "is that a cow furry?!",
  imgPath: 'littleCalfCreek',
  hasEnemy: false,
  enemyNumber: 0,
  NPC: true,
  itemRequired: true,
  itemThatsRequired: { details: i.creekPass, quantity: 1 },
  dungeonHere: false,
  shop: false,
  hasEntered: false,
}

export const freightYard: Location = {
  id: 1036,
  name: "Freight-yard",
  description: "So many stray cats...",
  imgPath: 'freightYard',
  hasEnemy: true, //cat
  enemyNumber: 1,
  NPC: true,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
  hasEntered: false,
}



export const hoboVillage: Location = {
  id: 1037,
  name: "Hobo Village",
  description: "Do I belong here?",
  imgPath: 'hoboVillage',
  hasEnemy: true, // hobo
  enemyNumber: 1,
  NPC: true,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
  hasEntered: false,
}

export const shadyStreet: Location = {
  id: 1038,
  name: "Shady Street",
  description: "This is sketch...",
  imgPath: 'shadyStreet',
  hasEnemy: true, //drifter
  enemyNumber: 1,
  NPC: false,
  itemRequired: false,
  dungeonHere: false,
  hasEntered: false,
  shop: false,
}

export const warehouse: Location = {
  id: 1039,
  name: "Abandoned Warehouse",
  description: "uhhh... this is weird",
  imgPath: 'abandonedWarehouse',
  hasEnemy: false,
  NPC: false,
  enemyNumber: 0,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
  hasEntered: false,
}

export const factory: Location = {
  id: 1040,
  name: "Abandoned Factory",
  description: "What a creepy factory",
  imgPath: "abandonedFactory",
  hasEnemy: false,
  NPC: true,
  enemyNumber: 0,
  itemRequired: false,
  dungeonHere: false,
  shop: false,
  hasEntered: false,
}


export const busStation: Location = {
  id: 1041,
  name: "Bus Station",
  description: "It's bussin'",
  imgPath: "busStation",
  hasEnemy: false,
  NPC:false,
  enemyNumber: 0,
  itemRequired: true,
  itemThatsRequired: {details: i.busPass, quantity: 1,},
  dungeonHere: false,
  shop: false,
  hasEntered: false,
}



export const Locs: Location[] = [
  home,
  park,
  neighbors,
  gasStation,
  hussieHouse,
  womensShelter,
  upperDocks,
  lowerDocks,
  boat,
  river,
  riverBank,
  beach,
  lighthouse,
  coralOutcrop,
  rockyOutcrop,
  skeeterForest1,
  skeeterForest2,
  skeeterCampSite,
  skeeterForest3,
  forestLot,
  stuffleStop,
  casinoGate,
  petteyPalace,
  showStage,
  petteyPalace2,
  lighthouse2,
  mBGate,
  mBFountain,
  countryClub,
  proShop,
  golfCourse,
  pool,
  broBar,
  fratHouse,
  calfCreek,
  freightYard,
  hoboVillage,
  shadyStreet,
  warehouse,
  factory,
  busStation,
];
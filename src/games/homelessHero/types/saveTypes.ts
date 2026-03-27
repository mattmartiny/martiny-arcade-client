export type GameSave = {

  version: number
player:{
  stats: any
  baseStats:any
}


  inventory: any[]
  quests: any[]


equipment:{
  weaponItemId: number
  wearableItemId: number
}
  location: {
    locationId: number
    dungeonRoomId?: string
  }


}

export type SaveGameDTO = {
  version: number;

  player: {
    stats: {
      gold: number;
      currentHp: number;
      maxHp: number;
      experiencePoints: number;
      level: number;
      deathCount: number;
    };

    baseStats: {
      baseAttack: number;
      baseDefense: number;
      baseSpeed: number;
      baseMaxHp: number;
    };
  };

  inventory: {
    items: {
      itemId: number;
      quantity: number;
    }[];
  };

  equipment: {
    weaponItemId?: number
    wearableItemId?: number;
  };

  quests: {
    questId: number,
    completed: boolean;
  }[];

  location: {
    locationId: number;
    dungeonRoomId?: string;
  };
};
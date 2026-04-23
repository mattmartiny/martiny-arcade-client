import { dataFor } from "../content/data";
import type { SaveGameDTO } from "../types/saveTypes";
import type { player } from "../types/player";
import type { Location, dungeonRoom } from "../types/locations";

type GameState = {
  player: player;
  currentLocation: Location;
  currentDungeonRoom?: dungeonRoom;
};

export function buildSave(state: GameState): SaveGameDTO {
  const { player, currentLocation, currentDungeonRoom } = state;

  return {
    version: 1,

    player: {
      stats: {
        gold: player.stats.gold,
        currentHp: player.stats.currentHp,
        maxHp: player.stats.MaxHp,
        experiencePoints: player.stats.experiencePoints,
        level: player.stats.level,
        deathCount: player.stats.deathCount,
      },
      baseStats: {
        baseAttack: player.stats.baseAttack,
        baseDefense: player.stats.baseDefense,
        baseSpeed: player.stats.baseSpeed,
        baseMaxHp: player.stats.baseMaxHp,
      },
    },

    inventory: {
      items: player.inventory.map(i => ({
        itemId: i.details.id,
        quantity: i.quantity,
      })),


      
    },

    equipment: {
      weaponItemId: player.weaponItemId,
      wearableItemId: player.wearableItemId,
    },

    quests: player.questList.map(q => ({
      questId: q.id,
      completed: q.isComplete,
    })),

    location: {
      locationId: currentLocation.id,
      dungeonRoomId: currentDungeonRoom?.roomID,
    },
  };
}

export function loadFromSave(dto: SaveGameDTO): player {
  return {
    currentLocation: dataFor.Locs[dto.location.locationId],

    stats: {
      ...dto.player.baseStats,

      gold: dto.player.stats.gold,
      currentHp: dto.player.stats.currentHp,
      MaxHp: dto.player.stats.maxHp,
      experiencePoints: dto.player.stats.experiencePoints,
      level: dto.player.stats.level,
      deathCount: dto.player.stats.deathCount,

      attack: 0,
      defense: 0,
      speed: 0,
    },

    inventory: dto.inventory.items.map(i => ({
      details: dataFor.getItem(i.itemId),
      quantity: i.quantity,
    })),



    weaponItemId: dto.equipment?.weaponItemId,
    wearableItemId: dto.equipment?.wearableItemId,

    questList: dto.quests.map(q => ({
      ...dataFor.getQuest(q.questId),
      isComplete: q.completed,
    })),
  };
}
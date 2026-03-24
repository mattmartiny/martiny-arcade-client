import type { equippableItem, inventoryItem } from "./item";
import type { QuestProgress } from "./quest";
import type { Location } from "./locations";
import type { NPC } from "./NPC";

export interface player {
  currentLocation: Location;

  stats: {

    baseAttack: number
    baseDefense: number
    baseSpeed: number
    baseMaxHp: number

    gold: number;
    currentHp: number;
    MaxHp: number;
    defense: number;
    attack: number;
    speed: number;
    experiencePoints: number;
    level: number;
    deathCount: number;
  };

  inventory: inventoryItem[];


  weaponItemId?: number;
  wearableItemId?: number;


  weapon?: equippableItem;
  wearable?: equippableItem;

  questList: QuestProgress[];
}

export interface dialogReplies {
  NPCDetails: NPC;
  playerResponse1: string;
  playerResponse2?: string;
  playerResponse3?: string;
  playerEndChatResponse: string;
}

export interface completeDialog {
  NPCDetails: NPC;
  dialog: dialogReplies;
}
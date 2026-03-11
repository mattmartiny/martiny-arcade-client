import type { player } from "../types/player";
import { home } from "./locations";

export const Player: player = {
  currentLocation: home,
  stats: {
    gold: 0,
    currentHp: 9,
    MaxHp: 9,
    defense: 1,
    attack: 1,
    speed: 1,
    experiencePoints: 66,
    level: 1,
    deathCount: 0,
  },
  inventory: [],
  questList: [],
  weapon: { itemName: "N/A", attackBonus: 0, defenseBonus: 0, speedBonus: 0, equipped: false },
  wearable: { itemName: "N/A", attackBonus: 0, defenseBonus: 0, speedBonus: 0, equipped: false },
};
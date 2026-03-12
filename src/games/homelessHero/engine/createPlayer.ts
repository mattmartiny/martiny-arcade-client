import type { player } from "../types/player"
import { levelFromXP } from "./combat"

export function createPlayer(): player {

  const initialXP = 66
  const level = levelFromXP(initialXP)

  return {
    currentLocation: null as any,

    stats: {
      gold: 0,
      currentHp: 9,
      MaxHp: Math.round(level * 3.15),
      defense: Math.round(level * 1.18),
      attack: Math.round(level * 1.16),
      speed: Math.round(level * 1.17),
      experiencePoints: initialXP,
      level,
      deathCount: 0,
      baseAttack: Math.round(level * 1.16),
      baseDefense: Math.round(level * 1.18),
      baseSpeed:  Math.round(level * 1.17),
      baseMaxHp: Math.round(level * 3.15),
    },

    inventory: [],
    questList: []
  }
}
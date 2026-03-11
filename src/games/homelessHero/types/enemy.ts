import type { lootItem } from "./item"

export interface EnemyTemplate {

  id: number
  name: string
  description: string
  imgPath: string

  fluctuating?: boolean

  maxHp: number
  attack: number
  defense: number
  speed: number

  rewardGold: number
  rewardXP: number

  lootTable?: lootItem[]

}

export type EnemyInstance = EnemyTemplate & {
  // instance-only
  currentHp: number;
};
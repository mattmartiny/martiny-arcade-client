import type { EnemyTemplate } from "../types/enemy"
import type { player } from "../types/player"
import { rollLoot } from "./loot"

export function handleEnemyDeath(
  enemy: EnemyTemplate,
  player: player
) {

  const loot = rollLoot(enemy.lootTable)

  const updatedPlayer: player = {
    ...player,
    stats: {
      ...player.stats,
      gold: player.stats.gold + enemy.rewardGold,
      experiencePoints:
        player.stats.experiencePoints + enemy.rewardXP
    }
  }

  return {
    player: updatedPlayer,
    loot
  }
}
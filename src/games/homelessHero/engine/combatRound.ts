import { calcDamage } from "./combat"
import { rollLoot } from "./loot"

export function resolveCombatRound(player:any, enemy:any){

  const log: string[] = []

  // ----- PLAYER ATTACK -----

  const playerDamage =
    calcDamage(player.stats.attack, enemy.defense)

    
  enemy.currentHp =
    Math.max(0, enemy.currentHp - playerDamage)

  log.push(
    `<span style="color:green">You hit ${enemy.name} for ${playerDamage}</span>`
  )

  if(enemy.currentHp <= 0){

    log.push(
      `<span style="color:aqua">You defeated ${enemy.name}</span>`
    )

    const rewardXP = enemy.rewardXP ?? 0
    const rewardGold = enemy.rewardGold ?? 0

    player.stats.experiencePoints += rewardXP
    player.stats.gold += rewardGold

    log.push(`+${rewardXP} XP`)
    log.push(`+${rewardGold} gold`)

    const loot = rollLoot(enemy.lootTable)

    if(loot){

      log.push(`You found ${loot.details.name}`)

      return {
        enemyDead: true,
        loot,
        player,
        enemy,
        log
      }
    }

    return {
      enemyDead: true,
      player,
      enemy,
      log
    }
  }

  // ----- ENEMY ATTACK -----

  const enemyDamage =
    calcDamage(enemy.attack, player.stats.defense)

  player.stats.currentHp =
    Math.max(0, player.stats.currentHp - enemyDamage)

  log.push(
    `<span style="color:red">${enemy.name} hits you for ${enemyDamage}</span>`
  )

  if(player.stats.currentHp <= 0){

    log.push(`<span style="color:red">You died</span>`)

    return {
      playerDead:true,
      player,
      enemy,
      log
    }
  }

  return {
    player,
    enemy,
    log
  }
}
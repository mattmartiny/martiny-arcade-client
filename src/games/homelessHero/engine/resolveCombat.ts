import * as combat from "./combat"
import { rollLoot } from "./loot"
import { spawnEnemy } from "./enemySpawn"

export function resolvePlayerAttack(state:any){

  const result =
    combat.playerAttack(
      state.player,
      state.activeEnemy
    )

  const enemy = result.enemy

  // enemy survived
  if(enemy.currentHp > 0){

    return {
      ...state,
      activeEnemy: enemy, // no spread needed
      fightMessage:
        state.fightMessage +
        `<br/>You hit for ${result.damage}`
    }

  }

  // enemy died
  const player = { ...state.player }

  player.stats.gold += enemy.rewardGold
  player.stats.experiencePoints += enemy.rewardXP

  const loot = rollLoot(enemy.lootTable)

  if(loot){

    const existing =
      player.inventory.find(
        (i:any)=>i.details.id===loot.details.id
      )

    if(existing)
      existing.quantity++
    else
      player.inventory.push(loot)

  }

  // spawn fresh enemy instance
  const template =
    state.currentDungeonRoom?.EnemyHere?.[0] ??
    state.currentLocation?.EnemyHere?.[0]

  const newEnemy =
    template ? spawnEnemy(template, player) : null
console.log("SPAWNED ENEMY", newEnemy)
  return {

    ...state,

    player,

    fightOpen:false,

    // important: completely new object
    activeEnemy: newEnemy,

    fightMessage:"", // clear old combat log

    battleMessage:
      state.battleMessage +
      `<br>You defeated ${enemy.name}` +
      `<br>+${enemy.rewardXP} XP` +
      `<br>+${enemy.rewardGold} gold` +
      (loot ? `<br>You found ${loot.details.name}!` : "")

  }

}
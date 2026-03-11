import type { player } from "../types/player"
import type { EnemyInstance } from "../types/enemy"
export function randomDamage(min: number, max: number) {

  return Math.floor(
    Math.random() * (max - min + 1) + min
  )
}

export function playerAttack(player: player, enemy: EnemyInstance) {

  const damage =
    Math.max(1, player.stats.attack - enemy.defense)

  const newEnemy = {
    ...enemy,
    currentHp: Math.max(0, enemy.currentHp - damage)
  }

  return {
    enemy: newEnemy,
    damage
  }
}

export function enemyAttack(player: player, enemy: EnemyInstance) {

  const attack = randomInt(enemy.attack - 2, enemy.attack + 2)
  const defense = randomInt(0, player.stats.defense)

  const damage = Math.max(0, attack - defense)

  player.stats.currentHp = Math.max(0, player.stats.currentHp - damage)

  return {
    damage,
    playerDead: player.stats.currentHp === 0
  }
}


export function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function calcDamage(att: number, def: number) {
  const myDamage = randomInt(att - 3, att + 1);
  const oppDef = randomInt(Math.max(0, def - 5), def);
  return Math.max(0, Math.floor(myDamage - oppDef));
}

export function levelFromXP(expPoints: number) {
  // matches your angular formula
  return Math.floor(0.5 + Math.sqrt(1 + (8 * expPoints) / 50 / 2));
}
import type { EnemyTemplate, EnemyInstance } from "../types/enemy"
import type { player } from "../types/player";


export function spawnEnemy(
  template: EnemyTemplate,
  player: player
): EnemyInstance {

  const baseMaxHp = template.maxHp ?? 1
  const baseAttack = template.attack ?? 0
  const baseDefense = template.defense ?? 0
  const baseSpeed = template.speed ?? 0

  let maxHp = baseMaxHp
  let attack = baseAttack
  let defense = baseDefense
  let speed = baseSpeed

  if (template.fluctuating) {

    const stats = player.stats

    maxHp = (stats.baseMaxHp ?? stats.MaxHp ?? 1) + baseMaxHp
    attack = (stats.baseAttack ?? stats.attack ?? 0) + baseAttack
    defense = (stats.baseDefense ?? stats.defense ?? 0) + baseDefense
    speed = (stats.baseSpeed ?? stats.speed ?? 0) + baseSpeed

  }

  maxHp = Math.max(1, maxHp)

  return {
    id: template.id,
    name: template.name,
    description: template.description,
    imgPath: template.imgPath,
    fluctuating: template.fluctuating ?? false,

    maxHp,
    currentHp: maxHp,

    attack,
    defense,
    speed,

    rewardXP: template.rewardXP ?? 0,
    rewardGold: template.rewardGold ?? 0,

    lootTable: template.lootTable
      ? template.lootTable.map(x => ({ ...x }))
      : undefined
  }
}
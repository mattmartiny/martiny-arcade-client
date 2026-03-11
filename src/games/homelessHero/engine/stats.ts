import type { player } from "../types/player"

export function recalcStats(p: player): player {

  const base = p.stats

  let attack = base.baseAttack ?? 0
  let defense = base.baseDefense ?? 0
  let speed = base.baseSpeed ?? 0
  let MaxHp = base.baseMaxHp ?? 1

  // weapon bonuses
  if (p.weapon?.attackBonus)
    attack += p.weapon.attackBonus ?? 0 

  if (p.weapon?.defenseBonus)
    defense += p.weapon.defenseBonus ?? 0 

  if (p.weapon?.speedBonus)
    speed += p.weapon.speedBonus ?? 0 


  // wearable bonuses
  if (p.wearable?.attackBonus)
    attack += p.wearable.attackBonus ?? 0 

  if (p.wearable?.defenseBonus)
    defense += p.wearable.defenseBonus ?? 0 

  if (p.wearable?.speedBonus)
    speed += p.wearable.speedBonus ?? 0 


  // HP cap protection
  const currentHp = Math.min(p.stats.currentHp, MaxHp)

  return {
    ...p,
    stats: {
      ...base,
      attack,
      defense,
      speed,
      MaxHp,
      currentHp
    }
  }
}
import type { player } from "../types/player"
import * as dataFor from "../content/data"

export function recalcStats(p: player): player {

  const base = p.stats

  let attack = base.baseAttack ?? 0
  let defense = base.baseDefense ?? 0
  let speed = base.baseSpeed ?? 0
  let MaxHp = base.baseMaxHp ?? 1

  // ✅ GET EQUIPPED ITEMS FROM IDs
  const weapon = p.weaponItemId
    ? dataFor.getItem(p.weaponItemId)
    : undefined

  const wearable = p.wearableItemId
    ? dataFor.getItem(p.wearableItemId)
    : undefined

  // --- weapon bonuses ---
  if (weapon?.equippableStats?.attackBonus)
    attack += weapon?.equippableStats.attackBonus

  if (weapon?.equippableStats?.defenseBonus)
    defense += weapon.equippableStats.defenseBonus

  if (weapon?.equippableStats?.speedBonus)
    speed += weapon.equippableStats.speedBonus

  // --- wearable bonuses ---
  if (wearable?.wearableStats?.attackBonus)
    attack += wearable.wearableStats.attackBonus

  if (wearable?.wearableStats?.defenseBonus)
    defense += wearable.wearableStats.defenseBonus

  if (wearable?.wearableStats?.speedBonus)
    speed += wearable.wearableStats.speedBonus

  // --- HP cap ---
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
import type { inventoryItem, lootItem } from "../types/item"

export function rollLoot(
  table?: lootItem[]
): inventoryItem | null {

  if (!table || table.length === 0) return null

  let randomNumber = Math.floor(Math.random() * 1000)

  for (const loot of table) {

    if (randomNumber <= loot.chance) {
      return {
        details: loot.details,
        quantity: 1
      }
    }

    randomNumber -= loot.chance
  }

  // roll missed all chances
  return null
}
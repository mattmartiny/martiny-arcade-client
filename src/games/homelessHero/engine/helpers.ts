import type { EnemyTemplate } from "../types/enemy";
import type { inventoryItem, } from "../types/item";

export function cloneEnemy(e: EnemyTemplate): EnemyTemplate {
  return {
    ...e,
    // deep clone loot table if present
    lootTable: e.lootTable ? e.lootTable.map(x => ({ ...x, details: { ...x.details } })) : e.lootTable,
  };
}

export function addToInventory(inv: inventoryItem[], add: inventoryItem) {
  const next = [...inv];
  const found = next.find(x => x.details.id === add.details.id);
  if (found) found.quantity += add.quantity;
  else next.push({ details: add.details, quantity: add.quantity });
  return next;
}

export function removeFromInventory(inv: inventoryItem[], itemId: number, qty: number) {
  const next = inv.map(x => ({ ...x }));
  const found = next.find(x => x.details.id === itemId);
  if (!found) return next;
  found.quantity -= qty;
  if (found.quantity <= 0) return next.filter(x => x.details.id !== itemId);
  return next;
}

export function hasItem(inv: inventoryItem[], itemId: number, qty: number) {

  const found = inv.find(i => i.details.id === itemId)

  if (!found) return false

  return found.quantity >= qty
}
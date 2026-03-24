// content/data.ts
import { Locs, home } from "./locations";
import "./links";
import { Player } from "./player";
import { quests} from "./quests";
import { allItems, itemMap } from "./items";
  
  export const dataFor = {
  Locs,
  home,
  Player,
  quests,
  items: allItems,
  getQuest(questId: number) {
    const q = this.quests.find(q => q.id === questId);
    if (!q) throw new Error(`Quest not found: ${questId}`);
    return q;
  },

  getItem(itemId: number) {
  const i = itemMap[itemId]
    if (!i) throw new Error(`Item not found: ${itemId}`);
    return i;
  },
};


const questMap: Record<string, any> = {};

for (const q of dataFor.quests) {
  questMap[q.id] = q;
}

export function getQuest(questId:number) {
  const quest = questMap[questId];

  if (!quest) {
    throw new Error(`Quest not found: ${questId}`);
  }

  return quest;
}

export function getItem(weaponItemId: number) {
  const i = itemMap[weaponItemId]
    if (!i) throw new Error(`Item not found: ${weaponItemId}`);
    return i;
}

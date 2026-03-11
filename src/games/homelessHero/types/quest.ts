import type { keyItem, inventoryItem } from "./item";

export interface quest {
  id: number;

  name: string;
  description: string;

  rewardXP: number;
  rewardGold: number;

  rewardItem?: inventoryItem;

  questCompletionItem?: keyItem[];

  message: string;
}

export interface QuestProgress {
  id: number
  isComplete: boolean
}
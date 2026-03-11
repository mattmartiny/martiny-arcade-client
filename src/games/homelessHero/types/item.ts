export interface equippableItem {
  itemName: string;

  attackBonus: number;
  defenseBonus: number;
  speedBonus: number;

  equipped: boolean;
}

export interface lootItem{
details:item,
 chance: number, 
isDefaultItem: boolean
}

export interface wearableItem {
  itemName: string;

  attackBonus: number;
  defenseBonus: number;
  speedBonus: number;

  equipped: boolean;
}

export interface healingItem {
  amountHealed: number;
}

export interface item {
  id: number;
  name: string;

  price: number;

  equippable: boolean;
  wearable: boolean;
  healing: boolean;

  equippableStats?: equippableItem;
  wearableStats?: wearableItem;
  healingStats?: healingItem;
}

export interface inventoryItem {
  details: item;
  quantity: number;
}

export interface keyItem {
  details: item;
  quantity: number;
}
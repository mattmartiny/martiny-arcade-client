import type { item } from "./item";

export interface shop {
  id: number;

  shopName: string;

  shopInventory: item[];
}
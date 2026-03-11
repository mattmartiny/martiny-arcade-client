import type { quest } from "./quest";
import type { inventoryItem } from "./item";
import type { EnemyTemplate } from "./enemy";
import type { NPC } from "./NPC";
import type { completeDialog } from "./player";
import type { shop } from "./shop";

export interface Location {
  id: number;
  name: string;
  description: string;
  imgPath: string;

  hasEnemy: boolean;
  enemyNumber: number;
  EnemyHere?: readonly EnemyTemplate[];

  toTheNorth?: number;
  toTheEast?: number;
  toTheSouth?: number;
  toTheWest?: number;

  hasEntered: boolean;

  itemRequired: boolean;
  itemThatsRequired?: inventoryItem;

  questAvailableHere?: quest;

  dungeonHere: boolean;
  dungeonThatsHere?: dungeon;

  NPC: boolean;
  NPCHere?: NPC;

  Dialog?: completeDialog[];

  shop: boolean;
  shopHere?: shop;
}

export interface dungeon {
  id: number;
  name: string;
  floors: number;
  insideDungeon: boolean;
  dungeonFloors?: dungeonFloor[];
}

export interface dungeonFloor {
  dungeon: dungeon;
  floor: number;
  rooms: number;
  dungeonRooms?: dungeonRoom[];
}

export interface dungeonRoom {
  dungeon: dungeon;

  floor: dungeonFloor["floor"];
  roomNumber: dungeonFloor["rooms"];

  roomID: string;

  questAvailableHere?: quest;

  hasEnemy: boolean;
  enemyNumber: number;
  EnemyHere?: readonly EnemyTemplate[];
  exit: boolean;
  exitLocation?: Location;

  toTheNorth?: dungeonRoom;
  toTheEast?: dungeonRoom;
  toTheSouth?: dungeonRoom;
  toTheWest?: dungeonRoom;

  stairsUp: boolean;
  stairsDown: boolean;

  toStairsUp?: dungeonRoom;
  toStairsDown?: dungeonRoom;

  hasEntered: boolean;

  itemRequired: boolean;
  itemThatsRequired?: inventoryItem;

  NPCHere?: NPC;
  Dialog?: completeDialog[];

  shopHere?: shop;
}

export type Locations = Location[];
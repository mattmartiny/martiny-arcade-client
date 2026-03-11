import { dataFor } from "../content/data";
import type { Location, dungeonRoom, dungeon } from "../types/locations";
import type { Enemy } from "../types/enemy";
import type { NPC } from "../types/NPC";

export const initialGameState = {

  // world
  currentLocation: dataFor.home as Location,
  currentDungeon: null as dungeon | null,
  currentDungeonRoom: null as dungeonRoom | null,

  // combat
  activeEnemy: null as Enemy | null,

  // npc dialog
  npcOpen: false,
  npcName: "",
  npcDialog: "",
  npcOptions: [] as string[],
  activeNPC: null as NPC | null,

  // messages
  battleMessage: "",
  fightMessage: "",
  shopMessage: "",

  // ui
  fightOpen: false,
  shopOpen: false,
  casinoOpen: false,
  statusOpen: false,
};
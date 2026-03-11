import type { quest } from "./quest";
import type { dungeonRoom } from "./locations";

export interface NPC {
  id: number;

  name: string;

  optionPerson: boolean;

  initialMessage: string;

  endChatMessage: string;
  inProgressMessage?: string;
  Dialog1?: string;
  afterMessage?: string;

  questGiven?: {
    details: quest;
    hasQuest: boolean;
    isComplete: boolean;
  };

  dungeonRoom?: dungeonRoom;
}
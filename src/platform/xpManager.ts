import { awardXP, loadProfile } from "./arcadeProfile";
import { getGameConfig } from "./gameRegistry";
import { calculateLevel } from "./leveling";

type XPEvent = {
  gameId: string;
  amount: number;
  reason?: string;
  source?: string;
 multiplier?: number;
};

type XPListener = (data: {
  amount: number;
  newTotalXP: number;
  newLevel: number;
  leveledUp: boolean;
}) => void;

const listeners: XPListener[] = [];
const processedEvents = new Set<string>();

export function subscribeToXP(listener: XPListener) {
  listeners.push(listener);
  return () => {
    const index = listeners.indexOf(listener);
    if (index !== -1) listeners.splice(index, 1);
  };
}

function notifyXPListeners(data: Parameters<XPListener>[0]) {
  listeners.forEach(listener => listener(data));
}

export function awardGameXP(event: XPEvent) {
  const config = getGameConfig(event.gameId);
  if (!config || !config.awardsXP) return;
  if (event.amount <= 0) return;

  // 🔥 CREATE A STABLE EVENT KEY
  const eventKey = `${event.gameId}-${event.reason ?? "default"}`;

  // 🔒 PREVENT DUPLICATES
  if (processedEvents.has(eventKey)) return;
  processedEvents.add(eventKey);

  const profileBefore = loadProfile();
  const levelBefore = calculateLevel(profileBefore.totalXP).level;

  awardXP({
    amount: event.amount,
    source: event.gameId,
    reason: event.reason
  });

  const profileAfter = loadProfile();
  const levelAfter = calculateLevel(profileAfter.totalXP).level;

  notifyXPListeners({
    amount: event.amount,
    newTotalXP: profileAfter.totalXP,
    newLevel: levelAfter,
    leveledUp: levelAfter > levelBefore
  });
}
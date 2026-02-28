import { awardXP, loadProfile } from "./arcadeProfile";
import { getGameConfig } from "./gameRegistry";
import { calculateLevel } from "./leveling";

type XPEvent = {
  clientEventId: string;
  amount: number;
  reason?: string;
  source: string;
  multiplier?: number;
  timestamp: number;
};

type XPListener = (data: {
  amount: number;
  newTotalXP: number;
  newLevel: number;
  leveledUp: boolean;
}) => void;

const listeners: XPListener[] = [];

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
  const config = getGameConfig(event.source);
  if (!config || !config.awardsXP) return;
  if (event.amount <= 0) return;

  const profileBefore = loadProfile();
  const levelBefore = calculateLevel(profileBefore.totalXP).level;

  awardXP({
    amount: event.amount,
    multiplier: event.multiplier ?? 1,
    source: event.source,
    reason: event.reason,
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
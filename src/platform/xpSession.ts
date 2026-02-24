type XpEvent = {
  gameId: string;
  amount: number;
  multiplier?: number;
  reason?: string;
  timestamp: number;
};

let sessionBuffer: XpEvent[] = [];
let sessionGainedXP = 0;

export function addXpToSession(event: XpEvent) {
  const finalAmount = Math.round(
    event.amount * (event.multiplier ?? 1)
  );

  if (finalAmount === 0) return;

  sessionBuffer.push({
    ...event,
    amount: finalAmount,
    timestamp: Date.now(),
  });

  sessionGainedXP += finalAmount;
}

export function getSessionXP() {
  return sessionGainedXP;
}

export function getSessionEvents() {
  return [...sessionBuffer];
}

export function clearSessionXP() {
  sessionBuffer = [];
  sessionGainedXP = 0;
}
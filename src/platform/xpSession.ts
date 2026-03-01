type XpEvent = {
  clientEventId: string;
  source: string; // 👈 game identifier
  amount: number;
  multiplier?: number;
  reason?: string;
  timestamp: number;
};

type FlushResponse = {
  totalXP: number;
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  xpAdded: number;
};

let sessionBuffer: XpEvent[] = [];
let sessionGainedXP = 0;

export function addXpToSession(
  event: Omit<XpEvent, "clientEventId" | "timestamp">
) {
  const finalAmount = Math.round(
    event.amount * (event.multiplier ?? 1)
  );

  if (finalAmount === 0) return;

  sessionBuffer.push({
    ...event,
    clientEventId: crypto.randomUUID(),
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

export function getSessionSummary() {
  const perGame: Record<string, number> = {};

  for (const event of sessionBuffer) {
    if (!perGame[event.source]) {
      perGame[event.source] = 0;
    }

    perGame[event.source] += event.amount;
  }

  return {
    total: sessionGainedXP,
    perGame,
    events: [...sessionBuffer],
  };
}

let isFlushing = false;
export async function flushXP(
  token: string
): Promise<FlushResponse | null> {
  if (sessionBuffer.length === 0) return null;
  if (isFlushing) return null;

  isFlushing = true;

  const payload = {
    events: sessionBuffer.map(e => ({
      clientEventId: e.clientEventId,
      amount: e.amount,
      reason: e.reason ?? e.source,
      source: e.source
    }))
  };

  try {
    const res = await fetch("/api/xp/flush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      isFlushing = false;
      return null;
    }

    const data: FlushResponse = await res.json();

    clearSessionXP();
    isFlushing = false;
    return data;
  } catch {
    isFlushing = false;
    return null;
  }
}
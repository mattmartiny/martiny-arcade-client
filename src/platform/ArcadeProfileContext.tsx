import React, { createContext, useContext, useEffect, useState } from "react";
import { getSessionEvents, clearSessionXP } from "./xpSession";

type Profile = {
  xp: number;
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
};

const ArcadeProfileContext = createContext<Profile>({
  xp: 0,
  level: 1,
  xpIntoLevel: 0,
  xpForNextLevel: 100,
});

export function useArcadeProfile() {
  return useContext(ArcadeProfileContext);
}

function calculateLevelData(totalXP: number) {
  const safeXP = Math.max(0, Math.floor(totalXP));

  // Find level such that:
  // (level-1)^2 * 100 <= xp < level^2 * 100
  let level = 1;
  while (safeXP >= level * level * 100) {
    level++;
  }

  const currentLevelXP = (level - 1) * (level - 1) * 100;
  const nextLevelXP = level * level * 100;

  return {
    level,
    xpIntoLevel: safeXP - currentLevelXP,
    xpForNextLevel: nextLevelXP - currentLevelXP,
  };
}

export function ArcadeProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [xp, setXp] = useState(0);
  const [displayXP, setDisplayXP] = useState(0);

  // ✅ Listen for in-session XP events (local only)
  useEffect(() => {
    const handleXPUpdate = (e: Event) => {
      const ce = e as CustomEvent<number>;
      setXp((prev) => prev + (ce.detail ?? 0));
    };

    window.addEventListener("arcade:xp", handleXPUpdate);

    return () => {
      window.removeEventListener("arcade:xp", handleXPUpdate);
    };
  }, []);

  // ✅ Periodic sync (stub for now)
  useEffect(() => {
    const interval = window.setInterval(() => {
      const events = getSessionEvents();
      if (events.length === 0) return;

      console.log("Syncing XP to server (stub):", events);

      // TODO: replace with real API call later
      clearSessionXP();
    }, 60000);

    return () => window.clearInterval(interval);
  }, []);

  // ✅ Sync on tab close / refresh
  useEffect(() => {
    function handleBeforeUnload() {
      const events = getSessionEvents();
      if (events.length === 0) return;

      console.log("Syncing before unload:", events);

      // Later: navigator.sendBeacon("/api/xp/sync", JSON.stringify(events))
      // NOTE: beforeunload must be synchronous; fetch usually won't finish in time.
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // ✅ Animated tick-up
  useEffect(() => {
    if (displayXP === xp) return;

    const diff = xp - displayXP;
    const step = Math.max(1, Math.floor(Math.abs(diff) / 20));

    const interval = window.setInterval(() => {
      setDisplayXP((prev) => {
        if (prev === xp) return prev;
        if (prev < xp) return Math.min(prev + step, xp);
        return Math.max(prev - step, xp);
      });
    }, 16);

    return () => window.clearInterval(interval);
  }, [xp, displayXP]);

  const { level, xpIntoLevel, xpForNextLevel } = calculateLevelData(displayXP);

  return (
    <ArcadeProfileContext.Provider
      value={{
        xp: displayXP,
        level,
        xpIntoLevel,
        xpForNextLevel,
      }}
    >
      {children}
    </ArcadeProfileContext.Provider>
  );
}
import React, { createContext, useContext, useEffect, useState } from "react";
import { getSessionEvents, flushXP } from "./xpSession";
import { useAuth } from "./AuthContext";


type Profile = {
  xp: number;
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  multiplier: number;
};
const ArcadeProfileContext = createContext<Profile>({
  xp: 0,
  level: 1,
  xpIntoLevel: 0,
  xpForNextLevel: 100,
  multiplier: 1,
});

export function useArcadeProfile() {
  return useContext(ArcadeProfileContext);
}

function calculateLevelData(totalXP: number) {
  const safeXP = Math.max(0, Math.floor(totalXP));

  let level = 1;
  while (safeXP >= level * level * 100) {
    level++;
  }

  const currentLevelXP = (level - 1) * (level - 1) * 100;
  const nextLevelXP = level * level * 100;

  // 🔥 Must match backend multiplier logic
  const multiplier = 1 + level * 0.02;

  return {
    level,
    xpIntoLevel: safeXP - currentLevelXP,
    xpForNextLevel: nextLevelXP - currentLevelXP,
    multiplier
  };
}

export function ArcadeProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [xp, setXp] = useState(0);
  const [displayXP, setDisplayXP] = useState(0);
  const { user, token } = useAuth();



  useEffect(() => {
    if (!user || !token) return;

    const interval = window.setInterval(async () => {
      const result = await flushXP(token);

      if (result) {
        setXp(result.totalXP);
      }
    }, 10000);

    return () => window.clearInterval(interval);
  }, [user, token]);



  useEffect(() => {
    if (!user) return;

    async function loadProfile() {
      if (!user || !token) return;

      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) return;

      const data = await res.json();

      setXp(data.totalXP);
    }

    loadProfile();
  }, [user]);

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
  const { level, xpIntoLevel, xpForNextLevel, multiplier } =
    calculateLevelData(displayXP);

  return (
    <ArcadeProfileContext.Provider
      value={{
        xp: displayXP,
        level,
        xpIntoLevel,
        xpForNextLevel,
        multiplier,
      }}
    >
      {children}
    </ArcadeProfileContext.Provider>
  );
}
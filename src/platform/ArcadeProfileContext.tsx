import React, { createContext, useContext, useEffect, useState } from "react";
import { getSessionEvents, flushXP } from "./xpSession";
import { useAuth } from "./AuthContext";


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
  const { user } = useAuth();
  useEffect(() => {
    function handleXPUpdate(e: CustomEvent<number>) {
      if (!user) {
        window.dispatchEvent(
          new CustomEvent("arcade:xp-blocked")
        );
        return;
      }

      setXp((prev) => prev + e.detail);
    }

    window.addEventListener("arcade:xp", handleXPUpdate as EventListener);

    return () => {
      window.removeEventListener("arcade:xp", handleXPUpdate as EventListener);
    };
  }, [user]);



  useEffect(() => {
    if (!user) return;

    console.log("XP sync effect mounted");

    const interval = window.setInterval(async () => {
      console.log("XP interval tick");

      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
        return;
      }

      const result = await flushXP(token);
      console.log("Flush result:", result);

    }, 5000); // 5 sec for testing

    return () => window.clearInterval(interval);
  }, [user]);


  useEffect(() => {
    if (!user) return;

    const interval = window.setInterval(async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const result = await flushXP(token);

      if (result) {
        setXp(result.totalXP); // backend is source of truth
      }
    }, 60000);

    return () => window.clearInterval(interval);
  }, [user]);

  useEffect(() => {
    if (!user) return;

    async function loadProfile() {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:5173/api/profile", {
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
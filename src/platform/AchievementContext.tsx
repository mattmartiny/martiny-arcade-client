import { createContext, useContext, useState } from "react";

type Achievement = {
  key: string;
  title: string;
  description: string;
  xpReward: number;
};

type AchievementContextType = {
  unlocked: Achievement[];
  pushAchievements: (achievements: Achievement[]) => void;
  clear: () => void;
};

const AchievementContext = createContext<AchievementContextType | null>(null);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<Achievement[]>([]);

  function pushAchievements(achievements: Achievement[]) {
    setUnlocked(prev => [...prev, ...achievements]);
  }

  function clear() {
    setUnlocked([]);
  }

  return (
    <AchievementContext.Provider value={{ unlocked, pushAchievements, clear }}>
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementContext);
  if (!ctx) throw new Error("useAchievements must be used inside AchievementProvider");
  return ctx;
}
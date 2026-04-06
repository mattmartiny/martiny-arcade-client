const STORAGE_KEY = "martinyArcade.profile.v3";
import { calculateLevel } from "./leveling";
import { addXpToSession } from "./xpSession";

const BASE_XP = 25;

export type ArcadeProfile = {
  totalXP: number;
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
};

function defaultProfile(): ArcadeProfile {
  return {
    totalXP: 0,
    totalGamesPlayed: 0,
    totalWins: 0,
    totalLosses: 0,
  };
}

export function loadProfile(): ArcadeProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile();
    return { ...defaultProfile(), ...JSON.parse(raw) };
  } catch {
    return defaultProfile();
  }
}

export function saveProfile(profile: ArcadeProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function awardXP({
  source,
  amount,
  reason,
}: {
  amount: number;
  source: string;
  reason?: string;
}) {
  if (amount === 0) return;

  // 1️⃣ Store RAW XP (no multiplier applied)
  addXpToSession({
    source,
    amount, // 👈 raw amount only
    multiplier: 1, // 👈 keep for compatibility, but unused
    reason,
  });

  // 2️⃣ Update UI immediately (still feels responsive)
  window.dispatchEvent(
    new CustomEvent("arcade:xp", {
      detail: amount, // 👈 raw amount for UI
    })
  );
}

export function recordGameResult(win: boolean) {
  const profile = loadProfile();
  profile.totalGamesPlayed++;
  if (win) profile.totalWins++;
  else profile.totalLosses++;
  saveProfile(profile);
}

/**
 * XP required to reach next level
 */
export function getXPRequiredForLevel(level: number): number {
  return BASE_XP * level * level;
}

/**
 * Calculate level from total XP
 */
export function getLevelFromXP(xp: number): number {
  let level = 1;

  while (xp >= getXPRequiredForLevel(level)) {
    xp -= getXPRequiredForLevel(level);
    level++;
  }

  return level;
}

/**
 * Get progress toward next level
 */
export function getLevelProgress(xp: number) {
  let level = 1;
  let remainingXP = xp;

  while (remainingXP >= getXPRequiredForLevel(level)) {
    remainingXP -= getXPRequiredForLevel(level);
    level++;
  }

  const xpForNext = getXPRequiredForLevel(level);

  return {
    level,
    currentXPIntoLevel: remainingXP,
    xpNeededForLevel: xpForNext,
    progressPercent: (remainingXP / xpForNext) * 100,
  };
}

export function getGlobalLevelData(xp: number) {
  return calculateLevel(xp);
}
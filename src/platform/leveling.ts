export type LevelCurve = {
  getXPRequired(level: number): number;
};

const BASE_XP = 25;

/**
 * Default quadratic curve (fast early, slower later)
 */
export const defaultCurve: LevelCurve = {
  getXPRequired(level: number) {
    return BASE_XP * level * level;
  }
};

export function calculateLevel(
  totalXP: number,
  curve: LevelCurve = defaultCurve
) {
  let level = 1;
  let remainingXP = totalXP;

  while (remainingXP >= curve.getXPRequired(level)) {
    remainingXP -= curve.getXPRequired(level);
    level++;
  }

  return {
    level,
    currentXPIntoLevel: remainingXP,
    xpNeededForNextLevel: curve.getXPRequired(level),
    progressPercent:
      (remainingXP / curve.getXPRequired(level)) * 100
  };
}
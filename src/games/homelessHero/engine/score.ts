import type { player } from "../types/player";

export function calculateScore(player: player) {
    const levelScore = player.stats.level * 1000;
    const goldScore = player.stats.gold * 10;
    const questScore = player.questList.filter(q => q.isComplete).length * 500;
    const deathPenalty = player.stats.deathCount * 200;

    return levelScore + goldScore + questScore - deathPenalty;
}
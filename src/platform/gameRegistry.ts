export type XPCommitStrategy =
    | "immediate"
    | "batched"
    | "onComplete";


export type LeaderboardType = | "xp" | "best-score";


export type GameConfig = {
    id: string;
    title: string;
    requiresLoginToPlay: boolean;
    awardsXP: boolean;
    multiplier?: number;
    xpCommitStrategy: XPCommitStrategy;
    hasGlobalLeaderboard?: boolean;
    hasGameProfile?: boolean;
    allowLossPenalty?: boolean;
    leaderboardType: LeaderboardType;
    hasBestScore?: boolean;
    scoreDirection?: string;
};

export const games: GameConfig[] = [
    {
        id: "elemental-battle",
        title: "Elemental Battle",
        requiresLoginToPlay: false,
        xpCommitStrategy: "immediate",
        awardsXP: true,
        hasGameProfile: true,
        multiplier: 1,
        leaderboardType: "xp",
    },
    {
        id: "coin-flip",
        title: "Coin Flip",
        requiresLoginToPlay: false,
        xpCommitStrategy: "immediate",
        awardsXP: true,
        hasGameProfile: true,
        multiplier: 1,
        leaderboardType: "xp",
    },

    {
        id: "war",
        title: "War",
        requiresLoginToPlay: false,
        xpCommitStrategy: "immediate",
        awardsXP: true,
        multiplier: 1,
        allowLossPenalty: false,
        leaderboardType: "xp",
    },

    {
        id: "precision-grid",
        title: "Precision Grid",
        requiresLoginToPlay: false,
        xpCommitStrategy: "immediate",
        awardsXP: true,
        multiplier: 1,
        allowLossPenalty: false,
        hasBestScore: true,
        leaderboardType: "best-score",
        scoreDirection: "desc" //higher is better
    },

    {
        id: "reaction-arena",
        title: "Reaction Time Arena",
        xpCommitStrategy: "immediate",
        requiresLoginToPlay: false,
        allowLossPenalty: false,
        awardsXP: true,
        multiplier: 1,
        hasBestScore: true,
        leaderboardType: "best-score",
         scoreDirection: "asc" //lower is better

    }


    //     id: "reaction",
    //     title: "Reaction Test",
    //     requiresLoginToPlay: false,
    //     awardsXP: true
    //   },
    //   {
    //     id: "ranked-arena",
    //     title: "Ranked Arena",
    //     requiresLoginToPlay: true,
    //     awardsXP: true
    //   }
];


export function getGameConfig(gameId: string): GameConfig | undefined {
    return games.find(g => g.id === gameId);
}
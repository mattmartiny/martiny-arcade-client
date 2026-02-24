export type XPCommitStrategy =
    | "immediate"
    | "batched"
    | "onComplete";
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
};

export const games: GameConfig[] = [
    {
        id: "elemental-battle",
        title: "Elemental Battle",
        requiresLoginToPlay: false,
        xpCommitStrategy: "immediate",
        awardsXP: true,
        hasGameProfile: true,
        multiplier: 1
    },
    {
        id: "coin-flip",
        title: "Coin Flip",
        requiresLoginToPlay: false,
        xpCommitStrategy: "immediate",
        awardsXP: true,
        hasGameProfile: true,
        multiplier: 1,
    },
    
    {
        id: "war",
        title: "War",
      requiresLoginToPlay: false,
        xpCommitStrategy: "immediate",
        awardsXP: true, 
        multiplier: 1,
        allowLossPenalty: false,
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
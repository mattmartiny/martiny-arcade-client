import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getGameConfig } from "../../platform/gameRegistry";
import "./Leaderboard.css"

type XpEntry = {
  rank: number;
  username: string;
  totalXP: number;
};

type BestScoreEntry = {
  username: string;
  bestScore: number;
};

export default function LeaderboardGame() {
  const { gameKey } = useParams<{ gameKey: string }>();

  const config = useMemo(
    () => (gameKey ? getGameConfig(gameKey) : null),
    [gameKey]
  );

  const title = config?.title ?? gameKey ?? "Leaderboard";

  const [xpData, setXpData] = useState<XpEntry[]>([]);
  const [bestScoreData, setBestScoreData] = useState<BestScoreEntry[]>([]);

  useEffect(() => {
    if (!gameKey) return;

    async function load() {
      // Always load XP leaderboard
      const xpRes = await fetch(`/api/leaderboard/game/${gameKey}`);
      if (xpRes.ok) {
        setXpData(await xpRes.json());
      }

      // Load best score if supported
      if (config?.hasBestScore) {
        const bestRes = await fetch(
          `/api/leaderboard/game/${gameKey}/best-scores`
        );
        if (bestRes.ok) {
          setBestScoreData(await bestRes.json());
        }
      }
    }

    load();
  }, [gameKey, config]);

  if (!gameKey) return <div className="page-container">Missing game key.</div>;

  return (
    <div className="page-container">
      <h1 className="leaderboard-header">{title} Leaderboards</h1>

      {/* 🥇 XP Leaderboard */}
      <div className="leaderboard-section">
        <h2>Total XP</h2>

        {xpData.map((entry) => (
          <div key={entry.rank} className="leaderboard-row">
            <span>#{entry.rank}</span>
            <span>{entry.username}</span>
            <span>{entry.totalXP} XP</span>
          </div>
        ))}
      </div>

      {/* 🎯 Best Score Leaderboard */}
      {config?.hasBestScore && (
        <div className="leaderboard-section">
          <h2>Best Score</h2>

          {bestScoreData.map((entry, i) => (
            <div key={i} className="leaderboard-row">
              <span>#{i + 1}</span>
              <span>{entry.username}</span>
              <span>{entry.bestScore}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
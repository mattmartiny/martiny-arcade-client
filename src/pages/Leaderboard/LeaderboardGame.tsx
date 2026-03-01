import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Entry = {
  rank: number;
  username: string;
  totalXP: number;
};

export default function LeaderboardGame() {
  const { gameKey } = useParams();
  const [data, setData] = useState<Entry[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/leaderboard/game/${gameKey}`);
      if (!res.ok) return;

      const json = await res.json();
      setData(json);
    }

    load();
  }, [gameKey]);

  return (
    <div className="page-container">
      <h1 className="leaderboard-header">{gameKey} Leaderboard</h1>

      {data.map(entry => (
        <div key={entry.rank} className="leaderboard-row">
          <span>#{entry.rank}</span>
          <span>{entry.username}</span>
          <span>{entry.totalXP} XP</span>
        </div>
      ))}
    </div>
  );
}
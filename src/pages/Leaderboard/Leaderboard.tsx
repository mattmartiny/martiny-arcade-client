import { useEffect, useState } from "react";
import "./Leaderboard.css"
import { Link } from "react-router-dom";

type LeaderboardEntry = {
    username: string;
    totalXP: number;
    level: number;
};

export default function Leaderboard() {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/leaderboard?take=50")
            .then((res) => res.json())
            .then((data) => {
                setEntries(data);
                setLoading(false);
            });
    }, []);

    return (
     <div className="page-container">
        <h1>Global Leaderboard</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="leaderboard">
                    {entries.map((entry, index) => (
                        <div
                            key={entry.username}
                            className={`leaderboard-row rank-${index + 1}`}
                        >
                            <div className="rank">#{index + 1}</div>
                            <div className="username"><Link to={`/profile/${entry.username}`}>
                                {entry.username}
                            </Link></div>
                            <div className="level">Lv {entry.level}</div>
                            <div className="xp">{entry.totalXP} XP</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
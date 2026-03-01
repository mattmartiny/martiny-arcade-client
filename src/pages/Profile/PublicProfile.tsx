import { useEffect, useState } from "react";
import { useAuth } from "../../platform/AuthContext";
import "./PublicProfile.css";

type ProfileResponse = {
  username: string;
  totalXP: number;
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  multiplier: number;
  rank: number;
  mostPlayedGame: string | null;
  recentEvents: {
    amount: number;
    reason: string;
    createdAt: string;
  }[];
};

export default function Profile() {
  const { token } = useAuth();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    async function loadProfile() {
      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();
      setProfile(data);
      setLoading(false);
    }

    loadProfile();
  }, [token]);

  if (!token) return <div className="page-container">Please login.</div>;
  if (loading) return <div className="page-container">Loading...</div>;
  if (!profile) return <div className="page-container">Profile not found.</div>;

  const percent = Math.min(
    100,
    Math.round((profile.xpIntoLevel / profile.xpForNextLevel) * 100)
  );

  return (
    <div className="page-container">
      <h1>{profile.username}</h1>

      {/* Global Progress */}
      <div className="profile-card">
        <h2>Global Progress</h2>
        <p>Level {profile.level}</p>
        <p>Total XP: {profile.totalXP}</p>
        <p>Global Rank: #{profile.rank}</p>
        <p>  XP Multiplier: x{profile.multiplier.toFixed(2)}
          (+{Math.round((profile.multiplier - 1) * 100)}%)</p>
        <div className="xp-bar">
          <div
            className="xp-fill"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p>
          {profile.xpIntoLevel} / {profile.xpForNextLevel} XP to next level
        </p>
      </div>

      {/* Game Stats */}
      <div className="profile-card">
        <h2>Game Stats</h2>
        <p>Most Played Game: {profile.mostPlayedGame ?? "N/A"}</p>
      </div>

      {/* Recent XP */}
      <div className="profile-card">
        <h2>Recent XP</h2>

        {profile.recentEvents.length === 0 && <p>No recent activity.</p>}

        {profile.recentEvents.map((xp, i) => (
          <div key={i} className="xp-row">
            <span>+{xp.amount} XP</span>
            <span>{xp.reason}</span>
            <span>
              {new Date(xp.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
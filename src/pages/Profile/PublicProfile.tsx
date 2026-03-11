import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../platform/AuthContext";
import "./PublicProfile.css";

type RecentEvent = {
  amount: number;
  reason: string;
  createdAt: string;
};

type ProfileResponse = {
  username: string;
  totalXP: number;
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  multiplier: number;
  rank: number;
  mostPlayedGame: string | null;
  recentEvents?: RecentEvent[]; // ✅ optional for safety
  achievements: {
  key: string
  title: string
  description: string
  unlockedAt: string
}[]
};

export default function Profile() {
  const { token } = useAuth();
  const { username } = useParams<{ username?: string }>();

  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // If route has username, we are viewing a public profile
  const isPublic = useMemo(() => Boolean(username), [username]);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setLoading(true);
      setProfile(null);

      try {
        let res: Response | null = null;

        if (username) {
          // ✅ Public profile
          res = await fetch(`/api/profile/${encodeURIComponent(username)}`);
        } else {
          // ✅ My profile (requires auth)
          if (!token) {
            setLoading(false);
            return;
          }

          res = await fetch("/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        if (!res.ok) {
          if (!cancelled) setLoading(false);
          return;
        }

        const data: ProfileResponse = await res.json();
        if (!cancelled) {
          setProfile(data);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();

    return () => {
      cancelled = true;
    };
  }, [token, username]);

  if (!isPublic && !token) {
    return <div className="page-container">Please login.</div>;
  }

  if (loading) return <div className="page-container">Loading...</div>;
  if (!profile) return <div className="page-container">Profile not found.</div>;

  const percent =
    profile.xpForNextLevel > 0
      ? Math.min(100, Math.round((profile.xpIntoLevel / profile.xpForNextLevel) * 100))
      : 0;

  const recentEvents = profile.recentEvents ?? [];

  return (
    <div className="page-container">
      <h1>{profile.username}</h1>

      {/* Global Progress */}
      <div className="profile-card">
        <h2>Global Progress</h2>
        <p>Level {profile.level}</p>
        <p>Total XP: {profile.totalXP}</p>
        <p>Global Rank: #{profile.rank}</p>
  
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${percent}%` }} />
        </div>

        <p>
          {profile.xpIntoLevel} / {profile.xpForNextLevel} XP to next level
        </p>
      </div>


    <div className="profile-card">
  <h2>Achievements</h2>

  {profile.achievements.length === 0 && <p>No achievements yet.</p>}

  <div className="achievement-grid">
    {profile.achievements.map(a => (
      <div key={a.key} className="achievement-badge">
        🏆
        <div>{a.title}</div>
      </div>
    ))}
  </div>
</div>

      {/* Game Stats */}
      <div className="profile-card">
        <h2>Game Stats</h2>
        <p>Most Played Game: {profile.mostPlayedGame ?? "N/A"}</p>
      </div>

      {/* ✅ Recent XP */}
      <div className="profile-card">
        <h2>Recent XP</h2>

        {recentEvents.length === 0 && <p>No recent activity.</p>}

        {recentEvents.map((xp, i) => (
          <div key={i} className="xp-row">
            <span>+{xp.amount} XP</span>
            <span>{xp.reason}</span>
            <span>{new Date(xp.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
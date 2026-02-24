import "./profile.css";
import { useArcadeProfile } from "../../platform/ArcadeProfileContext";

export default function Profile() {
  const { xp, level, xpIntoLevel, xpForNextLevel } = useArcadeProfile();

  const percent = Math.min(
    100,
    Math.round((xpIntoLevel / xpForNextLevel) * 100)
  );

  return (
    <div className="page-container">
      <h1>Your Profile</h1>

      {/* Global Progress */}
      <div className="profile-card">
        <h2>Global Progress</h2>
        <p>Level {level}</p>
        <p>Total XP: {xp}</p>

        <div className="xp-bar">
          <div
            className="xp-fill"
            style={{ width: `${percent}%` }}
          />
        </div>

        <p>
          {xpIntoLevel} / {xpForNextLevel} XP to next level
        </p>
      </div>

      {/* Game Stats Placeholder */}
      <div className="profile-card">
        <h2>Game Stats</h2>
        <p>Per-game stats coming soon.</p>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useArcadeProfile } from "../platform/ArcadeProfileContext";
import { formatNumber } from "../utils/format";
import { NavLink } from "react-router-dom";
import { useAchievements } from "../platform/AchievementContext";
import AchievementToast from "./AchievementToast/AchievementToast";

import "../styles/gameShell.css";

type GameShellProps = {
  gameKey?: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  status?: string;
  subStatus?: string;
  sidebar?: React.ReactNode;
  children: React.ReactNode;
};

export default function GameShell({
  gameKey,
  title,
  subtitle,
  eyebrow,
  status,
  subStatus,
  children,
  sidebar,
}: GameShellProps) {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const { xp, level, xpIntoLevel, xpForNextLevel, multiplier } =
    useArcadeProfile();

  const { unlocked, clear, pushAchievements } = useAchievements();

  const percent =
    xpForNextLevel > 0
      ? Math.max(0, Math.min(100, (xpIntoLevel / xpForNextLevel) * 100))
      : 0;

  const xpRemaining = xpForNextLevel - xpIntoLevel;

  // 🚀 Listen for achievement events globally
  useEffect(() => {
    function handleAchievement(event: any) {
      if (event.detail?.length) {
        pushAchievements(event.detail);
      }
    }

    window.addEventListener("achievementUnlocked", handleAchievement);

    return () => {
      window.removeEventListener("achievementUnlocked", handleAchievement);
    };
  }, [pushAchievements]);

  // 🔔 Auto clear toasts
  useEffect(() => {
    if (!unlocked.length) return;

    const timer = setTimeout(() => {
      clear();
    }, 4000);

    return () => clearTimeout(timer);
  }, [unlocked, clear]);

  // 🚫 XP blocked listener
  useEffect(() => {
    function handleBlockedXP() {
      setShowLoginPrompt(true);
      setTimeout(() => setShowLoginPrompt(false), 3000);
    }

    window.addEventListener("arcade:xp-blocked", handleBlockedXP);

    return () => {
      window.removeEventListener("arcade:xp-blocked", handleBlockedXP);
    };
  }, []);

  return (
    <div className="game-shell">
      <section className="game-hero">
        <div className="game-headline">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1>{title}</h1>
            {subtitle && <p className="subline">{subtitle}</p>}
            {gameKey && (
              <NavLink to={`/leaderboard/${gameKey}`}>
                {title} Leaderboard
              </NavLink>
            )}
          </div>
        </div>

        <div className="profile-bar">
          <div className="profile-top">
            {showLoginPrompt && (
              <div className="login-warning">
                Login or create an account to gain XP.
              </div>
            )}
            <span>Level {level}</span>
            <span>{formatNumber(xp)} XP</span>
            <span className="xp-multiplier">
              x{multiplier.toFixed(2)}
              (+{Math.round((multiplier - 1) * 100)}%)
            </span>
          </div>

          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${percent}%` }} />
          </div>

          <div className="xp-meta">
            <span>
              {formatNumber(xpIntoLevel)} /{" "}
              {formatNumber(xpForNextLevel)} XP
            </span>
            <span>
              {formatNumber(xpRemaining)} XP to next level
            </span>
          </div>
        </div>

        {status && <p className="status">{status}</p>}
        {subStatus && <p className="status-sub">{subStatus}</p>}

        <div className="game-grid">
          <div className="panel">{children}</div>
          {sidebar && <div className="panel">{sidebar}</div>}
        </div>
      </section>

      {/* 🎉 Achievement Toasts */}
      {unlocked.map((a) => (
        <AchievementToast
          key={a.key}
          title={a.title}
          description={a.description}
          xpReward={a.xpReward}
        />
      ))}
    </div>
  );
}
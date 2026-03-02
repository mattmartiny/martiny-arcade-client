import { useEffect, useState } from "react";
import { useArcadeProfile } from "../platform/ArcadeProfileContext";
import { formatNumber } from "../utils/format";
import { flushXP } from "../platform/xpSession";
import { useAuth } from "../platform/AuthContext";
import { Link, NavLink } from "react-router-dom";
import "../styles/gameShell.css"


type GameShellProps = {
     gameKey?: string; 
    title: string;
    subtitle?: string;
    eyebrow?: string;
    status?: string;
    subStatus?: string;
    children: React.ReactNode;
    sidebar?: React.ReactNode;
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
    const percent =
        xpForNextLevel > 0
            ? Math.max(0, Math.min(100, (xpIntoLevel / xpForNextLevel) * 100))
            : 0;

    const xpRemaining = xpForNextLevel - xpIntoLevel;

    useEffect(() => {
        function handleBlockedXP() {
            setShowLoginPrompt(true);

            setTimeout(() => {
                setShowLoginPrompt(false);
            }, 3000);
        }

        window.addEventListener("arcade:xp-blocked", handleBlockedXP);

        return () => {
            window.removeEventListener("arcade:xp-blocked", handleBlockedXP);
        };
    }, []);

    // useEffect(() => {
    //     const handleBeforeUnload = () => {
    //         const token = localStorage.getItem("token");
    //         if (!token) return;

    //         flushXP(token);
    //     };

    //     window.addEventListener("beforeunload", handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener("beforeunload", handleBeforeUnload);
    //     };
    // }, []);

    return (
        <div className="game-shell">

            {/* <div className="auth-area">
                {!user ? (
                    <Link to="/login">Login</Link>
                ) : (
                    <>
                        <span style={{margin: '15px', padding: '10px'}} >{user.username}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </div> */}
            <section className="game-hero">
                <div className="game-headline">
                    <div>
                        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                        <h1>{title}</h1>
                        {subtitle && <p className="subline">{subtitle}</p>}
{gameKey && (
        <NavLink to={`/leaderboard/${gameKey}`}>{title} Leaderboard</NavLink>)}
                
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
                        <div
                            className="xp-fill"
                            style={{ width: `${percent}%` }}
                        />
                    </div>

                    <div className="xp-meta">
                        <span>
                            {formatNumber(xpIntoLevel)} / {formatNumber(xpForNextLevel)} XP
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
        </div>
    );
}
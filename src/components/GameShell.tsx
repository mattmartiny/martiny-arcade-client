import { useArcadeProfile } from "../platform/ArcadeProfileContext";
import { formatNumber } from "../utils/format";

type GameShellProps = {
    title: string;
    subtitle?: string;
    eyebrow?: string;
    status?: string;
    subStatus?: string;
    children: React.ReactNode;
    sidebar?: React.ReactNode;
};

export default function GameShell({
    title,
    subtitle,
    eyebrow,
    status,
    subStatus,
    children,
    sidebar,
}: GameShellProps) {

    const { xp, level, xpIntoLevel, xpForNextLevel } = useArcadeProfile();
    const percent =
        xpForNextLevel > 0
            ? Math.max(0, Math.min(100, (xpIntoLevel / xpForNextLevel) * 100))
            : 0;

    const xpRemaining = xpForNextLevel - xpIntoLevel;
    return (
        <div className="game-shell">
            <section className="game-hero">
                <div className="game-headline">
                    <div>
                        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
                        <h1>{title}</h1>
                        {subtitle && <p className="subline">{subtitle}</p>}
                    </div>
                </div>
                <div className="profile-bar">
                    <div className="profile-top">
                        <span>Level {level}</span>
                        <span>{formatNumber(xp)} XP</span>
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
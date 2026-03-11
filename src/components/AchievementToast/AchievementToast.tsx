import "./AchievementToast.css";

type Props = {
  title: string;
  description: string;
  xpReward: number;
};

export default function AchievementToast({ title, description, xpReward }: Props) {
  return (
    <div className="achievement-toast">
      <div className="achievement-icon">🏆</div>
      <div className="achievement-content">
        <div className="achievement-title">{title}</div>
        <div className="achievement-desc">{description}</div>
        <div className="achievement-xp">+{xpReward} XP</div>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";

type GameCardProps = {
  title: string;
  description: string;
  to: string;
  accent?: "pink" | "blue" | "gold" | "purple" | "green" | "yellow";
};

export default function GameCard({
  title,
  description,
  to,
  accent = "pink",
}: GameCardProps) {
  return (
    <Link to={to} className={`game-card ${accent}`}>
      <div className="game-card-inner">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="play-button">Play</div>
      </div>
    </Link>
  );
}
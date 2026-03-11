import { useRef, useState } from "react";
import GameShell from "../../components/GameShell";
import { awardXP } from "../../platform/arcadeProfile";
import { getGameConfig } from "../../platform/gameRegistry";
import "./coinFlip.css";
import { recordGameSession } from "../../platform/gameService";
import { useAuth } from "../../platform/AuthContext";

const GAME_ID = "coin-flip";

export default function CoinFlip() {
  const config = getGameConfig(GAME_ID);
  if (!config) throw new Error("Game config missing");

  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [status, setStatus] = useState("Call it and flip.");
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const rotationRef = useRef(0); // ✅ source of truth
  const { token } = useAuth();

  async function flip(choice: "Heads" | "Tails") {
    if (isFlipping) return;

    setIsFlipping(true);
    setStatus("Flipping...");

    const landed = Math.random() < 0.5 ? "Heads" : "Tails";




    // 3–6 full spins
    const spins = 3 + Math.floor(Math.random() * 4);

    // ✅ pick a clean base each time so we never drift
    const base = Math.floor(rotationRef.current / 360) * 360;

    // Base rotation for result
    const faceRotation = landed === "Tails" ? 180 : 0;

    const totalRotation = base + spins * 360 + faceRotation;

    rotationRef.current = totalRotation;
    setRotation(totalRotation);

    await new Promise((r) => setTimeout(r, 900));

    setResult(landed);

    if (choice === landed) {
      setWins((w) => w + 1);
      setStatus(`It landed on ${landed}. You WON!`);



      let xpEarned = 2
      awardXP({
        amount: xpEarned,
        source: "coin-flip",
        multiplier: config?.multiplier,
        reason: "Coin Flip Win",
      });

      if (token)recordGameSession(token, GAME_ID, 1, (xpEarned));


    } else {
      setLosses((l) => l + 1);
      setStatus(`It landed on ${landed}. You lost.`);
     if(token) recordGameSession(token, GAME_ID, 0, (0));
    }

    setIsFlipping(false);
  }

  const sidebar = (
    <>
      <h2>Stats</h2>
      <div className="stat">
        Wins:
        <strong>{wins}</strong>
      </div>
      <div className="stat">
        Losses:
        <strong>{losses}</strong>
      </div>
      <div className="stat">
        Total Plays:
        <strong>{wins + losses}</strong>
      </div>
    </>
  );

  return (
    <GameShell
      gameKey={GAME_ID}
      eyebrow="Quick Pick"
      title="Coin Flip"
      subtitle="Heads or Tails. Simple luck."
      status={status}
      sidebar={sidebar}
    >
      <div className="coin-area">
        <div className="coin">
          <div
            className="coin-inner"
            style={{
              transform: `rotateY(${rotation}deg)`,
            }}
          >
            <div className="coin-face coin-front">Heads</div>
            <div className="coin-face coin-back">Tails</div>
          </div>
        </div>

        <div className="choices" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button onClick={() => flip("Heads")} disabled={isFlipping}>
            Heads
          </button>
          <button onClick={() => flip("Tails")} disabled={isFlipping}>
            Tails
          </button>
        </div>
      </div>
    </GameShell>
  );
}
import { useState } from "react";
import GameShell from "../../components/GameShell";
import { awardXP } from "../../platform/arcadeProfile";
import { getGameConfig } from "../../platform/gameRegistry";
import { useAuth } from "../../platform/AuthContext";
import { recordGameSession } from "../../platform/gameService";

import "./elementalBattle.css";
const GAME_ID = "elemental-battle";

const elements = ["Fire", "Water", "Earth", "Metal", "Wood"] as const;
type Element = typeof elements[number];

export default function ElementalBattle() {
  const config = getGameConfig(GAME_ID);
  if (!config) throw new Error("Game config missing");

  const { token } = useAuth();
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [seriesWins, setSeriesWins] = useState(0);
  const [seriesLosses, setSeriesLosses] = useState(0);
  const [currentSeriesW, setCurrentSeriesW] = useState(0);
  const [currentSeriesL, setCurrentSeriesL] = useState(0);
  const [status, setStatus] = useState("Choose your element.");
  const [isLocked, setIsLocked] = useState(false);
  const [lastChoice, setLastChoice] = useState<Element | null>(null);

  function determineWinner(player: Element, computer: Element) {
    if (player === computer) return "tie";

    if (
      (player === "Wood" && (computer === "Fire" || computer === "Metal")) ||
      (player === "Fire" && (computer === "Earth" || computer === "Water")) ||
      (player === "Earth" && (computer === "Wood" || computer === "Metal")) ||
      (player === "Metal" && (computer === "Fire" || computer === "Water")) ||
      (player === "Water" && (computer === "Wood" || computer === "Earth"))
    ) {
      return "loss";
    }

    return "win";
  }

  function play(choice: Element) {
    if (isLocked) return;

    setIsLocked(true);

    const computer = elements[Math.floor(Math.random() * elements.length)];
    const result = determineWinner(choice, computer);

    if (result === "tie") {
      setStatus(`You chose ${choice}. Opponent chose ${computer}. It's a tie.`);
      setIsLocked(false);
      return;
    }

    if (result === "win") {
      setWins((w) => w + 1);
      setCurrentSeriesW((w) => w + 1);
      setStatus(`You chose ${choice}. Opponent chose ${computer}. You WIN!`);
    } else {
      setLosses((l) => l + 1);
      setCurrentSeriesL((l) => l + 1);
      setStatus(`You chose ${choice}. Opponent chose ${computer}. You LOST.`);
    }

    setTimeout(() => {
      const nextW = result === "win" ? currentSeriesW + 1 : currentSeriesW;
      const nextL = result === "loss" ? currentSeriesL + 1 : currentSeriesL;

      // SERIES WIN
      if (nextW >= 3) {
        setSeriesWins((s) => s + 1);
        setCurrentSeriesW(0);
        setCurrentSeriesL(0);

        const xpEarned = 3;

        awardXP({
          source: "elemental-battle",
          amount: xpEarned,
          multiplier: config?.multiplier,
          reason: "Series Win",
        });

        if (token) {
          recordGameSession(
            token,
            "elemental-battle",
            3,           // score
            xpEarned
          );
        }

        setStatus("You WON the series!");
      }

      // SERIES LOSS
      else if (nextL >= 3) {
        setSeriesLosses((s) => s + 1);
        setCurrentSeriesW(0);
        setCurrentSeriesL(0);

        const xpEarned = 1; // optional participation XP

        awardXP({
          source: "elemental-battle",
          amount: xpEarned,
          multiplier: config?.multiplier,
          reason: "Series Loss",
        });

        if (token) {
          recordGameSession(
            token,
            "elemental-battle",
            nextW,   // score = how many rounds they won
            xpEarned
          );
        }

        setStatus("You LOST the series.");
      }

      setLastChoice(choice);
      setIsLocked(false);
    }, 500);
  }

  const sidebar = (
    <>
      <h2>Records</h2>
      <div className="stat">
        Current Series:
        <strong>{currentSeriesW}-{currentSeriesL}</strong>
      </div>
      <div className="stat">
        Series Record:
        <strong>{seriesWins}-{seriesLosses}</strong>
      </div>
      <div className="stat">
        Total Record:
        <strong>{wins}-{losses}</strong>
      </div>
    </>
  );

  return (
    <GameShell
      
      gameKey={GAME_ID}
      eyebrow="Elemental Showdown"
      title="Elemental Battle"
      subtitle="First to 3 wins the series."
      status={status}
      sidebar={sidebar}
    >
      <div className="eb-choices">
        {elements.map((el) => (
          <button
            key={el}
            className={`eb-btn ${el.toLowerCase()}`}
            disabled={isLocked}
            onClick={() => play(el)}
          >
            {el}
          </button>
        ))}
      </div>
    </GameShell>
  );
}
import { useState, useEffect } from "react";
import GameShell from "../../components/GameShell";
import { awardXP } from "../../platform/arcadeProfile";
import { recordGameSession } from "../../platform/gameService";
import { useAuth } from "../../platform/AuthContext";
import { getGameConfig } from "../../platform/gameRegistry";
import "./patternMemory.css";

const GAME_ID = "pattern-memory";
const GRID_SIZE = 9;

export default function PatternMemory() {
  const config = getGameConfig(GAME_ID);
  if (!config) throw new Error("Game config missing");

  const { token } = useAuth();

  const [pattern, setPattern] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isShowing, setIsShowing] = useState(false);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("Press Start");
  const [gameOver, setGameOver] = useState(false);

  function startGame() {
    const startPattern = generatePattern(2);
    setPattern(startPattern);
    setPlayerInput([]);
    setScore(0);
    setGameOver(false);
    setStatus("Watch carefully...");
    showPattern(startPattern);
  }

  function generatePattern(length: number) {
    return Array.from({ length }, () =>
      Math.floor(Math.random() * GRID_SIZE)
    );
  }

  async function showPattern(p: number[]) {
    setIsShowing(true);

    for (let i = 0; i < p.length; i++) {
      setActiveIndex(p[i]);
      await wait(500);
      setActiveIndex(null);
      await wait(250);
    }

    setIsShowing(false);
    setStatus("Your turn!");
  }

  function handleClick(index: number) {
    if (isShowing || gameOver) return;

    const newInput = [...playerInput, index];
    setPlayerInput(newInput);

    if (pattern[newInput.length - 1] !== index) {
      finishGame();
      return;
    }

    if (newInput.length === pattern.length) {
      const nextScore = pattern.length;
      setScore(nextScore);

      const newPattern = [...pattern, Math.floor(Math.random() * GRID_SIZE)];
      setPattern(newPattern);
      setPlayerInput([]);
      setStatus("Watch carefully...");
      setTimeout(() => showPattern(newPattern), 600);
    }
  }

  function finishGame() {
    setGameOver(true);
    setStatus(`Game Over! Final Score: ${pattern.length - 1}`);

    const finalScore = pattern.length - 1;
  const xpEarned = Math.floor(finalScore * 2 + finalScore / 3);

    awardXP({
      source: GAME_ID,
      amount: xpEarned,
      multiplier: config?.multiplier,
      reason: "Pattern Memory Complete"
    });

    if (token) {
      recordGameSession(token, GAME_ID, finalScore, xpEarned);
    }
  }

  function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <GameShell
      gameKey={GAME_ID}
      eyebrow="Mental Skill"
      title="Pattern Memory"
      subtitle="Repeat the growing pattern."
      status={status}
    >
      <div className="pattern-grid">
        {Array.from({ length: GRID_SIZE }).map((_, i) => (
          <div
            key={i}
            className={`pattern-cell ${
              activeIndex === i ? "active" : ""
            }`}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>

      {!isShowing && !gameOver && pattern.length === 0 && (
        <button onClick={startGame}>Start</button>
      )}

      {gameOver && <button onClick={startGame}>Play Again</button>}
    </GameShell>
  );
}
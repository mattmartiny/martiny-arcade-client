import { useState, useRef } from "react";
import GameShell from "../../components/GameShell";
import { awardXP } from "../../platform/arcadeProfile";
import { recordGameSession } from "../../platform/gameService";
import { useAuth } from "../../platform/AuthContext";
import { getGameConfig } from "../../platform/gameRegistry";
import "./reactionArena.css";

const GAME_ID = "reaction-arena";

export default function ReactionArena() {
    const config = getGameConfig(GAME_ID);
    if (!config) throw new Error("Game config missing");

    const { token } = useAuth();

    const [status, setStatus] = useState("Click Start to begin.");
    const [round, setRound] = useState(0);
    const [results, setResults] = useState<number[]>([]);
    const [active, setActive] = useState(false);
    const [ready, setReady] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const startTimeRef = useRef<number | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const TOTAL_ROUNDS = 5;

    function startGame() {
        setRound(0);
        setResults([]);
        setGameOver(false);
        setStatus("Wait for green...");
        nextRound();
    }

    function nextRound() {
        setReady(false);
        setActive(true);

        const delay = 1500 + Math.random() * 2500;

        timeoutRef.current = setTimeout(() => {
            startTimeRef.current = performance.now();
            setReady(true);
            setStatus("CLICK!");
        }, delay);
    }

    function handleClick() {
        if (!active) return;

        // Clicked too early
        if (!ready) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            setStatus("Too early! Restarting round...");
            setActive(false);
            setTimeout(nextRound, 1000);
            return;
        }

        const reactionTime = performance.now() - startTimeRef.current!;
        const newResults = [...results, reactionTime];

        setResults(newResults);
        setRound(prev => prev + 1);
        setActive(false);
        setReady(false);

        if (newResults.length >= TOTAL_ROUNDS) {
            finishGame(newResults);
        } else {
            setStatus("Wait for green...");
            setTimeout(nextRound, 1000);
        }
    }

    function finishGame(times: number[]) {
        const average = Math.round(
            times.reduce((a, b) => a + b, 0) / times.length
        );

        setGameOver(true);
        setStatus(`Average Reaction: ${average} ms`);

        const xpEarned = Math.max(1, Math.floor(500 / average));

        awardXP({
            source: GAME_ID,
            amount: xpEarned,
            multiplier: config?.multiplier,
            reason: "Reaction Arena Complete"
        });

        if (token) {
            recordGameSession(token, GAME_ID, average, xpEarned);
        }
    }

    const backgroundClass = ready
        ? "arena-ready"
        : active
            ? "arena-wait"
            : "arena-idle";

    return (
        <GameShell
            gameKey={GAME_ID}
            eyebrow="Skill Arena"
            title="Reaction Time Arena"
            subtitle="Fastest average wins."
            status={status}
        >
            <div
                className={`reaction-arena ${backgroundClass}`}
                onClick={handleClick}
            >
                {!active && !gameOver && (
                    <button onClick={startGame}>Start</button>
                )}

                {gameOver && (
                    <button onClick={startGame}>Play Again</button>
                )}
            </div>
        </GameShell>
    );
}
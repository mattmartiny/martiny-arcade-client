import { useEffect, useRef, useState } from "react";
import { awardXP } from "../../platform/arcadeProfile";
import GameShell from "../../components/GameShell";
import "./PrecisionGrid.css"
import { useAuth } from "../../platform/AuthContext";
import { recordGameSession } from "../../platform/gameService";

const GRID_SIZE = 4;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;
const GAME_DURATION = 20; // seconds
const BASE_INTERVAL = 900; // ms
const MIN_INTERVAL = 250;

type GameState = "idle" | "countdown" | "playing" | "finished";

export default function PrecisionGrid() {
    const [gameState, setGameState] = useState<GameState>("idle");
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [intervalSpeed, setIntervalSpeed] = useState(BASE_INTERVAL);
    const scoreRef = useRef(0);
    const currentIndexRef = useRef(0);
    const timerRef = useRef<number | null>(null);
    const spawnRef = useRef<number | null>(null);
    const lastSpawnTime = useRef<number>(0);
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const PERFECT_WINDOW = isTouch ? 250 : 300;
    const [lastHit, setLastHit] = useState<number | null>(null);
    const [multiplier, setMultiplier] = useState(1);
    const { token } = useAuth();


    function startGame() {
        setScore(0);
        setCombo(0);
        setTimeLeft(GAME_DURATION);
        setIntervalSpeed(BASE_INTERVAL);
        currentIndexRef.current = 0;
        setActiveIndex(0);
        setGameState("playing");
    }

    function endGame() {
        setGameState("finished");
        setActiveIndex(null);
        console.log("Final score at endGame:", score);
        const xpEarned = Math.floor(scoreRef.current / 10);

        awardXP({
            source: "Precision Grid",
            amount: xpEarned,
            reason: "grid_session",
        });

     recordGameSession(token, "precision-grid", score, xpEarned);

    }

    function nextTile() {
        const next = getNextIndex(currentIndexRef.current);
        currentIndexRef.current = next;
        setActiveIndex(next);
        lastSpawnTime.current = performance.now();
    }


    function getNextIndex(current: number) {
        const row = Math.floor(current / 4);
        const col = current % 4;

        const candidates: number[] = [];

        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                const index = r * 4 + c;

                const distance =
                    Math.abs(r - row) + Math.abs(c - col);

                if (distance > 0 && distance <= 2) {
                    candidates.push(index);
                }
            }
        }

        return candidates[Math.floor(Math.random() * candidates.length)];
    }
    function handleTilePress(index: number) {
        if (gameState !== "playing") return;

        if (index === activeIndex) {
            const newCombo = combo + 1;
            const comboBonus = Math.floor(newCombo * 0.5);
            const reaction = performance.now() - lastSpawnTime.current;

            setLastHit(index);

            setTimeout(() => {
                setLastHit(null);
            }, 100);
            if (reaction < PERFECT_WINDOW) {
                setScore(s => s + 5); // perfect bonus
            }
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
            let newMultiplier = 1;

            if (newCombo >= 25) newMultiplier = 4;
            else if (newCombo >= 12) newMultiplier = 3;
            else if (newCombo >= 5) newMultiplier = 2;

            setMultiplier(newMultiplier);

            setScore(s => s + (10 * newMultiplier));
            setCombo(newCombo);

            // increase speed gradually
            setIntervalSpeed((prev) =>
                Math.max(MIN_INTERVAL, prev * 0.97)
            );



            nextTile();
        } else {
            setMultiplier(1);
            setCombo(0);
            setScore((s) => {
                const newScore = Math.max(0, s - 5);
                scoreRef.current = newScore;
                return newScore;
            });
        }
    }

    // Timer
    useEffect(() => {
        if (gameState !== "playing") return;

        timerRef.current = window.setInterval(() => {
            setTimeLeft((t) => t - 1);
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameState]);

    // Speed-based spawn loop
    useEffect(() => {
        if (gameState !== "playing") return;

        spawnRef.current = window.setInterval(() => {
            nextTile();
            setCombo(0); // if they fail to hit in time
        }, intervalSpeed);

        return () => {
            if (spawnRef.current) clearInterval(spawnRef.current);
        };
    }, [gameState, intervalSpeed]);

    useEffect(() => {
        if (gameState === "playing" && timeLeft <= 0) {
            endGame();
        }
    }, [timeLeft, gameState]);

    return (
        <GameShell
            title="Precision Grid"
            subtitle="Tap the glowing tile. Speed increases."
            status={`Score: ${score}`}
            subStatus={`Combo: ${combo} | x${multiplier} | Time: ${timeLeft}s`}
        >
            {gameState === "idle" && (
                <button onClick={startGame}>Start</button>
            )}

            {gameState === "finished" && (
                <div>
                    <h2>Final Score: {score}</h2>
                    <button onClick={startGame}>Play Again</button>
                </div>
            )}

            {combo >= 10 && (
                <div className="combo-burst">
                    Combo x{combo}
                </div>
            )}
            <div className="grid">
                {Array.from({ length: TOTAL_TILES }).map((_, i) => (
                    <div
                        key={i}
                        className={`tile
                                     ${i === activeIndex ? "active" : ""} 
                                     ${i === lastHit ? "hit" : ""}
                                    `}
                        onPointerDown={() => handleTilePress(i)}
                    />
                ))}
            </div>
        </GameShell>
    );
}
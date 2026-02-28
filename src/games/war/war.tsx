import { useState } from "react";
import GameShell from "../../components/GameShell";
import { awardXP } from "../../platform/arcadeProfile";
import { getGameConfig } from "../../platform/gameRegistry";
import "./war.css";
import { useAuth } from "../../platform/AuthContext";
import { recordGameSession } from "../../platform/gameService";
const GAME_ID = "war";

type Card = {
  Value: string;
  Suit: string;
  numVal: number;
};

const suits = ["Spades", "Diamonds", "Clubs", "Hearts"];

function suitToSymbol(suit: string) {
  switch (suit) {
    case "Spades":
      return "♠";
    case "Clubs":
      return "♣";
    case "Hearts":
      return "♥";
    case "Diamonds":
      return "♦";
    default:
      return suit;
  }
}

function isRedSuit(suit: string) {
  return suit === "Hearts" || suit === "Diamonds";
}


const values = [
  { name: "2", value: 2 },
  { name: "3", value: 3 },
  { name: "4", value: 4 },
  { name: "5", value: 5 },
  { name: "6", value: 6 },
  { name: "7", value: 7 },
  { name: "8", value: 8 },
  { name: "9", value: 9 },
  { name: "10", value: 10 },
  { name: "Jack", value: 11 },
  { name: "Queen", value: 12 },
  { name: "King", value: 13 },
  { name: "Ace", value: 14 },
];

function getDeck(): Card[] {
  const deck: Card[] = [];
  for (let s of suits) {
    for (let v of values) {
      deck.push({ Value: v.name, Suit: s, numVal: v.value });
    }
  }
  return deck;
}

function shuffle(deck: Card[]): Card[] {
  const d = [...deck];
  for (let i = 0; i < 1000; i++) {
    const a = Math.floor(Math.random() * d.length);
    const b = Math.floor(Math.random() * d.length);
    [d[a], d[b]] = [d[b], d[a]];
  }
  return d;
}

export default function War() {
  const config = getGameConfig(GAME_ID);
  if (!config) throw new Error("Game config missing");

  const { token } = useAuth();
  const [player, setPlayer] = useState<Card[]>([]);
  const [opp, setOpp] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [oppPoints, setOppPoints] = useState(0);
  const [revealedPlayerCard, setRevealedPlayerCard] = useState<Card | null>(null);
  const [revealedOppCard, setRevealedOppCard] = useState<Card | null>(null);
  const [status, setStatus] = useState("Press Start to play.");
  const [subStatus, setSubStatus] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [tieCarry, setTieCarry] = useState(0);

  function startGame() {
    const deck = shuffle(getDeck());
    const p = deck.filter((_, i) => i % 2);
    const o = deck.filter((_, i) => !(i % 2));

    setPlayer(p);
    setOpp(o);
    setIndex(0);
    setPlayerPoints(0);
    setOppPoints(0);
    setTieCarry(0);
    setGameOver(false);

    setStatus("Game started. Flip a card.");
    setSubStatus("");
  }

  async function flip() {
    if (gameOver || isRevealing) return;
    if (index >= player.length) return finishGame();

    setIsRevealing(true);

    const pCard = player[index];
    const oCard = opp[index];

    // Phase 1 — Reveal player card
    setRevealedPlayerCard(pCard);
    setRevealedOppCard(null);

    setStatus(`You flipped ${pCard.Value} of ${pCard.Suit}...`);
    setSubStatus("");

    await new Promise((r) => setTimeout(r, 600));

    // Phase 2 — Reveal opponent
    setRevealedOppCard(oCard);
    setSubStatus(
      `Opponent flipped ${oCard.Value} of ${oCard.Suit}...`
    );

    await new Promise((r) => setTimeout(r, 700));

    // Phase 3 — Calculate outcome
    const roundValue = pCard.numVal + oCard.numVal + tieCarry;
    const playerWon = pCard.numVal > oCard.numVal;
    if (pCard.numVal === oCard.numVal) {
      setStatus("WAR! It's a tie.");
      setTieCarry(roundValue);
    } else if (pCard.numVal > oCard.numVal) {

      setStatus("You WON the round!");
      setPlayerPoints((prev) => prev + roundValue);
      setTieCarry(0);
      const xpEarned = playerWon ? 3 : 0;


      awardXP({
        amount: xpEarned,
        source: "War",
        multiplier: config?.multiplier,
        reason: "War: Round Win",
      });


    } else {
      setStatus("You LOST the round.");
      setOppPoints((prev) => prev + roundValue);
      setTieCarry(0);
    }

    setIndex((prev) => prev + 1);
    await new Promise((r) => setTimeout(r, 800));

    setIsFading(true);

    await new Promise((r) => setTimeout(r, 300));

    setRevealedPlayerCard(null);
    setRevealedOppCard(null);
    setIsFading(false);

    setIsRevealing(false);
    setIsRevealing(false);
  }

  function finishGame() {
  setGameOver(true);

  let xpEarned = 0;

  if (playerPoints > oppPoints) {
    setStatus(`You Won the War ${playerPoints} to ${oppPoints}!`);
    xpEarned = 20;

    awardXP({
      source: "war",
      amount: xpEarned,
      multiplier: config?.multiplier,
      reason: "War: Game Win",
    });

  } else if (playerPoints < oppPoints) {
    setStatus(`You Lost the War ${playerPoints} to ${oppPoints}.`);

    // Optional participation XP
    xpEarned = 2;

    awardXP({
      source: "war",
      amount: xpEarned,
      multiplier: config?.multiplier,
      reason: "War: Game Loss",
    });

  } else {
    setStatus("It's a draw!");

    xpEarned = 5;

    awardXP({
      source: "war",
      amount: xpEarned,
      multiplier: config?.multiplier,
      reason: "War: Draw",
    });
  }

  // 👇 Record the session no matter what
  recordGameSession(
    token,
    "war",
    playerPoints,  // score
    xpEarned
  );

  setSubStatus("Press Start to play again.");
}
  const sidebar = (
    <>
      <h2>Scoreboard</h2>
      <div className="stat">
        Player Points:
        <strong>{playerPoints}</strong>
      </div>
      <div className="stat">
        Opponent Points:
        <strong>{oppPoints}</strong>
      </div>
      <div className="stat">
        Cards Played:
        <strong>{index} / {player.length}</strong>
      </div>
    </>
  );

  return (
    <GameShell
      eyebrow="Card Duel"
      title="War"
      subtitle="Higher card wins. Ties carry over."
      status={status}
      subStatus={subStatus}
      sidebar={sidebar}
    >

      <div className={`war-cards ${isFading ? "fade-out" : ""}`}>
        <div
          className={`war-card ${revealedPlayerCard && isRedSuit(revealedPlayerCard.Suit)
            ? "red"
            : ""
            }`}
        >
          {revealedPlayerCard ? (
            <>
              <div className="card-corner top">
                {revealedPlayerCard.Value}
                <span>{suitToSymbol(revealedPlayerCard.Suit)}</span>
              </div>

              <div className="card-center">
                {suitToSymbol(revealedPlayerCard.Suit)}
              </div>

              <div className="card-corner bottom">
                {revealedPlayerCard.Value}
                <span>{suitToSymbol(revealedPlayerCard.Suit)}</span>
              </div>
            </>
          ) : (
            "?"
          )}
        </div>

        <div
          className={`war-card ${revealedOppCard && isRedSuit(revealedOppCard.Suit)
            ? "red"
            : ""
            }`}
        >
          {revealedOppCard ? (
            <>
              <div className="card-corner top">
                {revealedOppCard.Value}
                <span>{suitToSymbol(revealedOppCard.Suit)}</span>
              </div>

              <div className="card-center">
                {suitToSymbol(revealedOppCard.Suit)}
              </div>

              <div className="card-corner bottom">
                {revealedOppCard.Value}
                <span>{suitToSymbol(revealedOppCard.Suit)}</span>
              </div>
            </>
          ) : (
            "?"
          )}
        </div>
      </div>


      <div className="button-container" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <button onClick={startGame}>Start</button>
        <button
          onClick={flip}
          disabled={gameOver || isRevealing || player.length === 0}
        >
          {isRevealing ? "Revealing..." : "Flip Card"}
        </button>
      </div>



    </GameShell>
  );
}
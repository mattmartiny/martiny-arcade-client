import React, { useState } from "react";

export function CasinoModal({ game }: { game: any }) {
  const [playerChoice, setPlayerChoice] = useState<string>("1");
  const [betAmount, setBetAmount] = useState<number>(0);
  const [result, setResult] = useState<string>("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = game.playGame(playerChoice, betAmount);
    setResult(msg);
  }

  return (
    <div className="shopWindow">
      <div onClick={game.toggleCasino} style={{ cursor: "pointer", float: "right", width: 10, margin: "3px 10px" }}>
        X
      </div>

      {game.myPlayer.stats.gold} in Gold

      <form onSubmit={submit} style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
        Pick a number:<br />&nbsp;

        {[1,2,3].map(n => (
          <span key={n}>
            <input type="radio" name="choice" value={String(n)} checked={playerChoice===String(n)} onChange={() => setPlayerChoice(String(n))} />
            &nbsp;<label>{n}</label>&nbsp;
          </span>
        ))}

        <br /><br />
        <label>Bet amount: &nbsp;</label>
        <input type="number" value={betAmount} min={0} step={1} onChange={(e) => setBetAmount(parseInt(e.target.value || "0", 10))} />
        <br /><br />

        <button type="submit" disabled={game.myPlayer.stats.gold < betAmount}>Submit</button>
      </form>

      <div id="result">{result}</div>
    </div>
  );
}
import { awardXP, recordGameResult } from "../../platform/arcadeProfile";
import { getGameConfig } from "../../platform/gameRegistry";

type Cleanup = () => void;

export function initCoinFlip(root: HTMLElement): Cleanup {
  const GAME_ID = "coin-flip";
  const config = getGameConfig(GAME_ID);

  if (!config) {
    throw new Error("Game config not found");
  }

  const pWinEXP = 3;
  const pLossExp = 1;

  let playerWins = 0;
  let playerLosses = 0;

  const byKey = (key: string) =>
    root.querySelector<HTMLElement>(`[data-cf="${key}"]`);

  const pWins = byKey("wins");
  const pLossesEl = byKey("losses");
  const pChoice = byKey("player");
  const cChoice = byKey("computer");
  const text = byKey("text");
  const text2 = byKey("text2");

  const selection = root.querySelector<HTMLElement>(`[data-cf="selection"]`);
  const buttons = selection
    ? Array.from(selection.querySelectorAll<HTMLButtonElement>("button[data-choice]"))
    : [];

  const options = ["Heads", "Tails"];

  if (!text || !buttons.length || !pChoice || !cChoice) {
    return () => {};
  }

  text.textContent = "Call it and tap to flip.";

  const handlers: Array<{
    btn: HTMLButtonElement;
    fn: (e: MouseEvent) => void;
  }> = [];

  const updateNumbers = () => {
    if (pWins) pWins.textContent = String(playerWins);
    if (pLossesEl) pLossesEl.textContent = String(playerLosses);
  };

  const onClick = (btn: HTMLButtonElement) => (e: MouseEvent) => {
    e.preventDefault();

    const playerPick = btn.getAttribute("data-choice");
    if (!playerPick) return;

    pChoice.className = `cf-player ${playerPick}`;

    const result = options[Math.floor(Math.random() * 2)];
    cChoice.className = `cf-computer ${result}`;

    let xpEarned = 0;

    if (playerPick === result) {
      text.innerHTML = `You picked ${playerPick}. It landed on ${result}. Good job!`;
      playerWins++;
      xpEarned = pWinEXP;
      recordGameResult(true);
    } else {
      text.innerHTML = `You picked ${playerPick}. It landed on ${result}. Better luck next time.`;
      playerLosses++;
      recordGameResult(false);

      if (config.allowLossPenalty) {
        xpEarned = -pLossExp;
      }
    }

    if (xpEarned !== 0) {
      awardXP({
        gameId: GAME_ID,
      amount: xpEarned,
        multiplier: config.multiplier ?? 1,
        reason: xpEarned > 0 ? "Coin Flip Win" : "Coin Flip Loss"
      });
    }

    updateNumbers();
  };

  for (const btn of buttons) {
    const fn = onClick(btn);
    btn.addEventListener("click", fn);
    handlers.push({ btn, fn });
  }

  updateNumbers();

  return () => {
    for (const { btn, fn } of handlers) {
      btn.removeEventListener("click", fn);
    }
  };
}
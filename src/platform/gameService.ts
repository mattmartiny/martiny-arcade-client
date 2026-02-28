export async function recordGameSession(
  token: string | null,
  gameKey: string,
  score: number,
  xpEarned: number
) {
  if (!token) return;

  try {
    await fetch("/api/game/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        gameKey,
        score,
        xpEarned,
      }),
    });
  } catch (err) {
    console.error("Failed to record game session:", err);
  }
}
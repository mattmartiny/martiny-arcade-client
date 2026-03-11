export async function recordGameSession(
  token: string | null,
  gameKey: string,
  score: number,
  xpEarned: number
) {
  if (!token) return;

  const res = await fetch("/api/game/session", {
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

  if (!res.ok) return;

  const data = await res.json();

  // 🚀 Dispatch achievement event
  if (data?.unlockedAchievements?.length) {
    window.dispatchEvent(
      new CustomEvent("achievementUnlocked", {
        detail: data.unlockedAchievements,
      })
    );
  }
}
export async function submitGameSession(
    token: string,
    score: number,
    xpEarned: number
) {
    const res = await fetch("/api/gamesession", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            gameKey: "homeless-hero",
            score,
            xpEarned,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed to submit score");
    }

    return res.json();
}
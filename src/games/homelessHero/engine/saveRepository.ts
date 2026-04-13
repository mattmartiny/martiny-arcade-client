import type { SaveGameDTO } from "../types/saveTypes"

type LoadGameResponse = {
    data: SaveGameDTO;
    battleMessage: string | null;
};

export async function loadGame(token: string): Promise<LoadGameResponse | null> {
    const res = await fetch("/api/save/homeless-hero", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    const text = await res.text();

    if (!text) return null;

    return JSON.parse(text);
}

export async function saveGame(
    payload: { data: SaveGameDTO; battleMessage: string },
    token: string
) {
    const res = await fetch("/api/save/homeless-hero", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error("Save failed");
    }
}
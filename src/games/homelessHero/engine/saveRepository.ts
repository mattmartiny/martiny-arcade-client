import type { SaveGameDTO } from "../types/saveTypes"



export async function loadGame(token: string): Promise<SaveGameDTO | null> {
    const res = await fetch("/api/save/homeless-hero", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    const text = await res.text();

    if (!text) return null; // ✅ handle empty response

    return JSON.parse(text);
}
export async function saveGame(data: SaveGameDTO, token: string) {
    const res = await fetch("/api/save/homeless-hero", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Save failed");
    }
}
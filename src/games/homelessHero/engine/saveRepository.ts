import type { SaveGameDTO } from "../types/saveTypes"

type LoadGameResponse = {
    data: SaveGameDTO | null;
    battleMessage: string | null;
    backupData: SaveGameDTO | null;
    backupBattleMessage: string | null;
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

    return JSON.parse(text) as LoadGameResponse;
}

export async function saveGame(
    payload: { data: SaveGameDTO; battleMessage: string, clientUpdatedAt: string },
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


export async function recoverGame(token: string): Promise<boolean> {
    const res = await fetch("/api/save/homeless-hero/recover", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.ok;
}
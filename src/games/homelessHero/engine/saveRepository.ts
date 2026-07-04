import type { SaveGameDTO } from "../types/saveTypes"

type LoadGameResponse = {
    data: SaveGameDTO | null;
    battleMessage: string | null;
    backupData: SaveGameDTO | null;
    backupBattleMessage: string | null;
    updatedAt: string | null;
};

type SaveGameResponse = {
    updatedAt: string;
};

type RecoverGameResponse = {
    updatedAt: string;
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
    payload: { data: SaveGameDTO; battleMessage: string; lastKnownUpdatedAt: string | null },
    token: string
): Promise<SaveGameResponse> {
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

    return res.json() as Promise<SaveGameResponse>;
}


export async function recoverGame(token: string): Promise<RecoverGameResponse | null> {
    const res = await fetch("/api/save/homeless-hero/recover", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    return res.json() as Promise<RecoverGameResponse>;
}

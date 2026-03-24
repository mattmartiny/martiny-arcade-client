import type { SaveGameDTO } from "../types/saveTypes";

export async function loadGame(): Promise<SaveGameDTO | null> {
  try {
    const token = localStorage.getItem("auth_token");

    const res = await fetch("/api/save", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("No save");

    return await res.json();
  } catch (err) {
    console.warn("Loading from backup");
    const backup = localStorage.getItem("hh_save_backup");
    return backup ? JSON.parse(backup) : null;
  }
}
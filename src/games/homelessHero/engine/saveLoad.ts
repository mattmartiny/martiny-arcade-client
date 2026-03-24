// import type { SaveGameDTO } from "../types/saveTypes"
// import { useHomelessHero } from "./useHomelessHero"

// const SAVE_KEY = "homelessHeroSave";

// const g = useHomelessHero()
// export function saveGame(data: SaveGameDTO) {
//   localStorage.setItem(SAVE_KEY, JSON.stringify(data));
// }

// export function loadGame(): SaveGameDTO | null {
//   const raw = localStorage.getItem(SAVE_KEY);
//   if (!raw) return null;

//   try {
//     const data = JSON.parse(raw) as SaveGameDTO;

//     if (!data.version) {
//       console.warn("Old save detected");
//       return null;
//     }

//     return data;
//   } catch (err) {
//     console.error("Failed to parse save data", err);
//     return null;
//   }
// }
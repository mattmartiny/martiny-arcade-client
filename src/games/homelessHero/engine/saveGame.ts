// import type { SaveGameDTO } from "../types/saveTypes";

// export async function saveGame(data: SaveGameDTO) {
//   try {
//     const token = localStorage.getItem("auth_token"); // or however you store it

//     await fetch("/api/save", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });

//     // optional fallback
//     localStorage.setItem("hh_save_backup", JSON.stringify(data));
//   } catch (err) {
//     console.error("SAVE FAILED - using local backup", err);
//     localStorage.setItem("hh_save_backup", JSON.stringify(data));
//   }
// }
import { dataFor } from "../content/data";
import type { Location } from "../types/locations";

/*
Utility: find location by id
*/
export function getLocationById(id?: number): Location | undefined {
  if (!id) return undefined;
  return dataFor.Locs.find(l => l.id === id);
}

/*
Move player to a location id
*/
export function moveTo(id?: number): Location | null {

  if (!id) return null;

  const loc = dataFor.Locs.find(l => l.id === id);

  return loc ?? null;
}

/*
Move player in a direction (N/E/S/W)
*/
export function movePlayer(
  currentLocation: Location,
  dir: "toTheNorth" | "toTheSouth" | "toTheEast" | "toTheWest"
): Location {

  const id = currentLocation[dir];

  if (!id) return currentLocation;

  const next = getLocationById(id);

  return next ?? currentLocation;
}
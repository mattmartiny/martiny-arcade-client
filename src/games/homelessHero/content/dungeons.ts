import type { dungeon, dungeonRoom, dungeonFloor } from "../types/locations";
import * as l from './locations';
import * as i from './items';

export const neighborsCellar: dungeon = {
  id: 10030,
  name: "Condo Cellar",
  floors: 1,
  insideDungeon: false,
};

export const cellarrm1: dungeonRoom = {
  roomID: '1A1',
  dungeon: neighborsCellar,
  floor: 1,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: true,
  exitLocation: l.neighbors,
};
export const cellarrm2: dungeonRoom = {
  roomID: '2A1',
  dungeon: neighborsCellar,
  floor: 1,
  roomNumber: 2,
  enemyNumber: 2,
  hasEnemy: true,
  hasEntered: false,
  itemRequired: false,
  stairsDown: false,
  stairsUp: false,
  exit: false,
};
export const cellarrm3: dungeonRoom = {
  roomID: '2B1',
  dungeon: neighborsCellar,
  floor: 1,
  roomNumber: 3,
  enemyNumber: 1,
  hasEnemy: true,
  hasEntered: false,
  itemRequired: true,
  stairsDown: false,
  stairsUp: false,
  exit: false,
};
export const cellarfl1: dungeonFloor = {
  dungeon: neighborsCellar,
  floor: 1,
  rooms: 3,
  dungeonRooms: [cellarrm1, cellarrm2, cellarrm3],
};
neighborsCellar.dungeonFloors = [cellarfl1];
cellarrm1.toTheSouth = cellarrm2;
cellarrm2.toTheNorth = cellarrm1;
cellarrm2.toTheEast = cellarrm3;
cellarrm3.toTheWest = cellarrm2;
cellarrm3.itemThatsRequired = { details: i.shoes, quantity: 1 };

//lighthouse dung

export const lighthouseDung: dungeon = {
  id: 10130,
  name: `Lighthouse Inside`,
  floors: 4,
  insideDungeon: false,
};
export const lhrm1: dungeonRoom = {
  roomID: '1A1',
  dungeon: lighthouseDung,
  floor: 1,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: true,
  stairsDown: false,
  exit: true,
  exitLocation: l.lighthouse,
};
export const lhrm2: dungeonRoom = {
  roomID: '1A2',
  dungeon: lighthouseDung,
  floor: 2,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: true,
  stairsDown: true,
  exit: false,
};
export const lhrm3: dungeonRoom = {
  roomID: '1A3',
  dungeon: lighthouseDung,
  floor: 3,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: true,
  stairsDown: true,
  exit: false,
};
export const lhrm3A: dungeonRoom = {
  roomID: '2A3',
  dungeon: lighthouseDung,
  floor: 3,
  roomNumber: 2,
  enemyNumber: 1,
  hasEnemy: true,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const lhrm4: dungeonRoom = {
  roomID: '1A4',
  dungeon: lighthouseDung,
  floor: 4,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: true,
  stairsUp: false,
  stairsDown: true,
  exit: false,
};
export const lhrm4A: dungeonRoom = {
  roomID: '2A4',
  dungeon: lighthouseDung,
  floor: 4,
  roomNumber: 2,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: true,
  exit: true,
  exitLocation: l.lighthouse2,
};

export const lhfl1: dungeonFloor = {
  dungeon: lighthouseDung,
  floor: 1,
  rooms: 1,
  dungeonRooms: [lhrm1],
};
export const lhfl2: dungeonFloor = {
  dungeon: lighthouseDung,
  floor: 2,
  rooms: 1,
  dungeonRooms: [lhrm2],
};
export const lhfl3: dungeonFloor = {
  dungeon: lighthouseDung,
  floor: 3,
  rooms: 2,
  dungeonRooms: [lhrm3, lhrm3A],
};
export const lhfl4: dungeonFloor = {
  dungeon: lighthouseDung,
  floor: 4,
  rooms: 2,
  dungeonRooms: [lhrm4, lhrm4A],
};

lighthouseDung.dungeonFloors = [lhfl1, lhfl2, lhfl3, lhfl4];

lhrm1.toStairsUp = lhrm2;
lhrm2.toStairsDown = lhrm1;
lhrm2.toStairsUp = lhrm3;
lhrm3.toStairsUp = lhrm4;
lhrm3.toTheEast = lhrm3A;
lhrm3A.toTheWest = lhrm3;
lhrm3.toStairsDown = lhrm2;
lhrm4.toStairsDown = lhrm3;
lhrm4.itemThatsRequired = { details: i.lighthouseKey, quantity: 1 };
lhrm4.toTheEast = lhrm4A;
lhrm4A.toTheWest = lhrm4;

export const seasideCave: dungeon = {
  id: 10150,
  name: 'Seaside Cave',
  floors: 1,
  insideDungeon: false,
};

export const ssc1A: dungeonRoom = {
  roomID: '1A1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: true,
  exitLocation: l.rockyOutcrop,
};
export const ssc2A: dungeonRoom = {
  roomID: '2A1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 2,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc3A: dungeonRoom = {
  roomID: '3A1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 3,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc1B: dungeonRoom = {
  roomID: '1B1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 4,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc3B: dungeonRoom = {
  roomID: '3B1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 5,
  enemyNumber: 3,
  hasEnemy: true,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc4B: dungeonRoom = {
  roomID: '4B1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 6,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc1C: dungeonRoom = {
  roomID: '1C1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 7,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc3C: dungeonRoom = {
  roomID: '3C1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 8,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc4C: dungeonRoom = {
  roomID: '4C1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 9,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc5C: dungeonRoom = {
  roomID: '5C1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 10,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc2D: dungeonRoom = {
  roomID: '2D1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 11,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc3D: dungeonRoom = {
  roomID: '3D1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 12,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc5D: dungeonRoom = {
  roomID: '5D1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 13,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc1E: dungeonRoom = {
  roomID: '1E1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 14,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc2E: dungeonRoom = {
  roomID: '2E1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 15,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc3E: dungeonRoom = {
  roomID: '3E1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 16,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc4E: dungeonRoom = {
  roomID: '4E1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 17,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc5E: dungeonRoom = {
  roomID: '5E1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 18,
  enemyNumber: 2,
  hasEnemy: true,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
export const ssc1F: dungeonRoom = {
  roomID: '1F1',
  dungeon: seasideCave,
  floor: 1,
  roomNumber: 19,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: true,
  exitLocation: l.skeeterForest1,
};

export const sscfl1: dungeonFloor = {
  dungeon: seasideCave,
  floor: 1,
  rooms: 19,
  dungeonRooms: [
    ssc1A,
    ssc1B,
    ssc1C,
    ssc1E,
    ssc1F,
    ssc2A,
    ssc2D,
    ssc2E,
    ssc3A,
    ssc3B,
    ssc3C,
    ssc3D,
    ssc3E,
    ssc4B,
    ssc4C,
    ssc4C,
    ssc4E,
    ssc5C,
    ssc5D,
    ssc5E,
  ],
};

seasideCave.dungeonFloors = [sscfl1];
ssc1A.toTheEast = ssc2A;
ssc1A.toTheSouth = ssc1B;
ssc2A.toTheWest = ssc1A;
ssc2A.toTheEast = ssc3A;
ssc3A.toTheWest = ssc2A;
ssc3A.toTheSouth = ssc3B;
ssc1B.toTheNorth = ssc1A;
ssc1B.toTheSouth = ssc1C;
ssc3B.toTheNorth = ssc3A;
ssc3B.toTheEast = ssc4B;
ssc3B.toTheSouth = ssc3C;
ssc4B.toTheWest = ssc3B;
ssc4B.toTheSouth = ssc4C;
ssc1C.toTheNorth = ssc1B;
ssc3C.toTheNorth = ssc3B;
ssc3C.toTheWest = ssc4C;
ssc3C.toTheSouth = ssc3D;
ssc4C.toTheWest = ssc3C;
ssc4C.toTheNorth = ssc4B;
ssc4C.toTheEast = ssc5C;
ssc5C.toTheWest = ssc4C;
ssc5C.toTheSouth = ssc5D;
ssc2D.toTheEast = ssc3D;
ssc2D.toTheSouth = ssc2E;
ssc3D.toTheWest = ssc2D;
ssc3D.toTheNorth = ssc3C;
ssc3D.toTheSouth = ssc3E;
ssc5D.toTheNorth = ssc5C;
ssc5D.toTheSouth = ssc5E;
ssc1E.toTheEast = ssc2E;
ssc1E.toTheSouth = ssc1F;
ssc2E.toTheWest = ssc1E;
ssc2E.toTheNorth = ssc2D;
ssc2E.toTheEast = ssc3E;
ssc3E.toTheWest = ssc2E;
ssc3E.toTheNorth = ssc3D;
ssc3E.toTheEast = ssc4E;
ssc4E.toTheWest = ssc3E;
ssc4E.toTheEast = ssc5E;
ssc5E.toTheEast = ssc4E;
ssc5E.toTheNorth = ssc5D;
ssc1F.toTheNorth = ssc1E;

//casino Backrooms

export const casinodung: dungeon = {
  id: 10250,
  name: 'Casino Back Rooms',
  floors: 4,
  insideDungeon: false,
};

export const cbr1A2: dungeonRoom = {
  roomID: '1A2',
  dungeon: casinodung,
  floor: 2,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: true,
  exitLocation: l.petteyPalace2,
};

export const cbr1B2: dungeonRoom = {
  roomID: '1B2',
  dungeon: casinodung,
  floor: 2,
  roomNumber: 2,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: true,
  exit: false,
};

export const cbr2A2: dungeonRoom = {
  roomID: '2A2',
  dungeon: casinodung,
  floor: 2,
  roomNumber: 3,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: true,
  stairsDown: false,
  exit: false,
};
//bottom floor
export const cbr1A1: dungeonRoom = {
  roomID: '1A2',
  dungeon: casinodung,
  floor: 1,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: true,
  stairsDown: false,
  exit: false,
};

export const cbr2A1: dungeonRoom = {
  roomID: '2A1',
  dungeon: casinodung,
  floor: 1,
  roomNumber: 2,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr3A1: dungeonRoom = {
  roomID: '3A1',
  dungeon: casinodung,
  floor: 1,
  roomNumber: 3,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr3B1: dungeonRoom = {
  roomID: '3B1',
  dungeon: casinodung,
  floor: 1,
  roomNumber: 4,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr3C1: dungeonRoom = {
  roomID: '3C1',
  dungeon: casinodung,
  floor: 1,
  roomNumber: 5,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr2C1: dungeonRoom = {
  roomID: '2C1',
  dungeon: casinodung,
  floor: 1,
  roomNumber: 6,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr4C1: dungeonRoom = {
  roomID: '4C1',
  dungeon: casinodung,
  floor: 1,
  roomNumber: 7,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr4D1: dungeonRoom = {
  roomID: '4D1',
  dungeon: casinodung,
  floor: 1,
  roomNumber: 8,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr5D1: dungeonRoom = {
  roomID: '5D1',
  dungeon: casinodung,
  floor: 1,
  roomNumber: 9,
  enemyNumber: 0,
  hasEnemy: true,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};
//floor 3
export const cbr1A3: dungeonRoom = {
  roomID: '1A3',
  dungeon: casinodung,
  floor: 3,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: true,
  exit: false,
};

export const cbr1B3: dungeonRoom = {
  roomID: '1B3',
  dungeon: casinodung,
  floor: 3,
  roomNumber: 2,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: true,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr1C3: dungeonRoom = {
  roomID: '1C3',
  dungeon: casinodung,
  floor: 3,
  roomNumber: 3,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr2C3: dungeonRoom = {
  roomID: '2C3',
  dungeon: casinodung,
  floor: 3,
  roomNumber: 4,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr3C3: dungeonRoom = {
  roomID: '3C3',
  dungeon: casinodung,
  floor: 3,
  roomNumber: 5,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr3B3: dungeonRoom = {
  roomID: '3B3',
  dungeon: casinodung,
  floor: 3,
  roomNumber: 6,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: true,
  stairsDown: false,
  exit: false,
};

export const cbr2D3: dungeonRoom = {
  roomID: '2D3',
  dungeon: casinodung,
  floor: 3,
  roomNumber: 7,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr2E3: dungeonRoom = {
  roomID: '2E3',
  dungeon: casinodung,
  floor: 3,
  roomNumber: 8,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

export const cbr3E3: dungeonRoom = {
  roomID: '3E3',
  dungeon: casinodung,
  floor: 3,
  roomNumber: 9,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
};

//Floor 4
export const cbr1A4: dungeonRoom = {
  roomID: '1A4',
  dungeon: casinodung,
  floor: 4,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: true,
  exit: false,
};

export const cbr2A4: dungeonRoom = {
  roomID: '2A4',
  dungeon: casinodung,
  floor: 4,
  roomNumber: 2,
  enemyNumber: 1,
  hasEnemy: true,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: true,
  exit: false,
};

export const cbrfl1: dungeonFloor = {
  dungeon: casinodung,
  floor: 1,
  rooms: 9,
  dungeonRooms: [
    cbr1A1,
    cbr2A1,
    cbr3A1,
    cbr3B1,
    cbr2C1,
    cbr3C1,
    cbr4C1,
    cbr4D1,
    cbr5D1,
  ],
};

export const cbrfl2: dungeonFloor = {
  dungeon: casinodung,
  floor: 2,
  rooms: 3,
  dungeonRooms: [cbr1A2, cbr2A2, cbr1B2],
};

export const cbrfl3: dungeonFloor = {
  dungeon: casinodung,
  floor: 3,
  rooms: 9,
  dungeonRooms: [
    cbr1A3,
    cbr1B3,
    cbr1C3,
    cbr2C3,
    cbr3C3,
    cbr3B3,
    cbr2D3,
    cbr2E3,
    cbr3E3,
  ],
};

export const cbrfl4: dungeonFloor = {
  dungeon: casinodung,
  floor: 4,
  rooms: 2,
  dungeonRooms: [cbr1A4, cbr2A4],
};
casinodung.dungeonFloors = [cbrfl2, cbrfl1, cbrfl3, cbrfl4];
cbr1A2.toTheSouth = cbr1B2;
cbr1B2.toTheNorth = cbr1A2;
cbr1A2.toTheEast = cbr2A2;
cbr2A2.toTheWest = cbr1A2;
cbr1B2.toStairsDown = cbr1A1;
cbr1A1.toStairsUp = cbr1B2;
cbr1A1.toTheEast = cbr2A1;
cbr2A1.toTheWest = cbr1A1;
cbr2A1.toTheEast = cbr3A1;
cbr3A1.toTheWest = cbr2A1;
cbr3A1.toTheSouth = cbr3B1;
cbr3B1.toTheNorth = cbr3A1;
cbr3B1.toTheSouth = cbr3C1;
cbr3C1.toTheWest = cbr2C1;
cbr3C1.toTheNorth = cbr3A1;
cbr2C1.toTheEast = cbr3C1;
cbr3C1.toTheEast = cbr4C1;
cbr4C1.toTheWest = cbr3C1;
cbr4C1.toTheSouth = cbr4D1;
cbr4D1.toTheNorth = cbr4C1;
cbr4D1.toTheEast = cbr5D1;
cbr5D1.toTheWest = cbr4D1;
cbr2A2.toStairsUp = cbr1A3;
cbr1A3.toStairsDown = cbr2A2;
cbr1A3.toTheSouth = cbr1B3;
cbr1B3.toTheNorth = cbr1A3;
cbr1B3.itemThatsRequired = { details: i.passCode, quantity: 1 };
cbr1B3.toTheSouth = cbr1C3;
cbr1C3.toTheNorth = cbr1B3;
cbr1C3.toTheEast = cbr2C3;
cbr2C3.toTheWest = cbr1C3;
cbr2C3.toTheEast = cbr3C3;
cbr3C3.toTheWest = cbr2C3;
cbr2C3.toTheSouth = cbr2D3;
cbr2D3.toTheNorth = cbr2C3;
cbr2D3.toTheSouth = cbr2E3;
cbr2E3.toTheNorth = cbr2D3;
cbr2E3.toTheEast = cbr3E3;
cbr3E3.toTheWest = cbr2E3;
cbr3C3.toTheNorth = cbr3B3;
cbr3B3.toTheSouth = cbr3C3;
cbr3B3.toStairsUp = cbr1A4;
cbr1A4.toStairsDown = cbr3B3;
cbr1A4.toTheEast = cbr2A4;
cbr2A4.toTheWest = cbr1A4



export const fratHouseDung: dungeon = {
  id: 10350,
  name: 'Frat House Inside',
  floors: 2,
  insideDungeon: false,
};


export const fh1A1: dungeonRoom = {
  roomID: '1A1',
  dungeon: fratHouseDung,
  floor: 1,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: true,
  exitLocation: l.fratHouse,
};

export const fh1B1: dungeonRoom = {
  roomID: '1B1',
  dungeon: fratHouseDung,
  floor: 1,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: true,
  stairsUp: true,
  stairsDown: false,
  exit: false,
};

export const fhfl1: dungeonFloor = {
  dungeon: neighborsCellar,
  floor: 1,
  rooms: 2,
  dungeonRooms: [fh1A1, fh1B1,],
};

export const fh1A2: dungeonRoom = {
  roomID: '1A2',
  dungeon: fratHouseDung,
  floor: 2,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: false,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: true,
  exit: false,
}

export const fh1B2: dungeonRoom = {
  roomID: '1B2',
  dungeon: fratHouseDung,
  floor: 2,
  roomNumber: 1,
  enemyNumber: 0,
  hasEnemy: true,
  hasEntered: false,
  itemRequired: false,
  stairsUp: false,
  stairsDown: false,
  exit: false,
}

export const fhfl2: dungeonFloor = {
  dungeon: neighborsCellar,
  floor: 1,
  rooms: 2,
  dungeonRooms: [fh1A2, fh1B2,],
};
fratHouseDung.dungeonFloors = [fhfl1, fhfl1]

fh1A1.toTheNorth = fh1B1;
fh1B1.toTheSouth =fh1A1;
fh1B1.itemThatsRequired={details: i.fratKey, quantity: 1},
fh1B1.toStairsUp = fh1A2;
fh1A2.toTheNorth = fh1B2;
fh1B2.toTheSouth = fh1A1;

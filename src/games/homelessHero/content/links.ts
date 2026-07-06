import type { completeDialog } from "../types/player";
import * as l from "./locations";
import * as e from "./enemies";
import * as n from "./npcs"
import * as d from "./dungeons"


export const cristieConvos: completeDialog[] = [
    { NPCDetails: n.Cristie, dialog: n.CristieConvo },
];
export const petteyConvo: completeDialog[] = [
    { NPCDetails: n.PartyPettey, dialog: n.PetteyConvo },
];
export const kennethConvo: completeDialog[] = [
    { NPCDetails: n.Kenneth, dialog: n.KennethConvo },
];
export const WarrenConvo: completeDialog[] = [
    { NPCDetails: n.Warren, dialog: n.Warrenconvo },
];
export const petteyConvo2: completeDialog[] = [
    { NPCDetails: n.PartyPettey2, dialog: n.PetteyConvo2 },
];
export const corConvo: completeDialog[] = [
    { NPCDetails: n.Corvalis, dialog: n.corvConvo },
];

export const infConvo: completeDialog[] = [
    { NPCDetails: n.mobInformant, dialog: n.informConvo },
];


export const laurConv: completeDialog[] = [
{NPCDetails: n.Lauren, dialog: n.LaurenConvo}

]

export const georgeConvo: completeDialog[] = [
    {NPCDetails: n.george, dialog: n.GeorgeConvo}
]

export const kendraConvo: completeDialog[] = [
    {NPCDetails: n.Kendra, dialog: n.KendraConvo}
]   


export const langstonConvo: completeDialog[] = [
    {NPCDetails: n.Langston, dialog: n.LangstonConvo}
]

//-------------------------Locations---------------------
l.home.toTheNorth = 1002;
l.home.toTheEast = 1003;
l.home.toTheWest = 1004;
l.home.toTheSouth = 1005;
l.hussieHouse.toTheNorth = 1001;
l.gasStation.toTheEast = 1001;
l.park.toTheWest = 1006;
l.gasStation.toTheNorth = 1006;
l.gasStation.toTheWest = 1052;
l.busStation2.toTheEast = 1004;
l.busStation2.toTheSouth = 1041;
l.womensShelter.toTheEast = 1002;
l.womensShelter.toTheSouth = 1004;
l.park.toTheSouth = 1001;
l.neighbors.toTheWest = 1001;
l.neighbors.dungeonThatsHere = d.neighborsCellar;
l.neighbors.toTheEast = 1007;
l.upperDocks.toTheWest = 1003;
l.upperDocks.toTheSouth = 1008;
l.lowerDocks.toTheNorth = 1007;
l.lowerDocks.toTheEast = 1009;
l.boat.toTheWest = 1008;
l.boat.toTheSouth = 1010;
l.river.toTheNorth = 1009;
l.river.toTheSouth = 1011;
l.riverBank.toTheNorth = 1009;
l.riverBank.toTheEast = 1012;
l.beach.toTheWest = 1011;
l.beach.toTheEast = 1013;
l.lighthouse.toTheWest = 1012;
l.lighthouse.dungeonThatsHere = d.lighthouseDung;
l.lighthouse2.dungeonThatsHere = d.lighthouseDung;
l.lighthouse2.toTheEast = 1014;
l.coralOutcrop.toTheEast = 1015;
l.coralOutcrop.toTheWest = 1026;
l.rockyOutcrop.toTheWest = 1014;
l.rockyOutcrop.dungeonThatsHere = d.seasideCave;
l.skeeterForest1.dungeonThatsHere = d.seasideCave; ///figure out how to enter from exit then backtrack
l.skeeterForest1.toTheWest = 1017;
l.skeeterForest2.toTheEast = 1016;
l.skeeterForest2.toTheWest = 1018;
l.skeeterCampSite.toTheEast = 1017;
l.skeeterCampSite.toTheSouth = 1019;
l.skeeterForest3.toTheNorth = 1018;
l.skeeterForest3.toTheSouth = 1020;
l.forestLot.toTheNorth = 1019;
l.forestLot.toTheSouth = 1021;
l.stuffleStop.toTheNorth = 1020;
l.stuffleStop.toTheEast = 1022;
l.casinoGate.toTheWest = 1021;
l.casinoGate.toTheEast = 1023;
l.casinoGate.toTheSouth = 1024;
l.petteyPalace.toTheWest = 1022;
l.petteyPalace.toTheEast = 1025;
l.petteyPalace2.toTheWest = 1023;
l.petteyPalace2.dungeonThatsHere = d.casinodung;
l.showStage.toTheNorth = 1022;
l.petteyPalace2.toTheSouth = 1027;
l.mBGate.toTheNorth = 1025;
l.mBGate.toTheSouth = 1028;
l.mBFountain.toTheNorth = 1027;
l.mBFountain.toTheEast = 1029;
l.countryClub.toTheWest = 1028;
l.countryClub.toTheEast = 1030;
l.proShop.toTheWest = 1029;
l.proShop.toTheEast = 1032;
l.proShop.toTheSouth = 1031;
l.pool.toTheWest = 1030;
l.golfCourse.toTheNorth = 1030;
l.golfCourse.toTheSouth = 1033;
l.broBar.toTheNorth = 1031;
l.broBar.toTheEast = 1034;
l.fratHouse.toTheWest = 1033;
l.fratHouse.dungeonThatsHere = d.fratHouseDung;
l.fratHouse.toTheSouth = 1035;
l.calfCreek.toTheNorth = 1034;
l.calfCreek.toTheSouth = 1036;
l.freightYard.toTheNorth = 1035;
l.freightYard.toTheWest= 1037,
l.hoboVillage.toTheEast = 1036,
l.hoboVillage.toTheWest = 1038,
l.shadyStreet.toTheEast = 1037,
l.shadyStreet.toTheSouth = 1039,
l.warehouse.toTheNorth = 1038,
l.warehouse.toTheWest = 1040,
l.factory.toTheEast = 1039,
l.factory.toTheWest = 1041,
l.busStation.toTheNorth = 1052,
l.busStation.toTheSouth = 1042;
l.busStation.toTheEast = 1040;
l.interstateBridge.toTheNorth = 1041;
l.interstateBridge.toTheSouth = 1043;
l.hotDogStand.toTheNorth = 1042;
l.hotDogStand.toTheEast = 1044;
l.memorialGarden.toTheWest = 1043;
l.memorialGarden.toTheSouth = 1045;
l.cementery.toTheNorth = 1044;
l.cementery.toTheEast = 1046;
l.catacombs.toTheWest= 1045;
l.catacombs.dungeonThatsHere = d.catacombsDung;
l.exitCave.dungeonThatsHere = d.catacombsDung;
l.exitCave.toTheEast = 1048;
l.westOakMall.toTheWest = 1047;
l.westOakMall.toTheSouth = 1049;
l.westOakMall.dungeonThatsHere = d.Mall;
l.pasture.toTheNorth = 1048;
l.pasture.toTheEast = 1050;
l.dirtRoad.toTheWest = 1049;
l.dirtRoad.toTheEast = 1051;
l.crashSite.toTheWest = 1050;
l.crashSite.toTheSouth = 1053;
l.CEOManor.toTheNorth = 1051;
l.CEOManor.dungeonThatsHere = d.Mansion
//-------------------------Enemies-----------------
l.neighbors.EnemyHere = Object.freeze([e.burgler]);
l.park.EnemyHere = Object.freeze([e.rat]);
l.hussieHouse.EnemyHere = Object.freeze([e.Pimp]);
d.cellarrm2.EnemyHere = Object.freeze([e.rat]);
d.cellarrm3.EnemyHere = Object.freeze([e.couchTroll]);
d.lhrm3A.EnemyHere = Object.freeze([e.Wyvern]);
l.lowerDocks.EnemyHere = Object.freeze([e.Mobster]);
l.riverBank.EnemyHere = Object.freeze([e.merman]);
l.skeeterCampSite.EnemyHere = Object.freeze([e.skeeter]);
d.ssc5E.EnemyHere = Object.freeze([e.caveGoblin]);
d.ssc3B.EnemyHere = Object.freeze([e.caveGoblin]);
l.forestLot.EnemyHere = Object.freeze([e.lotLizard]);
l.showStage.EnemyHere = Object.freeze([e.joeyJugg]);
d.cbr5D1.EnemyHere = Object.freeze([e.mobHenchman]);
d.cbr2A4.EnemyHere = Object.freeze([e.mobHead]);
l.golfCourse.EnemyHere =Object.freeze([e.yachtBro]);
l.fratHouse.EnemyHere=Object.freeze([e.chad]);
d.fh1B2.EnemyHere=Object.freeze([e.brotherChadwick]);
l.freightYard.EnemyHere=Object.freeze([e.cat]);
l.shadyStreet.EnemyHere=Object.freeze([e.drifter]);
l.hoboVillage.EnemyHere=Object.freeze([e.hobo]);
d.ctb4C1.EnemyHere=Object.freeze([e.mutantRat]);
d.ctb2BB1.EnemyHere=Object.freeze([e.mtntBat]);
l.CEOManor.EnemyHere=Object.freeze([e.mansionGuard]);
d.man7C1.EnemyHere = Object.freeze([e.jonathan])

//------------------ NPC quest Dialog-------------------------

l.womensShelter.NPCHere = n.Cristie;
l.womensShelter.Dialog = cristieConvos;

d.cellarrm1.NPCHere = n.PartyPettey;
d.cellarrm1.Dialog = petteyConvo;

l.upperDocks.NPCHere = n.Kenneth;
l.upperDocks.Dialog = kennethConvo;

l.beach.NPCHere = n.Warren;
l.beach.Dialog = WarrenConvo;

l.casinoGate.NPCHere = n.PartyPettey2;
l.casinoGate.Dialog = petteyConvo2;

l.petteyPalace2.NPCHere = n.Corvalis;
l.petteyPalace2.Dialog = corConvo;

d.cbr2C1.NPCHere = n.mobInformant;
d.cbr2C1.Dialog = infConvo;

l.broBar.NPCHere = n.Lauren;
l.broBar.Dialog = laurConv;

l.cementery.NPCHere = n.george;
l.cementery.Dialog = georgeConvo;

//shopping mall dungeon npcs (quests for ultimate items)
d.mall2A1.NPCHere = n.Kendra;
d.mall2A1.Dialog = kendraConvo;

d.mall3B1.NPCHere = n.Langston;
d.mall3B1.Dialog = langstonConvo;

//-------shop npc----------
l.gasStation.NPCHere = n.Sanjay;
l.stuffleStop.NPCHere =  n.Ryan;
l.proShop.NPCHere = n.Chandler;
l.hotDogStand.NPCHere = n.Diddy



//-----------------regular npc--------------- ----
l.boat.NPCHere = n.steve;
d.lhrm4A.NPCHere = n.wiseGuy;
l.forestLot.NPCHere = n.trucker;
l.mBFountain.NPCHere = n.Charles;
l.calfCreek.NPCHere =  n.Millie;
l.warehouse.NPCHere = n.wiseGuy2;
l.crashSite.NPCHere = n.wiseGuy3;
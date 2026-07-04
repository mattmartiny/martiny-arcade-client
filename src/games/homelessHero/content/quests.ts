import type { quest } from "../types/quest";
import * as i from "./items";

export let beatSomePimps: quest = {
  id: 4000,
  name: 'Big Pimpin',
  description: 'Defeat enough pimps to get 5 pimp chains',
  rewardXP: 60,
  rewardGold: 25,
  questCompletionItem: [{ details: i.pimpChain, quantity: 5 }
  ],
  rewardItem:{details: i.pimpCane, quantity: 3},
  message: "Congrats! You've helped Cristie and got the pimp chains!",
};
export let PAAARTY: quest = {
  id: 4001,
  name: `Let's PAAARTY`,
  description: 'Get the rare Party hat.',
  rewardXP: 105,
  rewardGold: 30,
  questCompletionItem: [
    { details: i.partyHat, quantity: 1 },
  ],
  rewardItem: {details: i.partyHat, quantity:1},
  message: "Congrats! You've gotten the party hat and showed it off!",
};
export let Mobbin: quest = {
  id: 4002,
  name: `Steady Mobbin'`,
  description: 'Retrieve 3 mob suitcases',
  rewardXP: 100,
  rewardGold: 50,
  rewardItem: { details: i.boatKey, quantity: 1 },
  questCompletionItem: [
    { details: i.mobSuitcases, quantity: 3 },
  ],
  message: "You be steady mobbin'",
};

export let wyverntReady: quest = {
  id: 4003,
  name: `Wyvern't You Ready?`,
  description: 'Get a Wyvern Tail',
  rewardXP: 40,
  rewardGold: 60,
  rewardItem: { details: i.lighthouseKey, quantity: 1 },
  questCompletionItem: [
    { details: i.WyvernTail, quantity: 1 },
  ],
  message: 'You were ready',
};

export let mobbin2: quest = {
  id: 4004,
  name: `Steady Mobbin' pt. 2`,
  description: 'Get three poker Chips',
  rewardXP: 85,
  rewardItem: { details: i.casinoKey, quantity: 1 },
  rewardGold: 10,
  questCompletionItem: [
    { details: i.pokerChip, quantity: 3 },
  ],
  message: "Congrats! You've gotten the party hat and showed it off!",
};

export let mobbin3: quest = {
  id: 4005,
  name: 'Mob EndGame',
  description: 'Get 1 letter of resignation from Mob Head',
  rewardXP: 145,
  rewardItem: { details: i.mbKeyCard, quantity: 1 },
  rewardGold: 100,
  questCompletionItem: [
    { details: i.resignationL, quantity: 1 }],
  message: `Congrats, the Mob is no more!`,
};

export let mobbin4: quest = {
  id: 4006,
  name: `Mob Hideout`,
  description: `Get 6 id badges`,
  rewardXP: 50,
  rewardItem: { details: i.passCode, quantity: 1 },
  rewardGold: 10,
  questCompletionItem: [
    { details: i.mobIdBadge, quantity: 6 }
  ],
  message: `Continue through the hideout!`,
};

export let toolshop: quest = {
  id: 4007,
  name: `Toolshop`,
  description: `Get the Beta Document from the frat president!`,
  rewardXP: 60,
  rewardItem: { details: i.creekPass, quantity: 1 },
  rewardGold: 75,
  questCompletionItem: [
    { details: i.betaDocument, quantity: 1 }
  ],
  message: `Go take out the frat!`
}

export let mustardQuest: quest = {
  id: 4008,
  name: `Quest for Mustard`,      
  description: `Get the mustard for Mr. George.`,
  rewardXP: 10,
  rewardGold: 5,
  rewardItem: { details: i.catacombsKey, quantity: 1 },
  questCompletionItem: [
    { details: i.mustard, quantity: 1 }
  ],
  message: `Feel free to enter the catacombs!`
};


export let fancyPantsQuest: quest = {
  id: 4009,
  name: `The Fanciest of Pants`,
  description: `Get every wearable and give to Kendra`,
  rewardXP: 100,
  rewardGold: 100,
  rewardItem: { details: i.fancyPants, quantity: 1 },
  questCompletionItem: [
    { details: i.fancyPants, quantity: 1 }, { details: i.SteelToeBoots, quantity: 1 }, { details: i.gangstaHat, quantity: 1 }, { details: i.merFlippers, quantity: 1 }, { details: i.partyHat, quantity: 1 }, { details:i.trenchCoat, quantity: 1 }, { details:i.purpleDong, quantity: 1 }, { details:i.shoes, quantity: 1 }
  ],
  message: `Congrats! You've gotten the ultimate wearable!`
};

export const quests: quest[] = [
  beatSomePimps,
  PAAARTY,
  Mobbin,
  wyverntReady,
  mobbin2,
  mobbin3,
  mobbin4,
  toolshop,
  mustardQuest,
  fancyPantsQuest,



] 
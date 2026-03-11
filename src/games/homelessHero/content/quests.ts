import type { quest } from "../types/quest";
import * as i from "./items";

export let beatSomePimps: quest = {
    id: 4000,
    name: 'Big Pimpin',
    description: 'Defeat enough pimps to get 5 pimp canes',
    rewardXP: 60,
    rewardGold: 25,
    questCompletionItem: [{ details: i.pimpCane, quantity: 5 }
    ],
    message: "Congrats! You've helped Cristie and gotten the pimp canes!",
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

  export let mob4: quest = {
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
    id:4007,
    name: `Toolshop`,
    description:`Get 4 roofies`,
    rewardXP:60,
    rewardItem:{details: i.KeggerCard, quantity :1},
    rewardGold: 15,
    questCompletionItem: [
      {details: i.roofies, quantity: 4}
    ],
    message: `Go take out the Chads!`

  }
import type { EnemyTemplate } from "../types/enemy";
import * as i from "./items"
 ////////////--------------------------------------EnemyTemplate----------------------------------------

  export const burgler: EnemyTemplate = Object.freeze({
    id: 2001,
    name: 'Burgler',
    description: 'Steals stuff',
    imgPath: 'burgler',
    maxHp: 5,
    attack: 2,
    defense: 0,
    speed: 1,
    rewardXP: 2,
    rewardGold: 5,
    lootTable: [
        { details: i.stick, chance: 700, isDefaultItem: true },
        { details: i.sodaPop, chance: 200, isDefaultItem: false },
    ]
  });

  export const rat: EnemyTemplate = Object.freeze({
    id: 2002,
    name: 'Rat',
    description: 'Bigger than a Mouse',
    imgPath: 'rat',
    fluctuating: false,
    maxHp: 3,
    attack: 3,
    defense: 0,
    speed: 4,
    rewardXP: 3,
    rewardGold: 2,
    lootTable: [
    { details: i.shoes, chance: 375, isDefaultItem: true },
    { details: i.ratTail, chance: 400, isDefaultItem: false },
]
  });
  export const Pimp: EnemyTemplate = Object.freeze({
    id: 2003,
    name: 'Pimp',
    description: 'Pimpin',
    imgPath: 'pimp',
    fluctuating: false,
    maxHp: 10,
    attack: 3,
    defense: 1,
    speed: 5,
    rewardXP: 10,
    rewardGold: 10,
lootTable : [
    { details: i.pimpCane, chance: 500, isDefaultItem: true },
    { details: i.wdSteak, chance: 200, isDefaultItem: false },
]
  });
  export const couchTroll: EnemyTemplate = Object.freeze({
    id: 2004,
    name: 'Couch Troll',
    description: 'troll on a couch',
    imgPath: 'couchTroll',
    fluctuating: false,
    maxHp: 16,
    attack: 4,
    defense: 5,
    speed: 3,
    rewardXP: 13,
    rewardGold: 8,

    
  lootTable :  [
        { details: i.sodaPop, chance: 620, isDefaultItem: true },
        { details: i.partyHat, chance: 80, isDefaultItem: false },
    ]
  });
  export const Mobster: EnemyTemplate = Object.freeze({
    id: 2005,
    name: 'Mobster',
    description: 'He be Mobbin',
    imgPath: 'mobster',
    fluctuating: false,
    maxHp: 17,
    attack: 7,
    defense: 5,
    speed: 6,
    rewardXP: 12,
    rewardGold: 13,
    lootTable : [
        { details: i.wdSteak, chance: 350, isDefaultItem: true },
        { details: i.mrSteak, chance: 200, isDefaultItem: false },
        { details: i.mallet, chance: 150, isDefaultItem: false },
        { details: i.mobSuitcases, chance: 280, isDefaultItem: false },
    ]
  });

  export const merman: EnemyTemplate = Object.freeze({
    id: 2006,
    name: 'Merman',
    description: 'Merman plus Merpeople equals mer-society',
    imgPath: 'merman',
    fluctuating: false,
    maxHp: 19,
    attack: 11,
    defense: 6,
    speed: 7,
    rewardXP: 15,
    rewardGold: 17,
    
    lootTable : [
        { details: i.merFlippers, chance: 250, isDefaultItem: false },
        { details: i.merFlesh, chance: 400, isDefaultItem: false },
    ]
    
  });

  export const joeyJugg: EnemyTemplate = Object.freeze({
    id: 2007,
    name: 'Joey Jaggalo',
    description: 'Dumb and annoying. Whoop whoop!',
    imgPath: 'joeyJugg',
    fluctuating: false,
    maxHp: 115,
    attack: 9,
    defense: 11,
    speed: 7,
    rewardXP: 23,
    rewardGold: 12,
    lootTable : [
    { details: i.pokerChip, chance: 750, isDefaultItem: true },
    { details: i.purpleDong, chance: 225, isDefaultItem: false },
]
  });

  export const mobHenchman: EnemyTemplate = Object.freeze({
    id: 2008,
    name: 'Mob Henchman',
    description: 'A medium level mobster',
    imgPath: 'mobHenchman',
    fluctuating: false,
    maxHp: 30,
    attack: 19,
    defense: 16,
    speed: 13,
    rewardXP: 25,
    rewardGold: 14,
    lootTable : [
    { details: i.mobIdBadge, chance: 720, isDefaultItem: true },
]
  });


  export const skeeter: EnemyTemplate = Object.freeze({
    id: 2009,
    name: `Skeeter`,
    description: 'Blood sucking bugger',
    imgPath: 'skeeter',
    fluctuating: false,
    maxHp: 28,
    attack: 16,
    defense: 10,
    speed: 19,
    rewardXP: 19,
    rewardGold: 5,
    lootTable : [
        { details: i.mrSteak, chance: 420, isDefaultItem: true },
    ]
    
  });



  //--------------------------------fluctuating enemies-----------------

  export const Wyvern: EnemyTemplate = Object.freeze({
    id: 2501,
    name: 'Guardian Wyvern',
    description: 'Big Boss boi Wyvern',
    imgPath: 'Wyvern',
    fluctuating: true,
    maxHp: -4,
      attack: 6,
    defense: 2,
    speed: 5,
    rewardXP: 60,
    rewardGold: 25,
    lootTable : [
    { details: i.WyvernTail, chance: 1000, isDefaultItem: true },
]
  });

  export const caveGoblin: EnemyTemplate = Object.freeze({
    id: 2502,
    name: 'Cave Goblin',
    description: 'Enjoys Goblin food',
    imgPath: 'caveGoblin',
    fluctuating: true,
    maxHp: -8,
    attack: 0,
    defense: 1,
    speed: 3,
    rewardXP: 8,
    rewardGold: 8,
    lootTable : [
        { details: i.mrSteak, chance: 320, isDefaultItem: false },
        { details: i.wdSteak, chance: 350, isDefaultItem: false },
        { details: i.Spear, chance: 200, isDefaultItem: false },
    ]
    
  });

  export const lotLizard: EnemyTemplate = Object.freeze({
    id: 2503,
    name: 'Lot Lizard',
    description: 'She does not look like a lizard...',
    imgPath: 'lotLizard',
    fluctuating: true,
    maxHp: -5,

    attack: 4,
    defense: 3,
    speed: 3,
    rewardXP: 12,
    rewardGold: 10,
    
    lootTable : [
        { details: i.purpleDong, chance: 195, isDefaultItem: true },
    ]
  });
  export const mobHead: EnemyTemplate = Object.freeze({
    id: 2504,
    name: 'Mob Head',
    imgPath: 'MobHead',
    description: 'Head of the Mob',
    fluctuating: true,
    maxHp: 15,
    attack: 8,
    defense: 7,
    speed: 3,
    rewardXP: 55,
    rewardGold: 225,
    lootTable : [
    { details: i.resignationL, chance: 999, isDefaultItem: true },
]
  });

  export const yachtBro: EnemyTemplate = Object.freeze({
    id: 2505,
    name: 'Yacht Bro',
    description: `Thinks he's cool`,
    imgPath: '',
    fluctuating: true,
    maxHp: -2,
    attack: 5,
    defense: 2,
    speed: 1,
    rewardXP: 17,
    rewardGold: 20,
  });

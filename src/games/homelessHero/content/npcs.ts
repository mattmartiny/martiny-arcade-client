import type { NPC } from "../types/NPC";
import type { dialogReplies } from "../types/player";
import * as q from "./quests";
import * as d from "./dungeons"


export const Cristie: NPC = {
  id: 5000,
  name: "Christie",

  optionPerson: true,

  initialMessage:
    "Hello traveler, can you get revenge on some of the pimps that beat me up?",

  questGiven: {
    details: q.beatSomePimps,
    hasQuest: false,
    isComplete: false,
  },

  endChatMessage: "Well Shoot, I was hoping you could assist me.",
  inProgressMessage: "I still need 5 Pimp Chains",
  Dialog1:
    "Oh thank you so much! Bring me back 5 Pimp Chains as proof of your exploits.",

  afterMessage: "Thank you so much for your assistance!",
};
export const CristieConvo: dialogReplies = {
  NPCDetails: Cristie,
  playerResponse1: 'Sure I will help you out.',
  playerEndChatResponse: "I'm going to pass.",
};

export const Sanjay: NPC = {
  id: 5001,
  name: 'Sanjay',
  optionPerson: false,
  initialMessage: 'Get some supplies here!',
  endChatMessage: 'End',
};

export const PartyPettey: NPC = {
  id: 5002,
  name: 'Party Pettey',
  optionPerson: true,
  initialMessage:
    'I heard of a very rare item called a party hat, can you beat the couch troll show it to me?',
  questGiven: { details: q.PAAARTY, hasQuest: false, isComplete: false },
  dungeonRoom: d.cellarrm1,
  endChatMessage: 'Well Shoot, I was hoping you could assist me.',
  inProgressMessage: "Still need a party hat.",
  Dialog1: 'Oh thank you so much! Bring me back a party hat',
  afterMessage: "Thank you so much for your assistance! Let's PAAARTY!",
};

export const steve: NPC = {
  id: 5003,
  name: 'Steve the Pirate',
  optionPerson: false,
  initialMessage: "ARRRGH I be takin' ye across the river now.",

  endChatMessage: 'End',
};

export const PetteyConvo: dialogReplies = {
  NPCDetails: PartyPettey,
  playerResponse1: 'Sure I like to party.',
  playerEndChatResponse: "I'm going to pass.",
};

export const Kenneth: NPC = {
  id: 5004,
  name: 'Kenneth',
  optionPerson: true,
  initialMessage: `I'm attempting to take down the mob. Can you help me get started?`,
  questGiven: { details: q.Mobbin, hasQuest: false, isComplete: false },
  inProgressMessage: "I still need 3 mob suitcases.",
  endChatMessage: `The Mob lives on...`,
  Dialog1: `Thank heavens. Bring me back 3 mob suitcases and we'll chat.`,
  afterMessage: `This is a good start. Here is the key to the boat. Thank you.`,
};

export const KennethConvo: dialogReplies = {
  NPCDetails: Kenneth,
  playerResponse1: `Lets do it.`,
  playerEndChatResponse: `The mob is of no concern to me.`,
};

export const Warren: NPC = {
  id: 5005,
  name: 'Warren',
  optionPerson: true,
  initialMessage: `My Wyvern has gotten out of control! Please defeat it.`,
  questGiven: { details: q.wyverntReady, hasQuest: false, isComplete: false },
  inProgressMessage: "I need you defeat my Wyvern and bring me it's tail.",
  endChatMessage: `That's not good`,
  Dialog1: `Thank you so much. Bring me back it's tail and I'll help you continue.`,
  afterMessage: `Here is the key to the lighthouse tower. Talk to the person there.`,
};

export const Warrenconvo: dialogReplies = {
  NPCDetails: Warren,
  playerResponse1: `I got this, how hard could it be?`,
  playerEndChatResponse: `Sounds scary. I'm out. `,
};

export const wiseGuy: NPC = {
  id: 5006,
  name: 'Wise Old Guy',
  optionPerson: false,
  initialMessage:
    'You may not know it, but you have quite the worldly history.  As you continue your adventure you will learn more about yourself. Perhaps you will remember...',
  dungeonRoom: d.lhrm4A,
  endChatMessage: 'End',
};

export const trucker: NPC = {
  id: 5007,
  name: `Bubba the Trucker`,
  optionPerson: false,
  initialMessage:
    'Hey! Ya look familiar, I have seen ye before, but yer was dressed much nicer.  Ya was with some bloke named Josh or Justin, or something with a J.',
  endChatMessage: 'End',
};

export const Ryan: NPC = {
  id: 5008,
  name: `Ryan`,
  optionPerson: false,
  initialMessage: `Yo dawg, see what I got. It's on point.`,
  endChatMessage: `End`,
};

export const PartyPettey2: NPC = {
  id: 5009,
  name: 'Party Pettey',
  optionPerson: true,
  initialMessage:
    'The mob has me blackmailed and taken my casino! I need 3 poker chips to be allowed back in.',
  questGiven: { details: q.mobbin2, hasQuest: false, isComplete: false },
  inProgressMessage: "I still need 3 poker chips to get back into my casino.",
  endChatMessage: 'Doggoneit.',
  Dialog1: 'You might start by defeating Jaggalos at the show next door.',
  afterMessage: 'Thank you. Access the casino and talk to my friend there.',
};

export const PetteyConvo2: dialogReplies = {
  NPCDetails: PartyPettey2,
  playerResponse1: "The Mob again? Let's take them down!",
  playerEndChatResponse: 'uhhh no thanks',
};

export const Corvalis: NPC = {
  id: 5010,
  name: 'Corvalis',
  optionPerson: true,
  initialMessage: `Let's take down the mob. Bring me the Mob Head's letter of resignation`,
  questGiven: { details: q.mobbin3, hasQuest: false, isComplete: false },
  endChatMessage: 'Bad move my guy',
  Dialog1: 'The Mob boss is in the casino back rooms.',
  inProgressMessage: "Defeat the Mob Head and get his letter of resignation for me.",
  afterMessage:
    'The mob is no more! Continue your adventure in Mission Bluffs!',
};
export const corvConvo: dialogReplies = {
  NPCDetails: Corvalis,
  playerResponse1: "Finally! Let's go!",
  playerEndChatResponse: 'Nope. Going to sit this one out.',
};

export const mobInformant: NPC = {
  id: 5011,
  name: `Mob informant`,
  optionPerson: true,
  initialMessage: `In order to continue I need 6 mob id badges`,
  questGiven: { details: q.mobbin4, hasQuest: false, isComplete: false },
  endChatMessage: `guess you'll just wait...`,
  inProgressMessage: "I need 6 mob id badges for you to continue.",
  Dialog1: `defeat mob henchmen to get id badges`,
  afterMessage: `Continue up stairs!`,
};

export const informConvo: dialogReplies = {
  NPCDetails: mobInformant,
  playerResponse1: 'Yessir!',
  playerEndChatResponse: 'No thank you.',
};

export const Charles: NPC = {
  id: 5012,
  name: 'Charles',
  optionPerson: false,
  initialMessage:
    'Welcome back sir.  You look like you have been through quite a bit.  I did not recognize you at first. How did this happen?',
  endChatMessage: 'End',
};


export const Chandler: NPC = {
  id: 5013,
  name: 'Chandler',
  optionPerson: false,
  initialMessage: 'Erhm.... good day sir.  Get some golf supplies here.',
  endChatMessage: 'End',
};

export const Lauren: NPC = {
  id: 5014,
  name: 'Lauren',
  optionPerson: true,
  initialMessage: 'Help me get revenge on the frat boys and the president! Get the item needed to get in the frat house, then defeat the president!',
  questGiven: { details: q.toolshop, hasQuest: false, isComplete: false, },
  endChatMessage: "But... I need you!",
  inProgressMessage: "Get my revenge on the fraternity!",
  Dialog1: "Defeat the yacht boys to get the needed item then continue to the frat house!",
  afterMessage: "Thank you! Much Love! I hope you find what you are looking for. "
}

export const LaurenConvo: dialogReplies = {
  NPCDetails: Lauren,
  playerResponse1: "I'll be your knight.",
  playerEndChatResponse: "Nahhhh"
}


export const Millie: NPC = {
  id: 5015,
  name: 'Millie',
  optionPerson: false,
  initialMessage: "MOOOOOOOOO! (shhh...I'm a bovine, don't judge me)",
  endChatMessage: 'End',
};


export const Diddy: NPC = {
  id: 5016,
  name: 'Diddy',
  optionPerson: false,
  initialMessage: 'Getcha Glizzies... I mean hotdogs',
  endChatMessage: 'End',
};

export const Neff:NPC={
id: 5017,
name: 'Alex the Neffarious',
optionPerson: false,
initialMessage:"You Kain't continue. All knowing MattyBattz hasn't finished the game yet! Come back later. ",
endChatMessage: 'End',
}


export const george:NPC={
  id: 5018,
  name: 'Mr. George',
  optionPerson: true,
  initialMessage:"My hot dog is certainly bland.  I need some mustard.  Can you get me some? Oh the catacombs are closed.",
  questGiven: { details: q.mustardQuest, hasQuest: false, isComplete: false, },
  endChatMessage: "I guess you'll just have to wait.",
  inProgressMessage: "I still need some mustard.",
  Dialog1: "Thank you so much! Bring me back some mustard and I'll be forever grateful.",
  afterMessage: "Thank you so much for your assistance! I can finally enjoy my hot dog! Feel free to explore the catacombs now!",
}
export const GeorgeConvo: dialogReplies = {
  NPCDetails: george,
  playerResponse1: "Sure I will help you out.",
  playerEndChatResponse: "I'm going to pass.",
}

export const wiseGuy2:NPC={
  id: 5019,
  name: 'Wise Old Guy', 
  optionPerson: false,
  initialMessage: "You're getting very close to figuring out who you are.  Keep going, and you'll remember. Just know that you have been betrayed by someone you trusted.  You will find out who it is soon enough.",
  endChatMessage: 'End',
}

export const Kendra:NPC={
  id: 5020,
  name: 'Kendra',
  optionPerson: true,
  initialMessage:"I developed the ultimate wearable! To get my Fancy Pants,  I need a copy of piece of every wearable you can find. It's your choice, but these pants are FANCY!",
  questGiven: { details: q.fancyPantsQuest, hasQuest: false, isComplete: false, },
  endChatMessage: "I guess you'll just have to wait.",
  inProgressMessage: "I still need a copy of every wearable.",
  Dialog1: " Bring me back a copy of every wearable and I'll give you my Fancy Pants.",
  afterMessage: "Enjoy those Fancy Pants! They're fashionable and functional!",
}
export const KendraConvo: dialogReplies = {
  NPCDetails: Kendra,
  playerResponse1: "Sure I will help you out.",
  playerEndChatResponse: "I'm going to pass.",
}

export const Langston:NPC={
  id: 5021,
  name: 'Langston',
  optionPerson: true,
  initialMessage:"I developed the ultimate weapon! To get my Juggernaut Sledge,  I need a piece of every weapon you can find. It's your choice, but this sledge is the ultimate weapon.",
  questGiven: { details: q.ultimateWeapon, hasQuest: false, isComplete: false, },
  endChatMessage: "I guess you'll just have to wait.",
  inProgressMessage: "I still need a piece of every weapon.",
  Dialog1: " Bring me back a piece of every weapon and I'll give you my Juggernaut Sledge.",
  afterMessage: "Enjoy that Juggernaut Sledge! It's powerful and destructive!",
}

export const LangstonConvo: dialogReplies = {
  NPCDetails: Langston,
  playerResponse1: "Sure I will help you out.",
  playerEndChatResponse: "I'm going to pass.",
}

export const wiseGuy3:NPC={
  id: 5022,
  name: 'Wise Old Guy',
  optionPerson: false,
  initialMessage: "Does this look familiar? You were driving the vehicle that hit the tree. You were the leader of a large corporation.  Your 2nd in command cut your brake lines to take over the company. Little did he know, you survived.  Now, take back what's yours.",
  endChatMessage: 'End',
}

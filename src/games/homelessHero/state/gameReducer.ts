import { GameActions } from "./gameActions"
import * as combat from "../engine/combat"
import * as movement from "../engine/movement"
import * as shop from "../engine/shop"
import { useAuth } from "../../../platform/AuthContext";
import { recordGameSession } from "../../../platform/gameService"
import { awardXP } from "../../../platform/arcadeProfile"
import { getGameConfig } from "../../../platform/gameRegistry";
import { rollLoot } from "../engine/loot";
import { resolvePlayerAttack } from "../engine/resolveCombat"
export function gameReducer(state: any, action: any) {

    switch (action.type) {

        case GameActions.MOVE_PLAYER:

            const next =
                movement.moveTo(action.payload)

            if (!next) return state

            return {
                ...state,
                currentLocation: next
            }

        case GameActions.START_COMBAT:

            return {
                ...state,
                activeEnemy: action.payload,
                fightOpen: true
            }

        // case GameActions.PLAYER_ATTACK:

        //     const result =
        //         combat.playerAttack(
        //             state.player,
        //             state.activeEnemy
        //         )

        //     return {

        //         ...state,

        //         activeEnemy: { ...result.enemy },

        //         fightMessage:
        //             state.fightMessage +
        //             `<br/>You hit for ${result.damage}`

        //     }

        case GameActions.BUY_ITEM:

            shop.buyItem(state.player, action.payload)

            return { ...state }

        case GameActions.OPEN_SHOP:

            return { ...state, shopOpen: true }

        case GameActions.CLOSE_SHOP:

            return { ...state, shopOpen: false }

        case GameActions.OPEN_STATUS:

            return { ...state, statusOpen: true }

        case GameActions.CLOSE_STATUS:

            return { ...state, statusOpen: false }


        case GameActions.OPEN_NPC:

            const npc = action.payload

            return {

                ...state,

                npcOpen: true,
                activeNPC: npc,
                npcName: npc.name,
                npcDialog: npc.initialMessage,

                npcOptions: [
                    npc.Dialog1 || "Continue",
                    npc.endChatMessage || "Leave"
                ]

            }


        case GameActions.NPC_ACCEPT:

            const npcA = state.activeNPC

            if (npcA.questGiven) {

             state.player.questList.push({
                    details: npcA.questGiven,
                    hasQuest: true,
                    isComplete: false
                })

            }

            if (npcA.itemGiven) {

                const existing =
                    state.player.inventory.find(
                        (i: any) => i.details.id === npcA.itemGiven.details.id
                    )

                if (existing)
                    existing.quantity++
                else
                    state.player.inventory.push(npcA.itemGiven)

            }

            return {

                ...state,

                npcDialog: npcA.afterMessage || "Thanks."

            }


        case GameActions.NPC_DECLINE:

            return {

                ...state,

                npcOpen: false,
                activeNPC: null

            }


        case GameActions.COMPLETE_QUEST:

            const quest = action.payload

            quest.isComplete = true

            state.player.stats.gold += quest.details.rewardGold || 0
            state.player.stats.experiencePoints += quest.details.rewardXP || 0

            return { ...state }





        case GameActions.ENTER_DUNGEON:

            return {
                ...state,
                currentDungeon: action.payload,
                currentDungeonRoom: action.payload.dungeonFloors[0].dungeonRooms[0]
            }

        case GameActions.EXIT_DUNGEON:

            return {
                ...state,
                currentDungeon: null,
                currentDungeonRoom: null
            }

        case GameActions.PLAYER_ATTACK:

           return resolvePlayerAttack(state)


        case GameActions.END_COMBAT:

            return {
                ...state,
                fightOpen: false,
                activeEnemy: null
            }

        default:

            return state

    }






}


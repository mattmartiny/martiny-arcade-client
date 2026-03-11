import type { player } from "../types/player"
import type { quest } from "../types/quest"
export function addQuest(player: any, quest: any) {

  player.questList.push({
    details: quest,
    hasQuest: true,
    isComplete: false
  })

}

export function checkQuestCompletion(player: player, quest: quest) {

  if (!quest?.questCompletionItem) return false

  for (const item of quest.questCompletionItem) {

    const itemId = item?.details?.id
    const qty = item?.quantity ?? 0

    const inv =
      player.inventory.find(
        (i: any) => i.details?.id === itemId
      )

    if (!inv || inv.quantity < qty)
      return false
  }

  return true
}



export function hasQuest(player:any, questId:number){

  return player.questList.some(
    (    q: { id: number }) => q.id === questId
  )
}

export function isQuestComplete(player:any, questId:number){

  return player.questList.some(
    (    q: { id: number; isComplete: any }) => q.id === questId && q.isComplete
  )
}

export function startQuest(player:any, questId:number){

  return [
    ...player.questList,
    { id: questId, isComplete:false }
  ]
}

export function completeQuest(player:any, questId:number){

  return player.questList.map((q: { id: number }) =>
    q.id === questId
      ? { ...q, isComplete:true }
      : q
  )
}
import type { player } from "../types/player"
import type { quest } from "../types/quest"
import { hasItem } from "./helpers"
export function getQuestState(
  player: player,
  quest: quest
): "NOT_STARTED" | "IN_PROGRESS" | "READY_TO_TURN_IN" | "COMPLETE" {

  const progress =
    player.questList.find(q => q.id === quest.id)

  if (!progress)
    return "NOT_STARTED"



  const needs = quest.questCompletionItem ?? []

  const hasAll =
    needs.length > 0 &&
    needs.every(req =>
      hasItem(player.inventory, req.details.id, req.quantity)
    )

  if (hasAll)
    return "READY_TO_TURN_IN"


  if (progress.isComplete)
    return "COMPLETE"

  if (progress.isComplete === false)
    return "IN_PROGRESS"


  return "NOT_STARTED"
}
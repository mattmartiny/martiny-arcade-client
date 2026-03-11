import { useGame } from "../state/GameContext"
import { GameActions } from "../state/gameActions"

export default function NpcDialog(){

  const {state,dispatch} = useGame()

  if(!state.npcOpen) return null

  const npc = state.activeNPC

  return(

    <div className="dialog">

      <b>{state.npcName}</b>

      <p>{state.npcDialog}</p>

      {npc?.optionPerson && (

        <div className="options">

          <span
            className="accept"
            onClick={() =>
              dispatch({type:GameActions.NPC_ACCEPT})
            }
          >
            Accept
          </span>

          <span
            className="decline"
            onClick={() =>
              dispatch({type:GameActions.NPC_DECLINE})
            }
          >
            Leave
          </span>

        </div>

      )}

    </div>

  )

}
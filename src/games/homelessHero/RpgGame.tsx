import { GameProvider } from "./state/GameContext"
import {WorldView} from "./ui/WorldView"

export default function RpgGame(){

  return (

    <GameProvider >

      <WorldView/>

    </GameProvider>

  )

}
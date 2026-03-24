import { useSearchParams } from "react-router-dom";
import { GameProvider } from "./state/GameContext"
import {WorldView} from "./ui/WorldView"


export default function RpgGame(){
  const [params] = useSearchParams();
    const mode = params.get("mode"); // "continue" | "new"

  return (

    <GameProvider >
        <WorldView mode={mode} />

    </GameProvider>

  )

}
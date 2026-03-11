import { createContext,useContext,useReducer, type ReactNode } from "react"
import { gameReducer } from "./gameReducer"
import { initialGameState } from "./initalState"

type GameContextType = {
  state: typeof initialGameState
  dispatch: React.Dispatch<any>
  hideHeader?: boolean
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({children}: {children: ReactNode}){

  const [state,dispatch] =
    useReducer(gameReducer,initialGameState)
const hideHeader = false;
  return (

    <GameContext.Provider value={{state,dispatch, hideHeader }}>  
      {hideHeader}
      {children}

    </GameContext.Provider>

  )

}

export function useGame() {
  const ctx = useContext(GameContext)

  if (!ctx) {
    throw new Error("useGame must be used inside GameProvider")
  }

  return ctx
}
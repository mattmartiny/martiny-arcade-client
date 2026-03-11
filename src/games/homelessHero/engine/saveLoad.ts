import { useHomelessHero } from "./useHomelessHero"

const g = useHomelessHero()
export function saveGame(game:any){

  localStorage.setItem(
    "myPlayer",
    JSON.stringify(game.player)
  )

  localStorage.setItem(
    "cLocation",
    JSON.stringify(game.currentLocation)
  )

}

export function loadGame(){
   
  const player =
    localStorage.getItem("myPlayer")

  const location =
    localStorage.getItem("cLocation")

  if(!player || !location) return null

  return {
    player:JSON.parse(player),
    location:JSON.parse(location)
  }

}
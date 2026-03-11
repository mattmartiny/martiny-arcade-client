export function gamble(player:any,choice:number,bet:number){

  const result =
    Math.floor(Math.random()*3)+1

  if(result === choice){

    player.stats.gold += bet*2

    return {
      result,
      win:true
    }

  }

  player.stats.gold -= bet

  return {
    result,
    win:false
  }

}
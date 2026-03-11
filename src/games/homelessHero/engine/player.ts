export function levelUp(player:any){

  if(player.stats.experiencePoints < player.stats.level*10)
    return false

  player.stats.level++

  player.stats.baseMaxHp += 5
  player.stats.baseAttack += 2
  player.stats.baseDefense += 2
  player.stats.baseSpeed += 1

  player.stats.currentHp = player.stats.MaxHp

  return true
}
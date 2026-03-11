export function getFluctuatingEnemy(list:any[]){

  const rand =
    Math.floor(Math.random()*list.length)

  const enemy =
    JSON.parse(JSON.stringify(list[rand]))

  enemy.currentHp = enemy.maxHp

  return enemy

}
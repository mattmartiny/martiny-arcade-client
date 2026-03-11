export function buyItem(player:any,item:any){

  if(player.stats.gold < item.price)
    return false

  player.stats.gold -= item.price

  const existing =
    player.inventory.find(
      (i:any)=>i.details.id===item.id
    )

  if(existing)
    existing.quantity++
  else
    player.inventory.push({
      details:item,
      quantity:1
    })

  return true
}
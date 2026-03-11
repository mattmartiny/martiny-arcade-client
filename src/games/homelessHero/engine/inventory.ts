export function heal(player:any,item:any){

  player.stats.currentHp =
    Math.min(
      player.stats.MaxHp,
      player.stats.currentHp +
      item.details.healingStats.amountHealed
    )

  item.quantity--

}
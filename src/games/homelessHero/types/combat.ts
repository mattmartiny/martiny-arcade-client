export type CombatTurn = "player" | "enemy"

export interface CombatState {

  enemy: any

  turn: CombatTurn

  log: string[]

  active: boolean

}
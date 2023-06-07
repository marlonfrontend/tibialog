export interface DamageTakenProps {
  total: number
  byCreatureKind: any
}

export interface TibiaLogProps {
  hitpointsHealed: number
  damageTaken: DamageTakenProps
  experienceGained: number
  loot: any
}

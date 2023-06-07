export interface DamageTakenProps {
  total: number
  byCreatureKind: Record<string, number>
}

export interface TibiaLogProps {
  hitpointsHealed: number
  damageTaken: DamageTakenProps
  experienceGained: number
  loot: Record<string, number>
}

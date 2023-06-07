const calculateHealedYourself = (value: string[]) =>
  value
    .filter((line) => line.includes('healed yourself'))
    .reduce((total, line) => total + parseInt(line.substring(24).replace(' hitpoints.', '')), 0)

const getCreatureName = (line: string) => {
  const words = line.split(' ').filter(Boolean)
  const creatureKind = words[words.length - 1].replace('.', '')

  return creatureKind
}

const calculateYouLose = (value: string[]) =>
  value
    .filter((line) => line.includes('You lose'))
    .reduce(
      (result, line) => {
        const valueTaken = parseInt(line.replace(/\D/g, ''))

        const total = result.total + valueTaken

        const creatureName = line.includes('by') && getCreatureName(line)

        const byCreatureKind = creatureName
          ? {
              ...(result?.byCreatureKind ?? {}),
              [creatureName]: valueTaken
            }
          : result.byCreatureKind

        return {
          total,
          byCreatureKind
        }
      },
      { total: 0, byCreatureKind: {} }
    )

const calculateYouGained = (value: string[]) =>
  value
    .filter((line) => line.includes('You gained'))
    .reduce((total, line) => total + parseInt(line.replace(/\D/g, '')), 0)

const calculateLoot = (value: string[]) => {
  return Object.fromEntries(
    value
      .filter((line) => line.includes('Loot of'))
      .map((line) => {
        const words = line.split(':').filter(Boolean)
        const lootList = words[words.length - 1].replace('.', '').split(',')

        return lootList
          .map((loot) => {
            const name = loot.replace(/\d+/g, '').replace('a ', '').trim()
            return {
              loot,
              name
            }
          })
          .filter((loot) => !loot.name.includes('nothing'))
          .map((item) => {
            const name =
              item.name === 'gold coin' || item.name === 'gold coins' ? 'gold' : item.name
            const quantity = isNaN(parseInt(item.loot.replace(/\D/g, '')))
              ? 1
              : parseInt(item.loot.replace(/\D/g, ''))

            return [name, quantity]
          })
      })
      .flat()
  ) as Record<string, number>
}

export const formatLog = (value: string[]) => {
  value = value.map((line) => line.substring(5))
  const hitpointsHealed = calculateHealedYourself(value)
  const damageTaken = calculateYouLose(value)
  const experienceGained = calculateYouGained(value)
  const loot = calculateLoot(value)

  return {
    hitpointsHealed,
    damageTaken,
    experienceGained,
    loot
  }
}

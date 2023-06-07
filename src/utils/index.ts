export const formatterLog = (value: any, outputData: any) => {
  value.map((line: any) => {
    line = line.substring(5)

    if (line.includes('healed yourself')) {
      outputData.value.hitpointsHealed += parseInt(line.substring(24).replace(' hitpoints.', ''))
    } else if (line.includes('You lose')) {
      const valueTaken = parseInt(line.replace(/\D/g, ''))
      outputData.value.damageTaken.total += valueTaken

      if (line.includes('by')) {
        const words = line.split(' ').filter(Boolean)
        const creatureKind = words[words.length - 1].replace('.', '')

        if (outputData.value.damageTaken.byCreatureKind[creatureKind] == undefined) {
          outputData.value.damageTaken.byCreatureKind[creatureKind] = 0
        }
        outputData.value.damageTaken.byCreatureKind[creatureKind] += valueTaken
      }
    } else if (line.includes('You gained')) {
      outputData.value.experienceGained += parseInt(line.replace(/\D/g, ''))
    } else if (line.includes('Loot of')) {
      const words = line.split(':').filter(Boolean)
      const listLoot = words[words.length - 1].replace('.', '').split(',')

      listLoot.filter((item: any) => {
        let name = item.replace(/\d+/g, '').replace('a ', '').trim()
        if (name == 'nothing') {
          return
        } else if (name == 'gold coin' || name == 'gold coins') {
          name = 'gold'
        }
        const quantity = isNaN(parseInt(item.replace(/\D/g, '')))
          ? 1
          : parseInt(item.replace(/\D/g, ''))

        if (outputData.value.loot[name] == undefined) {
          outputData.value.loot[name] = 0
        }
        outputData.value.loot[name] += quantity
      })
    }
  })
}

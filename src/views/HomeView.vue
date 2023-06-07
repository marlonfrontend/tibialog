<script lang="ts" setup>
import { ref } from 'vue'
import { formatLog } from '../utils'

import { type TibiaLogProps } from '../types'

import AppFileInput from '@/components/AppFileInput.vue'
import AppCard from '@/components/AppCard.vue'

const outputData = ref<TibiaLogProps>({
  hitpointsHealed: 0,
  damageTaken: {
    total: 0,
    byCreatureKind: {}
  },
  experienceGained: 0,
  loot: {}
})

const openFile = (file: any) => {
  const reader = new FileReader()
  reader.readAsText(file)
  reader.onload = () => {
    const text = reader.result as any
    const res = text.split(/\r?\n/)
    console.log(res)
    outputData.value = formatLog(res)
  }
}
</script>

<template>
  <div class="max-w-[700px] mx-auto flex flex-col gap-10 px-4">
    <div class="w-[200px] mx-auto">
      <img src="@/assets/images/logo.png" alt="" />
    </div>

    <app-card title="Selecione um arquivo para consultar resultados">
      <app-file-input @change="openFile" label="Procurar arquivo" />
    </app-card>

    <pre
      class="bg-white bg-opacity-5 text-white border border-opacity-5 border-white overflow-auto max-h-[500px] p-5"
    >
      <code class="text-sm whitespace-pre">
        {{ outputData }}
      </code>
    </pre>
  </div>
</template>

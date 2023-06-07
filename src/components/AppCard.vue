<script lang="ts" setup>
const props = defineProps({
  title: String
})

defineExpose(props)
</script>
<template>
  <div
    class="border py-12 border-opacity-5 border-white flex flex-col w-full items-center justify-center"
  >
    <div class="text-xl text-white mb-5">{{ title }}</div>
    <slot />
  </div>
</template>

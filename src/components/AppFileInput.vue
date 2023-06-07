<script lang="ts" setup>
const emit = defineEmits(['change'])

const props = defineProps({
  label: String
})

const emitFileChange = ($event: any) => {
  emit('change', $event.target.files[0])
}

defineExpose(props)
</script>
<template>
  <label
    class="border text-white py-3 transition-all duration-200 border-opacity-10 hover:bg-white hover:bg-opacity-5 border-white px-5 rounded-lg cursor-pointer hover:border-opacity-5"
  >
    <span class="text-sm leading-normal">{{ label }}</span>
    <input type="file" accept="text/plain" @change="emitFileChange" class="hidden" />
  </label>
</template>

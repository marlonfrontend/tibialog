<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <app-header />
  <main class="py-12">
    <router-view />
  </main>
</template>

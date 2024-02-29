<script setup lang="ts">
import Bus from '@/bus';
import { ref } from 'vue';
const values = ref(0)
Bus.on("scrollTo", (value: number) => {
  values.value = value
})
</script>
<template>
  <div class="about">
    <h1>This is an about page{{ values }}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

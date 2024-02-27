<script setup lang="ts">
import { ref } from "vue"
withDefaults(
  defineProps<{
    arr: number[]
  }>(), { arr: () => [1, 2, 4, 2] }


)
</script>

<template>
  <div class="box">
    <div class="box-pupu" v-for="(item, index) in arr" v-bind:key="item"
      :style="{ backgroundColor: 'rgba(' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ',' + item + ')', height:'20px'}">
      <span style="color: rgb(255, 111, 111);">{{ index }}</span> {{ item }}
    </div>

  </div>
</template>

<style scoped>
.box-pupu {
  height: 100px;
  background-color: rgba(255, 0, 0, 0.596);
}
</style>

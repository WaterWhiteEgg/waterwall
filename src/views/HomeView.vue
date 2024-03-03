<script setup lang="ts">
import { ref, computed, type Ref } from "vue";
import Bus from "../bus"
import { getCurrentInstance } from "vue"
const instance = getCurrentInstance()
const array = ref([[7, 2, 2, 4, 5, 3, 3, 5, 9], [1, 5, 3, 4, 5, 6, 7, 8, 3], [6, 2, 3, 4, 5, 6, 7, 8, 9], [6, 2, 3, 4, 3, 6, 7, 8, 9], [1, 3, 3, 2, 5, 6, 7, 3, 9], [6, 2, 3, 4, 5, 3, 7, 8, 3], [7, 2, 2, 4, 5, 3, 3, 5, 9], [3, 2, 3, 4, 5, 1, 7, 8, 4], [4, 2, 3, 4, 5, 1, 7, 8, 9], [1, 3, 3, 2, 5, 6, 7, 3, 9], [3, 2, 3, 4, 5, 6, 3, 2, 9], [5, 2, 3, 4, 1, 6, 7, 8, 5], [1, 4, 3, 6, 5, 6, 7, 8, 2]])
// 判断index2是否重新循环了一遍，若是返回一个新的随机值
// 全局记录随机值
let colorNumber = 0
const randomColor = computed(() => {
  return (index: number, index2: number) => {

    index === 0 ? colorNumber = Math.floor(Math.random() * 255) : null
    return `rgba(${Math.floor(Math.random() * 255)}, ${colorNumber * 1.5},${colorNumber * 3}, ${Math.pow(0.99, ++index2)})`;
  }

});
// 获取滚动的ref
const out: Ref<HTMLDivElement | undefined> = ref()
// 检测滚动
const scroll = (e: UIEvent) => {
  // console.log(e.target as HTMLDivElement);
  const element = e.target as HTMLDivElement;
  // 发送给兄弟组件
  Bus.emits("scrollTo", element.scrollTop)
  instance?.proxy?.$Bus.emit("scrollTo2", element)
  // console.log(element.scrollHeight - element.scrollTop, element.clientHeight);
  if (element.scrollHeight - element.scrollTop <= element.clientHeight + 1) {
    console.log("触底");

    array.value.forEach(innerArray => {
      innerArray.push(Math.floor(Math.random() * 9) + 1);
    });
  }

}
</script>

<template>
  <div class="out" @scroll="scroll($event)" ref="out">
    <div v-for="(item, index) in array" class="box">
      <div class="box-item" v-for="(item2, index2) in item"
        :style="{ backgroundColor: randomColor(index2, index2), height: `${item2 * 50}px` }">
        <div>
          {{ item2 }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.out {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  overflow-y: scroll;
}

.box {
  display: flex;
  flex-direction: column;
  margin: 0 .5vw;
}

.box-item {
  display: flex;
  width: 100px;
  min-height: 100px;
  margin: 2px 0;
  background-color: black;
}
</style>
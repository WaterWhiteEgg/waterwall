<script setup lang="ts">
import Bus from '@/bus';
import { ref } from 'vue';
import { getCurrentInstance } from "vue"
const instance = getCurrentInstance()
// 响应式代码实现
// 创建代理
const reactive = <T extends object>(target: T): T => {
  // 判断是否是对象
  const isObj = (target: object) => { return target != null && typeof target === "object" }
  // Proxy为了代理处理set/get情况
  return new Proxy(target, {
    get: (target, key, receiver) => {
      // 用于获取对象的属性值,稳定this指向 
      let res = Reflect.get(target, key, receiver) as object
      // 可获取嵌套的数组
      if (isObj(res)) {
        return reactive(res)
      }
      return res
    },
    set: (target, key, newValue, receiver) => {
      // 用于设置对象的属性值,稳定this指向
      let res = Reflect.set(target, key, newValue, receiver)
      trigger(target, key)
      return res

    },

  })
}
// 执行变化
let activeEffect: Function
const effect = (fn: Function) => {
  // 闭包将值拿出去
  const _effect = () => {
    activeEffect = _effect
    fn()
  }
  _effect()
}
// 依赖收集
// 定义数据结构，用来存值，如果没有需要初始化
// 用弱map对象存（键只能是对象 弱引用）
const targetmap = new WeakMap()
const track = <T extends object>(target: T, key: string | symbol) => {
  let depsmap = targetmap.get(target)
  // 如果没有值，则初始化
  if (!depsmap) {
    // 用map对象存（键可以是任意值 ，键值对的顺序与插入顺序一致）
    depsmap = new Map()
    targetmap.set(target, depsmap)
  }
  let deps = depsmap.get(key)
  // 没有就初始化
  if (!deps) {
    // 用Set存 (集合 不允许重复的数组)
    deps = new Set()
    depsmap.set(key, deps)
  }
  // 将函数放入Set里
  deps.add(activeEffect)
}

// 更新值
const trigger = <T extends object>(target: T, key: string | symbol) => {
  try {
    // 获取数据结构的depsmap
    const depsmap = targetmap.get(target)
    // 再获取deps，里面执行函数
    const deps = depsmap.get(key)

    // 取不到报错
    if (!depsmap || !deps) {
      throw new Error("找不到对象")
    }
    // 执行改变的函数
    deps.forEach((effect: Function) => effect())
  } catch (err) {
    console.log(err);

  }
}

// 绑定
const testObj = reactive({
  name: 16,
  age: "zc"
})
effect(() => {

  console.log(document.querySelector("#app"));
  // document.querySelector("#app")!.textContent = `${testObj.age} +${testObj.name}`
})
const values = ref(0)
Bus.on("scrollTo", (value: number) => {
  values.value = value
})
setTimeout(() => {
  testObj.name = 18
}, 2000)


instance?.proxy?.$Bus.on("scrollTo2", (element) => {
  console.log(element);

}
);
</script>
<template>
  <div class="cc">
    <h1 class="a">{{ }}This is an about page</h1>
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

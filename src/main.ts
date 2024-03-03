import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import mitt from "mitt"

import App from './App.vue'
import router from './router'

const app = createApp(App)
const emitter = mitt()

// 对名为 'vue' 的模块进行声明
declare module 'vue'{
    export interface ComponentCustomProperties{
        $Bus:typeof emitter

    }
}
app.config.globalProperties.$Bus = emitter
app.use(createPinia())
app.use(router)

app.mount('#app')

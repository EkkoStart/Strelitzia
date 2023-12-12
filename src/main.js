import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import  VueLazyload from 'vue-lazyload'
import './permmision.js'

const app =createApp(App)
app.use(router)
app.use(VueLazyload,{
    preload:1.3,
    attempt:1
})
app.use(store)
app.mount('#app')

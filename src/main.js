import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../public/style.css'
const app = createApp(App)

app.use(router)

if('serviceWorker' in navigator){
    try {
        const reg = await navigator.serviceWorker.register('/sw.js')
        console.log('berhasil register sw', reg.scope)
    } catch (error) {
        console.log(error)
    }
}

app.mount('#app')
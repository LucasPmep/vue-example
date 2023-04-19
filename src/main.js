import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// since I don't know what is pinia I won't use it for now
import App from './App.vue'
import router from "./router"
import './assets/tailwind.css';


const app = createApp(App)

app.use(router);
// app.use(createPinia())

app.mount('#app')

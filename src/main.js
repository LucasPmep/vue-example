import { createApp } from 'vue'
// import { createPinia } from 'pinia'
// since I don't know what is pinia I won't use it for now
import App from './App.vue'
import router from "./router"
import './assets/tailwind.css';
import VueToastify from "vue-toastify";
import Vue3Toastify from 'vue3-toastify';
// Vue.component('pagination', require('laravel-vue-pagination'));

const app = createApp(App)
app.use(
    Vue3Toastify,
    {
        autoClose: 3000,
        style: {
            opacity: 0.8,
        },
        closeOnClick: true,
        hideProgressBar: false,
        position: "bottom-left",
        theme: "dark",
        closeButton: true,
        multiple: true,
        limit: 4,
        newestOnTop: false,
        pauseOnHover: false,
        pauseOnFocusLoss: true,
    }
  );
  
app.use(router);
// app.use(createPinia())

app.mount('#app')

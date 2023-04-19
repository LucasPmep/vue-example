import {createRouter, createWebHistory } from "vue-router"
import PersonIndex from "../components/PersonIndex.vue"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
        path: '/home',
        name: 'home',
        component: HomeView,
        },
    ]
});

export default router


// export default createRouter({
//     history: createWebHistory(),
//     routes
// })
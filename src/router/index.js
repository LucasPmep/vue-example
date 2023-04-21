import {createRouter, createWebHistory } from "vue-router"
import PersonDetail from "../components/PersonDetail.vue"
import HomeView from "../views/HomeView.vue"
import CompanyListView from "../views/CompanyListView.vue"
import CompanyDetail from "../components/CompanyDetail.vue"
import PersonListView from "../views/PersonListView.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
        path: '/home',
        name: 'home',
        component: HomeView,
        },
        {
        path: '/person',
        name: 'person.list',
        component: PersonListView,
        },
        {
        path: '/person/:id/create',
        name: 'person.create',
        component: HomeView,
        },
        {
        path: '/person/:id/detail',
        name: 'person.detail',
        component: PersonDetail,
        props: true,
        },
        {
        path: '/company',
        name: 'company.list',
        component: CompanyListView,
        },
        {
        path: '/company/:id/detail',
        name: 'company.detail',
        component: CompanyDetail,
        props: true,
        },
    ]
});

export default router


// export default createRouter({
//     history: createWebHistory(),
//     routes
// })
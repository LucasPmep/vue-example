import {createRouter, createWebHistory } from "vue-router"
import PersonDetailView from "../views/PersonDetailView.vue"
import HomeView from "../views/HomeView.vue"
import CompanyListView from "../views/CompanyListView.vue"
import CompanyDetail from "../components/CompanyDetail.vue"
import PersonListView from "../views/PersonListView.vue"
import PersonCreateView from "../views/PersonCreateView.vue"
import CompanyCreateView from "../views/CompanyCreateView.vue"

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
        path: '/person/create',
        name: 'person.create',
        component: PersonCreateView,
        },
        {
        path: '/person/:id/detail',
        name: 'person.detail',
        component: PersonDetailView,
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
        {
        path: '/company/create',
        name: 'company.create',
        component: CompanyCreateView,
        },
    ]
});

export default router


// export default createRouter({
//     history: createWebHistory(),
//     routes
// })
<template>
    <h1>This is the Company-list component.</h1>
    <div class="flex flex-col">
        <div class="block bg-gray-600">
            <div class="flex p-4">
                <router-link :to="{ name: 'company.create' }" class="bg-green-500 px-2 py-1 text-white rounded mr-auto ml-auto transition-all duration-[400ms] hover:bg-white hover:text-green-500">Create company</router-link>
            </div>
            <hr class="p-4">
                <div class="columns-2 p-4">
                <div class="flex" v-for="activitysector in activitysectors">
                    <input type="checkbox" :name="activitysector.name" @change="checkFilters($event, 'activitysector')" :id="activitysector.id" class="mr-1">
                    <label :for="activitysector.id">{{ activitysector.name }}</label>
                </div>
            </div>
        </div>


        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <h1 class="text-2xl text-center text-gray-900 ">Showing {{ companyCount }}/{{ companyTotalCount }} companies.</h1>
                <table class="min-w-full text-left text-sm font-light">
                    <thead class="border-b font-medium dark:border-neutral-500">
                        <tr>
                        <th scope="col" class="px-6 py-4">Name</th>
                        <th scope="col" class="px-6 py-4">Postal code</th>
                        <th scope="col" class="px-6 py-4">CA</th>
                    </tr>
                    </thead>
                    <tbody v-if="companies[0]">
                        <tr v-for="company in companies" :key="company.id" @click="redirectToCompany(company)"
                        class="cursor-pointer border-b transition duration-300 ease-in-out hover:bg-neutral-100 hover:bg-opacity-10 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td class="whitespace-nowrap px-6 py-4">
                                {{ company.name }}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                                {{ company.postalcode }}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                                {{ company.CA }}
                            </td>
                        </tr>
                    </tbody>
                    <!-- <div v-else>
                        <div class="text-3xl">No companies for the currently selected filters...</div>
                    </div> -->
                </table>
                <div v-if="!companies[0]">
                    <div class="text-3xl text-center">No people for the currently selected filters...</div>
                  <!-- <p>There is currently no people in here ! (maybe turn on the server...)</p> -->
                </div>
                <div class="text-center pt-4">
                    <Pagination :data="paginatedCompanies" @pagination-change-page="getCompanies" />
                </div>
            </div>
            </div>
        </div>
    </div>  
</template>

<!-- here is where we would want to get link to API -->
<script setup>
import useCompanies from "../services/companyservices.js";
import useActivitiessectors from "../services/activitysectorservices.js";
import { RouterLink } from 'vue-router';
import route from '../router';
import { computed } from "vue";
import Pagination from "./pagination/Pagination.vue";


const { companies, paginatedCompanies, getCompanies, checkFilters } = useCompanies();
await getCompanies()
const { activitysectors, getActivitysectors } = useActivitiessectors();
await getActivitysectors();


const redirectToCompany = (company) => {
    route.push({name: 'company.detail', params: {id: company.id}});
}


const companyCount = computed(() => {
    return Object.keys(companies.value).length;
})

const companyTotalCount = paginatedCompanies.value.total;


</script>
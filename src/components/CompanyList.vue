<template>
    <h1>This is the Company-list component.</h1>
    <div class="flex flex-col">
        <div class="flex">
            <router-link :to="{ name: 'company.create' }" class="bg-green-500 px-2 py-1 text-white rounded">Create company</router-link>
        </div>
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light"  v-if="companies[0]">
                    <thead class="border-b font-medium dark:border-neutral-500">
                        <tr>
                        <th scope="col" class="px-6 py-4">#</th>
                        <th scope="col" class="px-6 py-4">Name</th>
                        <th scope="col" class="px-6 py-4">Postal code</th>
                        <th scope="col" class="px-6 py-4">City</th>
                        <th scope="col" class="px-6 py-4">CA</th>
                        <th scope="col" class="px-6 py-4">People</th>
                        <th scope="col" class="px-6 py-4">Activity sectors</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="company in companies" :key="company.id"
                        class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 hover:bg-opacity-10 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <th class="whitespace-nowrap px-6 py-4 font-medium"><router-link :to="{ name: 'company.detail', params: { id: company.id }}">{{ company.id }}</router-link></th>
                            <td class="whitespace-nowrap px-6 py-4">{{ company.name }}</td>
                            <td class="whitespace-nowrap px-6 py-4">{{ company.postalcode }}</td>
                            <td class="whitespace-nowrap px-6 py-4">{{ company.city }}</td>
                            <td class="whitespace-nowrap px-6 py-4">{{ company.CA }}</td>
                            <td class="whitespace-nowrap px-6 py-4"><div v-for="person in company.people"><router-link :to="{ name: 'person.detail', params: { id: person.id }}">{{ person.firstname }} {{ person.lastname }}</router-link></div></td>
                            <td class="whitespace-nowrap px-6 py-4"><div v-for="activitysector in company.activitysectors">{{ activitysector.name }}</div></td>
                        </tr>
                    </tbody>
                </table>
                <div v-else>
                    <p>There is currently no people in here ! (maybe turn on the server...)</p>
                </div>
            </div>
            </div>
        </div>
    </div>  
</template>

<!-- here is where we would want to get link to API -->
<script setup>

// OLD WAY
// 
// import useCompanies from "../services/companyservices.js";
// import { onMounted } from "vue";
// import { RouterLink } from 'vue-router';

// export default {
//     setup() {
//         const { companies, getCompanies } = useCompanies();
//         onMounted(getCompanies);
//         return {
//             companies
//         };
//     }
// }

import useCompanies from "../services/companyservices.js";
import { onMounted } from "vue";
import { RouterLink } from 'vue-router';

const { companies, getCompanies } = useCompanies();
        onMounted(getCompanies);

</script>
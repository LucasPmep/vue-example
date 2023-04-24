<template>
    <h1>This is the person-list component.</h1>
    <div class="flex flex-col">
        <div class="flex">
            <router-link :to="{ name: 'person.create' }" class="bg-green-500 px-2 py-1 text-white rounded">Create person</router-link>
        </div>
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light"  v-if="persons[0]">
                    <thead class="border-b font-medium dark:border-neutral-500">
                        <tr>
                        <th scope="col" class="px-6 py-4">#</th>
                        <th scope="col" class="px-6 py-4">Firstname</th>
                        <th scope="col" class="px-6 py-4">Lastname</th>
                        <th scope="col" class="px-6 py-4">Civility</th>
                        <th scope="col" class="px-6 py-4">Email</th>
                        <th scope="col" class="px-6 py-4">Phone</th>
                        <th scope="col" class="px-6 py-4">Company</th>
                        <th scope="col" class="px-6 py-4">Departements</th>  
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="person in persons" :key="person.id"
                        class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 hover:bg-opacity-10 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <th class="whitespace-nowrap px-6 py-4 font-medium"><router-link :to="{ name: 'person.detail', params: { id: person.id }}">{{ person.id }}</router-link></th>
                            <td class="whitespace-nowrap px-6 py-4"><router-link :to="{ name: 'person.detail', params: { id: person.id }}">{{ person.firstname }}</router-link></td>
                            <td class="whitespace-nowrap px-6 py-4"><router-link :to="{ name: 'person.detail', params: { id: person.id }}">{{ person.lastname }}</router-link></td>
                            <td class="whitespace-nowrap px-6 py-4"><router-link :to="{ name: 'person.detail', params: { id: person.id }}" v-if="person.civility!== null">{{ person.civility.name }}</router-link></td>
                            <td class="whitespace-nowrap px-6 py-4"><router-link :to="{ name: 'person.detail', params: { id: person.id }}">{{ person.email }}</router-link></td>
                            <td class="whitespace-nowrap px-6 py-4"><router-link :to="{ name: 'person.detail', params: { id: person.id }}">{{ person.phone }}</router-link></td>
                            <td class="whitespace-nowrap px-6 py-4"><router-link :to="{ name: 'person.detail', params: { id: person.id }}" v-if="person.company !== null">{{ person.company.name }}</router-link></td>
                            <td class="whitespace-nowrap px-6 py-4"><div v-for="departement in person.departements"><router-link :to="{ name: 'person.detail', params: { id: person.id }}">{{ departement.name }}</router-link></div></td>
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

import usePersons from "../services/personservices.js";
import { onMounted } from "vue";
import { RouterLink } from 'vue-router';

const { persons, getPersons } = usePersons();
onMounted(getPersons);


// import { onMounted, ref } from "vue";
// import axios from "axios";

// const getPersons = async () => {
//     const result = await axios.get(``)
// }

// let personsList = ref([]);
// const getPersons = async () => {
//         const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_URL}`);
//         const personsData = await Promise.all(result);
        
//         personsData.forEach((value, index) => {
//             personsList.value[index] = value.data;
//         });
//     }
// await getPersons();


</script>
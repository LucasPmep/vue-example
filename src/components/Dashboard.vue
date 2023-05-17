<template>
    <h2 class="text-2xl text-center">There is currently <span class="font-bold text-black text-4xl">{{ personCount }} people</span> 
    and <span class="font-bold text-black text-4xl">{{ companyCount }} companies</span>.</h2>
        <!-- <div v-for="person in persons" :key="person.id" @click="numberOfPersons++">a{{ numberOfPersons }}</div> -->
</template>

<script setup>
import usePersons from "../services/personservices.js";
import useCompanies from "../services/companyservices.js";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const { persons, paginate, getPersons } = usePersons();
const { companies, paginatedCompanies, getCompanies } = useCompanies();

await getPersons();
await getCompanies();

// const personCount = Object.keys(persons.value).length;
// const companyCount = Object.keys(companies.value).length;
const companyCount = paginatedCompanies.value.total;
const personCount = paginate.value.total;
toast.success('welcome to my website');
</script>
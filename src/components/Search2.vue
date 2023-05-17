<template>
    <div class="container text-center mr-auto ml-auto">
        <input type="text" v-model="q" placeholder="Search person or company name" class="mb-8 text-black w-80 p-2">
        <div class="flex flex-row text-center mr-auto ml-auto w-full">
            <div class="m-4 w-full">
                <h2>Persons :</h2>
                <div v-if="getFilteredPersons == ''">
                    <div class="bg-gray-500 text-black mb-4 p-1 border-blue-100 border-2 m-2">
                        Aucun résultat trouvé
                    </div>
                </div>
                <div v-for="person in getFilteredPersons" :key="person.id" class="m-2">
                    <div class="bg-black text-white mb-4 p-1 border-blue-300 border-2">
                        <router-link :to="{ name: 'person.detail', params: { id: person.id } }">
                            <ul>
                                <li>{{ person.firstname }} {{ person.lastname }}</li>
                            </ul>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="m-4 w-full">
                <h2>Companies : </h2>
                <div v-if="getFilteredCompanies == ''">
                    <div class="bg-gray-500 text-black mb-4 p-1 border-blue-100 border-2 m-2">
                        Aucun résultat trouvé
                    </div>
                </div>
                <div v-for="company in getFilteredCompanies" :key="company.id" class="m-2">
                    <div class="bg-black text-white mb-4 p-1 border-red-300 border-2">
                        <router-link :to="{ name: 'company.detail', params: { id: company.id } }">
                            <ul>
                                <li>{{ company.name }}</li>
                            </ul>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import usePersons from "../services/personservices.js";
import useCompanies from "../services/companyservices.js";


const { persons, getPersons } = usePersons();
const { companies, getCompanies } = useCompanies();
await getPersons();
await getCompanies();
const q = ref('');


console.log(persons.value)

const getFilteredPersons = computed(() => {
    return persons.value.filter(person => {
        return person.firstname.toLowerCase().includes(q.value.toLowerCase())
        + person.lastname.toLowerCase().includes(q.value.toLowerCase());
    })
})
const getFilteredCompanies = computed(() => {
    return companies.value.filter(company => {
        return company.name.toLowerCase().includes(q.value.toLowerCase());
    })
})

</script>
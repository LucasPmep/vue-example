<template>
    <h1>This is the person-detail component.</h1>
    <div v-if="errors !== ''">
    {{ errors }}
    </div>
    <form class="space-y-6 pb-4" @submit.prevent="savePerson" v-if="person.departements">
        <div>
            <label for="firstname" class="block">Firstname*</label>
            <input type="text" id="name" v-model="person.firstname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div>
            <label for="lastname" class="block">Lastname*</label>
            <input type="text" id="lastname" v-model="person.lastname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
        </div>
        <div>
            <label for="email" class="block">Email</label>
            <input type="text" id="email" v-model="person.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div>
            <label for="phone" class="block">Phone</label>
            <input type="text" id="phone" v-model="person.phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        
        
        <div>
            <label for="civility" class="block">Civility*</label>
            <select v-if="person.civility" id="civility" v-model="person.civility.id" @change="modifyLocalGenre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <!-- Option -->
                <option v-for="civility in civilities" :value="civility.id">{{ civility.name }}</option>
            </select>
            <select v-else                 id="civility"                              @change="modifyLocalGenre" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <!-- Option -->
                <option value=""> </option>
                <option v-for="civility in civilities" :value="civility.id">{{ civility.name }}</option>
            </select>
        </div>



        <div>
            <label for="company" class="block">Company</label>
            <select v-if="person.company" id="company" v-model="person.company.id" @change="modifyLocalCompany" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""> </option>
                <option :value="company.id" v-for="company in companies">{{ company.name }}</option>
            </select>
            <select v-else                id="company"                             @change="modifyLocalCompany" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""> </option>
                <option :value="company.id" v-for="company in companies">{{ company.name }}</option>
            </select>
        </div>


        <div>        
            <label for="departements" class="block">Departements</label>
            <select v-if="reformatedIds" v-model="reformatedIds" id="departements" multiple size="10" @change="modifyLocalDepIds"
            class="bg-gray-50 border border-gray-300 shadow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="departement in departements" :value="departement.id">{{ departement.name }}</option>
            </select>
        </div>

        <button type="submit" class="bg-blue-500 px-2 py61 text-white roundedp m-4 shadow">Modify</button>
        <button type="button" class="bg-red-500 px-2 py61 text-white rounded m-4 shadow" @click="removePerson">Delete</button>
    </form>
    <!-- <div v-else><p>Loading...</p></div> -->
</template>


<script setup>

import usePersons from "../services/personservices.js";
import useCompanies from "../services/companyservices.js";
import useDepartements from "../services/departementservices.js";
import { onMounted, reactive } from "vue";
import useCivilities from "../services/civilityservices.js";

const props = defineProps({
    id: {
        required: true,
        type: String, 
    }
});

const { companies, getCompanies } = useCompanies();
const { departements, getDepartements } = useDepartements();
const { getPerson, updatePerson, errors, person, deletePerson } = usePersons();
const { getCivilities, civilities } = useCivilities();
let reformatedIds = reactive([]);

await getPerson(props.id);
reformatedIds = person.value.departements.map(({ id }) => id);
await getCivilities();
await getCompanies();
await getDepartements();

const modifyLocalGenre = () => {
    person.value.civility_id = civility.value;
    // person.value.civility_id = person.value.civility.id;
}
const modifyLocalCompany = () => {
    console.log(company.value); // value du champ choisi par l'utilisateur
    person.value.company_id = company.value;
    // person.value.company_id = person.value.company.id;
}
const modifyLocalDepIds = () => {
    person.value.departements = reformatedIds;
}



const savePerson = async () => {
    await updatePerson(props.id);
};
const removePerson = async () => {
    await deletePerson(props.id);
}



</script>
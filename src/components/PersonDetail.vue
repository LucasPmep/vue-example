<template>
    <h1>This is the person-detail component.</h1>
    <Suspense>
        <DeleteModale v-bind:revele="revele" v-bind:toggleModale="toggleModale" :removePerson="removePerson" :id="props.id"/>
        <template #fallback>
            Loading...
        </template>
    </Suspense>
    <form class="space-y-6 pb-4" @submit.prevent="savePerson">
        <div>
            <label for="firstname" class="block">Firstname*</label>
            <input type="text" id="name" v-model="person.firstname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <div v-if="errors.firstname">
                <ul><li v-for="error in errors.firstname" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div>
            <label for="lastname" class="block">Lastname*</label>
            <input type="text" id="lastname" v-model="person.lastname" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <div v-if="errors.lastname">
                <ul><li v-for="error in errors.lastname" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div>
            <label for="email" class="block">Email</label>
            <input type="text" id="email" v-model="person.email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <div v-if="errors.email">
                <ul><li v-for="error in errors.email" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div>
            <label for="phone" class="block">Phone</label>
            <input type="text" id="phone" v-model="person.phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <div v-if="errors.phone">
                <ul><li v-for="error in errors.phone" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        
        
        <div>
            <label for="civility" class="block">Civility*</label>
            <select id="civility" v-model="person.civility_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="civility in civilities" :value="civility.id">{{ civility.name }}</option>
            </select>
            <div v-if="errors.civility_id">
                <ul><li v-for="error in errors.civility_id" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>



        <div>
            <label for="company" class="block">Company</label>
            <select id="company" v-model="person.company_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""> </option>
                <option :value="company.id" v-for="company in companies">{{ company.name }}</option>
            </select>
            <div v-if="errors.company">
                <ul><li v-for="error in errors.company" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>


        <div>        
            <label for="departements" class="block">Departements</label>
            <select v-if="reformatedIds" v-model="reformatedIds" id="departements" multiple size="10" @change="modifyLocalDepIds"
            class="bg-gray-50 border border-gray-300 shadow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="departement in departements" :value="departement.id">{{ departement.name }}</option>
            </select>
            <div v-if="errors.departements">
                <ul><li v-for="error in errors.departements" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div class="flex text-center space-x-60 w-full">
            <button type="submit" class="bg-blue-500 text-black text-2xl p-2 m-4 shadow border-2 border-black rounded transition-all duration-[250ms] hover:bg-white w-48 center">Modify</button>
            <button type="button" class="bg-red-500 text-black text-2xl p-2 m-4 shadow border-2 border-black rounded transition-all duration-[250ms] hover:bg-white w-48 center" @click="toggleModale">Delete</button>
        </div>
    </form>
</template>


<script setup>

import usePersons from "../services/personservices.js";
import useCompanies from "../services/companyservices.js";
import useDepartements from "../services/departementservices.js";
import { onMounted, reactive, ref } from "vue";
import useCivilities from "../services/civilityservices.js";
import DeleteModale from "./modale/PersonDeleteModale.vue";


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
const revele = ref(false);


await getPerson(props.id);
reformatedIds = person.value.departements.map(({ id }) => id);
console.log(person)
await getCivilities();
await getCompanies();
await getDepartements();



const modifyLocalDepIds = async () => {
    // console.log(reformatedIds)
    person.value.departements = reformatedIds;
}

await modifyLocalDepIds();
// initialize this in many to many relationships to be sure that data is correctly transformed even if there is no modification

const savePerson = async () => {
    await updatePerson(props.id);
};
const removePerson = async () => {
    await deletePerson(props.id);
}

const toggleModale = () => {
    revele.value = !revele.value
}

</script>
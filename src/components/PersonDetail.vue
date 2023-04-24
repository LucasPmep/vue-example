<template>
    <h1>This is the person-detail component.</h1>
    <div v-if="errors !== ''">
    {{ errors }}
    </div>
    <form class="space-y-6 pb-4" @submit.prevent="savePerson">
        <div>
            <label for="firstname" class="block">Firstname</label>
            <input type="text" id="name" v-model="person.firstname" class="text-black">
        </div>
        <div>
            <label for="lastname" class="block">Lastname</label>
            <input type="text" id="lastname" v-model="person.lastname" class="text-black">
        </div>
        <div>
            <label for="email" class="block">Email</label>
            <input type="text" id="email" v-model="person.email" class="text-black">
        </div>
        <div>
            <label for="phone" class="block">Phone</label>
            <input type="text" id="phone" v-model="person.phone" class="text-black">
        </div>
        <div>
            <label for="civility" class="block">Civility</label>
            <select id="civility" class="text-black" v-model="person.civility">
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
                <option value="autre">Autre</option>
            </select>
        </div>
        <!-- <div>
            <label for="company" class="block">Company</label>
            <select id="civility" class="text-black" v-model="person.company">
                <option value="company.name"  v-for="company in companies" :key="company.id">{{ company.name }}</option>
            </select> -->
            <!-- <input type="text" id="phone" v-model="person.phone" class="text-black"> -->
        <!-- </div>
        <div>        
            <label for="departements" class="block">Departements</label>
            <select v-model="person.departement" id="departements" class="block mt-1 w-full text-black" multiple>
                <option v-for="departement in departements" :value="departement.id">{{ departement.name }}</option>
            </select>
            Vos departements liés : <div v-for="departement in person.departements">{{ departement }}</div> -->
            <!-- <select id="departements" class="text-black" multiple v-model="person.departements">
                <option value="departement.name"  v-for="departement in departements" :key="departement.id">{{ departement.name }}</option>
            </select> -->
        <!-- </div> -->
        <button type="submit" class="bg-blue-500 px-2 py61 text-white rounded">Modify</button>
        <button type="submit" class="bg-red-500 px-2 py61 text-white rounded">Delete</button>
    </form>
</template>


<script setup>

import { reactive } from "vue";
import usePersons from "../services/personservices.js";
import useCompanies from "../services/companyservices.js";
import useDepartements from "../services/departementservices.js";
import { onMounted } from "vue";

const props = defineProps({
    id: {
        required: true,
        type: String, 
    }
});

// On va chercher les entreprises
const { companies, getCompanies } = useCompanies();
onMounted(getCompanies);
// On va chercher les départements
const { departements, getDepartements } = useDepartements();
onMounted(getDepartements);
// On va chercher la personne concernée
const { getPerson, updatePerson, errors, person } = usePersons();
onMounted( async () => {
    await getPerson(props.id)
});




const savePerson = async () => {
    await updatePerson(props.id);
};



</script>
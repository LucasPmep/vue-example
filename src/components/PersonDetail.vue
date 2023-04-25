<template>
    <h1>This is the person-detail component.</h1>
    <div v-if="errors !== ''">
    {{ errors }}
    </div>
    <form class="space-y-6 pb-4" @submit.prevent="savePerson" v-if="person.civility">
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
            <select id="civility" class="text-black" v-model="person.civility.id" @change="modifyLocalGenre">
                <!-- Option -->
                <option v-for="civility in civilities" :value="civility.id">{{ civility.name }}</option>
            </select>
        </div>
        <div>
            <label for="company" class="block">Company</label>
            <select id="company" class="text-black" v-model="person.company.id" @change="modifyLocalCompany">
                <option :value="company.id"  v-for="company in companies">{{ company.name }}</option>
            </select>
        </div>



        <div>        
            <label for="departements" class="block">Departements</label>
            <select id="departements" class="block mt-1 w-full text-black" v-model="person.departements.id"  multiple>
                <option v-for="departement in departements" :value="departement.id">{{ departement.name }}</option>
            </select>
            <!-- Vos departements liés : <div v-for="departement in person.departements">{{ departement }}</div> -->
            <!-- <select id="departements" class="text-black" multiple v-model="person.departements">
                <option value="departement.name"  v-for="departement in departements" :key="departement.id">{{ departement.name }}</option>
            </select> -->
        </div>


        <button type="submit" class="bg-blue-500 px-2 py61 text-white roundedp m-4">Modify</button>
        <button type="submit" class="bg-red-500 px-2 py61 text-white rounded m-4">Delete</button>
    </form>
    <div v-else><p>Loading...</p></div>
</template>


<script setup>

import usePersons from "../services/personservices.js";
import useCompanies from "../services/companyservices.js";
import useDepartements from "../services/departementservices.js";
import { onMounted } from "vue";
import useCivilities from "../services/civilityservices.js";


const props = defineProps({
    id: {
        required: true,
        type: String, 
    }
});

const { companies, getCompanies } = useCompanies();
const { departements, getDepartements } = useDepartements();
const { getPerson, updatePerson, errors, person } = usePersons();
const { getCivilities, civilities } = useCivilities();

onMounted( async () => {
    await getPerson(props.id);
    console.log(person.value);
    
    await getCivilities();
    await getCompanies();
    await getDepartements();
    
    console.log(civilities);
    // Civilites
    // getCivilites() -> civilitesref([id:1, genre:'Homme', id:2, genre:'Femme', id:3, genre:'Autres'])

});

const modifyLocalGenre = () => {
    person.value.civility_id = person.value.civility.id;
}
const modifyLocalCompany = () => {
    person.value.company_id = person.value.company.id;
}


const savePerson = async () => {
    await updatePerson(props.id);
};



</script>
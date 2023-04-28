<template>
    <h1>This is the company-detail component.</h1>
    <form class="space-y-6 pb-4" @submit.prevent="saveCompany">
        <div>
            <label for="name" class="block">Name*</label>
            <input type="text" id="name" v-model="company.name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <div v-if="errors.name">
                <ul><li v-for="error in errors.name" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>

        <div>        
            <label for="activitysectors" class="block">Activity sectors</label>
            <select v-if="reformatedSectorsIds" v-model="reformatedSectorsIds" id="activitysectors" multiple size="10" @change="modifyLocalSectorsIds"
            class="bg-gray-50 border border-gray-300 shadow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="activitysector in activitysectors" :value="activitysector.id">{{ activitysector.name }}</option>
            </select>
            <div v-if="errors.activitysectors">
                <ul><li v-for="error in errors.activitysectors" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>

        <div>
            <label for="postalcode" class="block">Postalcode*</label>
            <input type="text" id="postalcode" v-model="company.postalcode" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <div v-if="errors.postalcode">
                <ul><li v-for="error in errors.postalcode" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div>
            <label for="city" class="block">City*</label>
            <input type="text" id="city" v-model="company.city" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <div v-if="errors.city">
                <ul><li v-for="error in errors.city" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div>
            <label for="CA" class="block">CA</label>
            <input type="text" id="CA" v-model="company.CA" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <div v-if="errors.CA">
                <ul><li v-for="error in errors.CA" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>


        <div>        
            <label for="persons" class="block">People</label>
            <select v-if="reformatedIds" v-model="reformatedIds" id="people" multiple size="10" @change="modifyLocalPeopleIds"
            class="bg-gray-50 border border-gray-300 shadow text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option v-for="person in persons" :value="person.id">{{ person.lastname }} {{ person.firstname }}</option>
            </select>
            <div v-if="errors.people">
                <ul><li v-for="error in errors.people" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>

        <button type="submit" class="bg-blue-500 px-2 py61 text-white roundedp m-4 shadow">Modify</button>
        <button type="button" class="bg-red-500 px-2 py61 text-white rounded m-4 shadow" @click="removeCompany">Delete</button>
    </form>
    <!-- <div v-else><p>Loading...</p></div> -->
</template>


<script setup>

import useCompanies from "../services/companyservices.js";
import usePersons from "../services/personservices.js";
import useActivitysectors from "../services/activitysectorservices.js";
import { reactive } from "vue";

const props = defineProps({
    id: {
        required: true,
        type: String, 
    }
});

const { company, getCompany, updateCompany, deleteCompany, errors } = useCompanies();
const { getPersons, persons } = usePersons();
const { activitysectors, getActivitysectors } = useActivitysectors();
let reformatedIds = reactive([]);
let reformatedSectorsIds = reactive([]);

await getCompany(props.id);
reformatedIds = company.value.people.map(({ id }) => id);
reformatedSectorsIds = company.value.activitysectors.map(({ id }) => id);
await getPersons();
await getActivitysectors();


const modifyLocalPeopleIds = async () => {
    company.value.people = reformatedIds;
}
const modifyLocalSectorsIds = async () => {
    company.value.activitysectors = reformatedSectorsIds;
}
await modifyLocalSectorsIds();
await modifyLocalPeopleIds();

const saveCompany = async () => {
    await updateCompany(props.id);
};
const removeCompany = async () => {
    await deleteCompany(props.id);
}

</script>
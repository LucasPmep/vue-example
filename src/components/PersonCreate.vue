<template>
    <h1>This is the PersonCreate component.</h1>
    <form class="space-y-6" @submit.prevent="storePerson">
        <div>
            <label for="firstname" class="block">Firstname</label>
            <input type="text" id="name" v-model="form.firstname" class="text-black rounded">
            <div v-if="errors.firstname">
                <ul><li v-for="error in errors.firstname" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div>
            <label for="lastname" class="block">Lastname</label>
            <input type="text" id="lastname" v-model="form.lastname" class="text-black rounded">
            <div v-if="errors.lastname">
                <ul><li v-for="error in errors.lastname" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div>
            <label for="civility" class="block">Civility</label>
            <select id="civility" v-model="form.civility_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <!-- Option -->
                <option v-for="civility in civilities" :value="civility.id">{{ civility.name }}</option>
            </select>
            <div v-if="errors.civility_id">
                <ul><li v-for="error in errors.civility_id" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div class="text-center pt-4">
            <button type="submit" class="bg-blue-500 border border-black px-2 py61 text-white rounded text-2xl transition-all duration-[400ms] hover:bg-white hover:text-blue-500 p-1">Create</button>
        </div>
    </form>
</template>

<!-- here is where we would want to get link to API -->
<script setup>

import { reactive } from "vue";
import usePersons from "../services/personservices.js";
import useCivilities from "../services/civilityservices";

const form = reactive({
    firstname: '',
    lastname: '',
    civility_id: ''
});

const { createPerson, errors } = usePersons();
const { civilities, getCivilities } = useCivilities();

await getCivilities();

const storePerson = async () => {
    await createPerson({...form});
};



</script>
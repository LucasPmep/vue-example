<template>
    <h1>This is the PersonCreate component.</h1>
    <div v-if="errors !== ''">
    {{ errors }}
    </div>
    <form class="space-y-6" @submit.prevent="storePerson">
        <div>
            <label for="firstname" class="block">Firstname</label>
            <input type="text" id="name" v-model="form.firstname" class="text-black">
        </div>
        <div>
            <label for="lastname" class="block">Lastname</label>
            <input type="text" id="lastname" v-model="form.lastname" class="text-black">
        </div>
        <div>
            <label for="civility" class="block">Civility</label>
            <select id="civility" v-model="form.civility_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <!-- Option -->
                <option v-for="civility in civilities" :value="civility.id">{{ civility.name }}</option>
            </select>
        </div>
        <button type="submit" class="bg-blue-500 px-2 py61 text-white rounded">Create</button>
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
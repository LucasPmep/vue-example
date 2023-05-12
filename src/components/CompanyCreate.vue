<template>
    <h1>This is the CompanyCreate component.</h1>
    <form class="space-y-6 text-center" @submit.prevent="storeCompany">
        <div>
            <label for="firstname" class="block">Name</label>
            <input type="text" id="name" v-model="form.name" class="text-black rounded">
            <div v-if="errors.name">
                <ul><li v-for="error in errors.name" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div>
            <label for="lastname" class="block">Postal code</label>
            <input type="text" id="lastname" v-model="form.postalcode" class="text-black rounded">
            <div v-if="errors.postalcode">
                <ul><li v-for="error in errors.postalcode" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div>
            <label for="email" class="block">City</label>
            <input type="text" id="email" v-model="form.city" class="text-black rounded">
            <div v-if="errors.city">
                <ul><li v-for="error in errors.city" class="text-red-600 font-bold text-l">{{ error }} </li></ul>
            </div>
        </div>
        <div class="text-center">
            <button type="submit" class="text-2xl border border-black bg-blue-500 px-2 py61 text-white rounded transition-all duration-[400] hover:bg-white hover:text-blue-500 mt-4">Create</button>
        </div>
    </form>
</template>

<!-- here is where we would want to get link to API -->
<script setup>

import { reactive } from "vue";
import useCompanies from "../services/companyservices.js";

const form = reactive({
    name: '',
    postalcode: '',
    city: '',
});

const { createCompany, errors } = useCompanies();

const storeCompany = async () => {
    await createCompany({...form});
};


</script>
<template>
    <h1>This is the CompanyCreate component.</h1>
    <div v-if="errors !== ''">
    {{ errors }}
    </div>
    <form class="space-y-6" @submit.prevent="storeCompany">
        <div>
            <label for="firstname" class="block">Name</label>
            <input type="text" id="name" v-model="form.name" class="text-black">
        </div>
        <div>
            <label for="lastname" class="block">Postal code</label>
            <input type="text" id="lastname" v-model="form.postalcode" class="text-black">
        </div>
        <div>
            <label for="email" class="block">City</label>
            <input type="text" id="email" v-model="form.city" class="text-black">
        </div>
        <div>
            <label for="phone" class="block">CA</label>
            <input type="text" id="phone" v-model="form.CA" class="text-black">
        </div>
        <button type="submit" class="bg-blue-500 px-2 py61 text-white rounded">Create</button>
    </form>
</template>

<!-- here is where we would want to get link to API -->
<script setup>


// OLD WAY
// 
// import { reactive } from "vue";
// import useCompanies from "../services/companyservices.js";

// export default {
//     setup() {
//         const form = reactive({
//             name: '',
//             postalcode: '',
//             city: '',
//             CA: '',
//         });

//         const { createCompany, errors } = useCompanies();

//         const storeCompany = async () => {
//             await createCompany({...form});
//         };
 
//         return {
//             form,
//             errors,
//             storeCompany
//         };
//     }
// }

import { reactive } from "vue";
import useCompanies from "../services/companyservices.js";

const form = reactive({
    name: '',
    postalcode: '',
    city: '',
    CA: '',
});

const { createCompany, errors } = useCompanies();

const storeCompany = async () => {
    await createCompany({...form});
};


</script>
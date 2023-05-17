<template>
<div class="btn-modale text-black cursor-pointer hover:text-red-600 hover:scale-125 transition-all duration-[250ms]" @click="toggleModale"><i class="fa-solid fa-x"></i></div>
            <h2 class="text-black text-center font-bold text-2xl">Are you sure to delete this COMPANYYYYYYYYYYYYY ?</h2>
            <div class="p-4">
                <p class="text-xl text-center font-semibold">{{person.firstname}} {{ person.lastname }} ({{ person.civility.name }})</p>
                <p v-if="person.email">Email : <span class="italic font-semibold">{{ person.email }}</span></p>
                <p v-if="person.phone">Phone : <span class="italic font-semibold">{{ person.phone }}</span></p>
                <p v-if="person.departements[0]">
                    From departements :
                    <p v-for="departement in person.departements">
                        <li class="italic font-semibold">{{ departement.name }}</li>
                    </p>
                </p>
                <p v-if="person.company">Linked to company : <span class="italic font-semibold">{{ person.company.name }}</span></p>

            </div>
            <div class="flex mt-8 space-x-10">
                <div class="bg-gray-300 border-gray-800 border cursor-pointer text-center p-1 rounded-full w-full transition-all duration-[250ms] hover:bg-white hover:scale-105" 
                @click="toggleModale">
                    Cancel
                </div>
                <div class="bg-red-500 border-2 border-black cursor-pointer text-center p-1 rounded-full w-full font-bold transition-all duration-[250ms] hover:bg-white hover:scale-105" 
                @click="removeIt()">
                    Yes, delete
                </div>
            </div>
</template>

<script setup>
import useCompanies from "../../../services/companyservices.js";
const { getCompany, company, deleteCompany } = useCompanies();
await getCompany(props.id);

const props = defineProps({
    revele: {
        required: true,
        type: Boolean, 
    },
    toggleModale: {},
    id: {},
    removeIt: {},
});

const removeIt = async () => {
    await deleteCompany(props.id);
}
</script>

<style scoped>
.btn-modale {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
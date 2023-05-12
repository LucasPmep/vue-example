<template>
    <h1>This is the Company-list component.</h1>
    <div class="flex flex-col">
        <div class="flex pb-4">
            <router-link :to="{ name: 'company.create' }" class="bg-green-500 px-2 py-1 text-white rounded mr-auto ml-auto transition-all duration-[400ms] hover:bg-white hover:text-green-500">Create company</router-link>
        </div>
        <hr class="p-2">
        <div class="block">
            <div class="columns-2 pb-4">
            <div class="flex" v-for="activitysector in activitysectors">
                <input type="checkbox" :name="activitysector.name" @change="checkFilters($event)" :id="activitysector.name" class="mr-1">
                <label :for="activitysector.name">{{ activitysector.name }}</label>
            </div>
        </div>
        </div>
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <h1 class="text-2xl text-center text-gray-900 ">There is currently {{ companyCount }} companies.</h1>
                <table class="min-w-full text-left text-sm font-light"  v-if="companies[0]">
                    <thead class="border-b font-medium dark:border-neutral-500">
                        <tr>
                        <th scope="col" class="px-6 py-4">Name</th>
                        <th scope="col" class="px-6 py-4">Postal code</th>
                        <th scope="col" class="px-6 py-4">CA</th>
                    </tr>
                    </thead>
                    <tbody v-if="filteredActivitySectors[0]">
                        <tr v-for="company in filteredActivitySectors" :key="company.id" @click="redirectToCompany(company)"
                        class="cursor-pointer border-b transition duration-300 ease-in-out hover:bg-neutral-100 hover:bg-opacity-10 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td class="whitespace-nowrap px-6 py-4">
                                {{ company.name }}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                                {{ company.postalcode }}
                            </td>
                            <td class="whitespace-nowrap px-6 py-4">
                                {{ company.CA }}
                            </td>
                        </tr>
                    </tbody>
                    <div v-else>
                        <div class="text-3xl">No companies for the currently selected filters...</div>
                    </div>
                </table>
                <div v-else>
                    <p>There is currently no people in here ! (maybe turn on the server...)</p>
                </div>
            </div>
            </div>
        </div>
    </div>  
</template>

<!-- here is where we would want to get link to API -->
<script setup>
import useCompanies from "../services/companyservices.js";
import useActivitiessectors from "../services/activitysectorservices.js";
import { RouterLink } from 'vue-router';
import route from '../router';
import { ref, computed } from "vue";

const { companies, getCompanies } = useCompanies();
await getCompanies()
const { activitysectors, getActivitysectors } = useActivitiessectors();
await getActivitysectors();
const companyCount = Object.keys(companies.value).length;


const redirectToCompany = (company) => {
    route.push({name: 'company.detail', params: {id: company.id}});
}




// array of chosen filters
const checkedFilterValues = ref([]);

// checks if a filter is activated and add or remove it to the array
const checkFilters = (event) => {
    if(event.target.checked === true) {
        checkedFilterValues.value.push(event.target.id)
    }
    else {
        checkedFilterValues.value.splice(checkedFilterValues.value.indexOf(event.target.id), 1)
    }
}

// returns my filtered list of people
const filteredActivitySectors = computed(() => {
    
    if (areAllUnselected() == true) {
        return companies.value
    }
    if (companies.value) {
        return companies.value.filter(company =>{
            if (company.activitysectors[0]){
                
                if (isInOurNeededList(company.activitysectors) == true) {
                    return true;
                }
            }
            return false
        })
    }
    return ''
})

// returns true if all departements are unselected
const areAllUnselected = () => {
    let result = true
    activitysectors.value.forEach(activitysector => {
        if (checkedFilterValues.value.includes(activitysector.name)) {
            result = false
        }
    })
    
    if (result == true) 
    {
        return true;
    }
    return false;
}

// returns filtered departements from a person
const isInOurNeededList = (company_activitysectors) => {
    let result = false;
    activitysectors.value.forEach(activitysector => {
        if (checkedFilterValues.value.includes(activitysector.name) && company_activitysectors.filter(e => e.name === activitysector.name).length > 0) {
            result = true;
            return result;
        }
    })
    if(result == true) {
        return true;
    }
    return false;
}
</script>
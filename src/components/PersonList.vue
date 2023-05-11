<template>
  <h1>This is the person-list component.</h1>
  <div class="flex flex-col">
      <div class="flex p-4 bg-gray-600">
          <router-link :to="{ name: 'person.create' }" class="bg-green-500 px-2 py-1 text-white rounded">Create person</router-link>
      </div>
      <div class="block bg-gray-600">
        <!-- <input type="checkbox" name="testCheckbox" @change="checkFilters($event)" id="testCheckbox" checked>
        <label for="testCheckbox">Test</label>
        <input type="checkbox" name="Aube" @change="checkFilters($event)" id="Aube" checked>
        <label for="Aube">Aube</label> -->
        <hr class="p-4">
        <div class="columns-4 p-4">
            <div class="flex" v-for="departement in departements">
                <input type="checkbox" :name="departement.name" @change="checkFilters($event)" :id="departement.id" class="mr-1">
                <label :for="departement.id">{{ departement.name }}</label>
            </div>
        </div>
        <hr class="p-4">
        <div class="columns-3 p-4 text-xl">
            <div class="flex" v-for="civility in civilities">
                <input type="checkbox" :name="civility.name" @change="checkCiviFilters($event)" :id="civility.id" class="mr-1">
                <label :for="civility.id">{{ civility.name }}</label>
            </div>
        </div>
        <!-- <hr class="p-4"> -->
      </div>
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 pb-12">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
              <h1 class="text-2xl text-center text-gray-900 ">Showing {{ personCount }}/{{ totalPersonCount }} persons.</h1>
              <table class="min-w-full text-left text-sm font-light">
                  <thead class="border-b font-medium dark:border-neutral-500">
                      <th scope="col" class="px-6 py-4">Firstname</th>
                      <th scope="col" class="px-6 py-4">Lastname</th>
                      <th scope="col" class="px-6 py-4">Civility</th>
                  </thead>
                  <tbody v-if="filteredPersons[0]">
                      <tr v-for="person in filteredPersons" @click="redirectToPerson(person)" class="w-full border-b transition duration-300 ease-in-out hover:bg-neutral-100 hover:bg-opacity-10 dark:border-neutral-500 dark:hover:bg-neutral-600 cursor-pointer" >
                          <td class="whitespace-nowrap px-6 py-4" >
                                  {{ person.firstname }}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                                  {{ person.lastname }}
                          </td>
                          <td class="whitespace-nowrap px-6 py-4">
                                  {{ person.civility.name }}
                          </td>
                      </tr>
                  </tbody>
                  <!-- <div v-else>
                    <div class="text-3xl">No people for the currently selected filters...</div>
                  </div> -->
              </table>
              <div v-if="!filteredPersons[0]">
                    <div class="text-3xl text-center">No people for the currently selected filters...</div>
                  <!-- <p>There is currently no people in here ! (maybe turn on the server...)</p> -->
              </div>
            <div class="text-center pt-4">
                <Pagination :data="paginate" @pagination-change-page="getPersons" />
            </div>
            </div>
          </div>
      </div>
  </div>  
</template>

<!-- here is where we would want to get link to API -->
<script setup>

import usePersons from "../services/personservices.js";
import useDepartements from "../services/departementservices.js";
import useCivilities from "../services/civilityservices.js";
import { RouterLink } from 'vue-router';
import router from "../router";
import { ref, computed } from "vue";
import Pagination from "./pagination/Pagination.vue";


// array of chosen filters
const checkedFilterValues = ref([]);
const checkedCiviFilterValues = ref([]);

const { persons, paginate, getPersons } = usePersons();
await getPersons(1, checkedFilterValues.value, checkedCiviFilterValues.value);
// console.log(paginate.value.meta.total);
const personCount = Object.keys(persons.value).length;
const totalPersonCount = paginate.value.total;
const { departements, getDepartements } = useDepartements();
await getDepartements();
const { civilities, getCivilities } = useCivilities();
await getCivilities();


const redirectToPerson = (person) => {
  router.push({ name: 'person.detail', params: { id: person.id }});
}

// checks if a filter is activated and add or remove it to the array
const checkFilters = (event) => {
    if(event.target.checked === true) {
        checkedFilterValues.value.push(event.target.id)
    }
    else {
        checkedFilterValues.value.splice(checkedFilterValues.value.indexOf(event.target.id), 1)
    }
    console.log('departements : ');
    console.log(checkedFilterValues.value);
    console.log('civilities : ');
    console.log(checkedCiviFilterValues.value);
    console.log('_____________________');
    getPersons(1, checkedFilterValues.value, checkedCiviFilterValues.value);
}

const checkCiviFilters = (event) => {
    if(event.target.checked === true) {
        checkedCiviFilterValues.value.push(event.target.id)
    }
    else {
        checkedCiviFilterValues.value.splice(checkedCiviFilterValues.value.indexOf(event.target.id), 1)
        // indexOf renverra -1 s'il ne trouve pas la valeur sélectionnée (-1 avec splice éliminera le dernier élément du tableau)
    }
    getPersons(1, checkedFilterValues.value, checkedCiviFilterValues.value);
}

// returns my filtered list of people
const filteredPersons = computed(() => {
    return persons.value;
    if (areAllUnselected() == true) {
        return persons.value
    }
    if (persons.value) {
        return persons.value.filter(person =>{
            if (person.departements[0]){
                if (isInOurNeededList(person.departements) == true) {
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
    departements.value.forEach(departement => {
        if (checkedFilterValues.value.includes(departement.name)) {
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
const isInOurNeededList = (person_departements) => {
    let result = false;
    departements.value.forEach(departement => {
        if (checkedFilterValues.value.includes(departement.name) && person_departements.filter(e => e.name === departement.name).length > 0) {
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
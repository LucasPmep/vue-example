<template>
  <h1>This is the person-list component.</h1>
  <div class="flex flex-col">
    <div class="block bg-gray-600">
        <div class="flex p-4">
            <router-link :to="{ name: 'person.create' }" class="bg-green-500 px-2 py-1 text-white rounded mr-auto ml-auto transition-all duration-[400ms] hover:bg-white hover:text-green-500">Create person</router-link>
        </div>
        <hr class="p-4">
        <div class="columns-4 p-4">
            <div class="flex" v-for="departement in departements">
                <input type="checkbox" :name="departement.name" @change="checkFilters($event, 'departement')" :id="departement.id" class="mr-1">
                <label :for="departement.id">{{ departement.name }}</label>
            </div>
        </div>
        <hr class="p-4">
        <div class="columns-3 p-4 text-xl">
            <div class="flex" v-for="civility in civilities">
                <input type="checkbox" :name="civility.name" @change="checkFilters($event, 'civility')" :id="civility.id" class="mr-1">
                <label :for="civility.id">{{ civility.name }}</label>
            </div>
        </div>
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
                  <tbody v-if="persons[0]">
                      <tr v-for="person in persons" @click="redirectToPerson(person)" class="w-full border-b transition duration-300 ease-in-out hover:bg-neutral-100 hover:bg-opacity-10 dark:border-neutral-500 dark:hover:bg-neutral-600 cursor-pointer" >
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
              <div v-if="!persons[0]">
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
import { computed } from "vue";
import router from "../router";
import Pagination from "./pagination/Pagination.vue";


const { persons, paginate, getPersons, checkFilters } = usePersons();
await getPersons(1);
const totalPersonCount = paginate.value.total;
const { departements, getDepartements } = useDepartements();
await getDepartements();
const { civilities, getCivilities } = useCivilities();
await getCivilities();

const redirectToPerson = (person) => {
  router.push({ name: 'person.detail', params: { id: person.id }});
}

const personCount = computed(() => {
    return Object.keys(persons.value).length;
})

</script>
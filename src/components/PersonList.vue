<template>
  <h1>This is the person-list component.</h1>
  <div class="flex flex-col">
      <div class="flex">
          <router-link :to="{ name: 'person.create' }" class="bg-green-500 px-2 py-1 text-white rounded">Create person</router-link>
      </div>
      <div class="block">
        <!-- <input type="checkbox" name="testCheckbox" @change="checkFilters($event)" id="testCheckbox" checked>
        <label for="testCheckbox">Test</label>
        <input type="checkbox" name="Aube" @change="checkFilters($event)" id="Aube" checked>
        <label for="Aube">Aube</label> -->
        <div v-for="departement in departements" class="flex">
            <input type="checkbox" :name="departement.name" @change="checkFilters($event)" :id="departement.name" checked>
            <label :for="departement.name">{{ departement.name }}</label>
        </div>
      </div>
      
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8 pb-12">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
              <h1>There is currently {{ personCount }} persons.</h1>
              <table class="min-w-full text-left text-sm font-light"  v-if="persons[0]">
                  <thead class="border-b font-medium dark:border-neutral-500">
                      <th scope="col" class="px-6 py-4">Firstname</th>
                      <th scope="col" class="px-6 py-4">Lastname</th>
                      <th scope="col" class="px-6 py-4">Civility</th>
                  </thead>
                  <tbody>
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

import usePersons from "../services/personservices.js";
import useDepartements from "../services/departementservices.js";
import { RouterLink } from 'vue-router';
import router from "../router";
import { ref, computed } from "vue";

const { persons, getPersons } = usePersons();
await getPersons();
const personCount = Object.keys(persons.value).length;
const { departements, getDepartements } = useDepartements();
await getDepartements();
// import { onMounted, ref } from "vue";
// import axios from "axios";

// const getPersons = async () => {
//     const result = await axios.get(``)
// }

// let personsList = ref([]);
// const getPersons = async () => {
//         const result = await axios.get(`${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_URL}`);
//         const personsData = await Promise.all(result);
      
//         personsData.forEach((value, index) => {
//             personsList.value[index] = value.data;
//         });
//     }
// await getPersons();


const redirectToPerson = (person) => {
  router.push({ name: 'person.detail', params: { id: person.id }});
}


// array of chosen filters
// const checkedFilterValues = ref(['testCheckbox', 'Aube', 'Charente-Maritime', 'Ain', 'Aisne']);
const checkedFilterValues = ref(departements.value.map(({ name }) => name));
// console.log(checkedFilterValues)
// console.log(departements)
// const newCheckedFilterValues = ref(departements.value.map(({ name }) => name));
// console.log(newCheckedFilterValues);


// checks if a filter is activated and add or remove it to the array
const checkFilters = (event) => {
    // console.log(event.target.checked);
    if(event.target.checked === true) {
        checkedFilterValues.value.push(event.target.id)
    }
    else {
        checkedFilterValues.value.splice(checkedFilterValues.value.indexOf(event.target.id), 1)
    }
    console.log('CHANGEMENT')
}

// returns my filtered list of people
const filteredPersons = computed(() => {
    
    return persons.value ? persons.value.filter(person =>{
        if (person.departements[0]){
            if (isInOurNeededList(person.departements) == true) {
                return true;
            }
        }
        return false
            // arriver ici signifie avoir réussi la condition pour filter, quoi qu'on y fasse visiblement
        //     departements.value.forEach(departement => {

        //         if (checkedFilterValues.value.includes(departement.name) && person.departements.filter(e => e.name === departement.name).length > 0) {
                    
        //             console.log('TEST PASSED SUCCESSFULLY')
        //             console.log('_______________>')
        //             console.log(departement.name)
        //             result = false;
        //             return false
        //         } else {
        //             console.log('TEST failed...')
        //             return false
        //         }

        //     });
        //     console.log(result);
        //     if(result = true) {
        //         return true;
        //     }
        //     return false;
        // // }
        // console.log('no departement defined for this person');
        // return false;

    }) : ''
})

const isInOurNeededList = (person_departement) => {
    let result = false;
    departements.value.forEach(departement => {
        if (checkedFilterValues.value.includes(departement.name) && person_departement.filter(e => e.name === departement.name).length > 0) {
            result = true;
            return result;
        }
    })
    if(result == true) {
        return true;
    }
    return false;
}

// <coach-filter @check-filter="updateDataByFilter" ></coach-filter>
</script>
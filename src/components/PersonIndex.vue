<template>
    <h1>This is the PersonIndex component.</h1>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                    <tr>
                    <th scope="col" class="px-6 py-4">#</th>
                    <th scope="col" class="px-6 py-4">Firstname</th>
                    <th scope="col" class="px-6 py-4">Lastname</th>
                    <th scope="col" class="px-6 py-4">other</th>
                    </tr>
                </thead>
                <tbody>
                    <div v-if="persons">
                        <tr v-for="person in persons" :key="person.id"
                        class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                            <td class="whitespace-nowrap px-6 py-4 font-medium">{{person.id}}</td>
                            <td class="whitespace-nowrap px-6 py-4">{{person.firstname}}</td>
                            <td class="whitespace-nowrap px-6 py-4">{{person.lastname}}</td>
                            <td class="whitespace-nowrap px-6 py-4">x</td>
                        </tr>
                    </div>
                    <div v-else>
                        <p>There is currently no people in here ! (maybe turn on the server...)</p>
                    </div>
                </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>  
</template>

<!-- here is where we would want to get link to API -->
<script>

import usePersons from "../services/personservices.js";
import { onMounted } from "vue";


export default {
    setup() {
        const { persons, getPersons } = usePersons();
        
        onMounted(getPersons);

        return {
            persons
        };
    }
    
}




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


</script>
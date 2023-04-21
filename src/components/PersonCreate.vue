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
            <label for="email" class="block">Email</label>
            <input type="text" id="email" v-model="form.email" class="text-black">
        </div>
        <div>
            <label for="phone" class="block">Phone</label>
            <input type="text" id="phone" v-model="form.phone" class="text-black">
        </div>
        <button type="submit" class="bg-blue-500 px-2 py61 text-white rounded">Create</button>
    </form>
</template>

<!-- here is where we would want to get link to API -->
<script>
import { reactive } from "vue";
import usePersons from "../services/personservices.js";

export default {
    setup() {
        const form = reactive({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
        });

        const { createPerson, errors } = usePersons();

        const storePerson = async () => {
            await createPerson({...form});
        };
 
        return {
            form,
            errors,
            storePerson
        };
    }
}



</script>
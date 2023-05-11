<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay" @click="toggleModale">
            
        </div>
        <div class="modale card border-black border bg-white rounded">
            <div class="btn-modale text-red-600 cursor-pointer" @click="toggleModale">X</div>
            <h2 class="text-black text-center font-bold text-2xl">Are you sure to delete this person ?</h2>
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
                <div class="bg-gray-300 border-gray-800 border cursor-pointer text-center p-1 rounded-full w-full" @click="toggleModale">Cancel</div>
                <div class="bg-red-500 border-2 border-red-800 cursor-pointer text-center p-1 rounded-full w-full font-bold" @click="removePerson">Yes, delete</div>
            </div>
        </div>
    </div>
  </template>
  
<script setup>
    const props = defineProps({
        revele: {
            required: true,
            type: Boolean, 
        },
        toggleModale: {},
        removePerson: {},
        id: {}
    });

    import usePersons from "../../services/personservices.js";
    const { getPerson, updatePerson, errors, person, deletePerson } = usePersons();
    console.log(props.id);
    await getPerson(props.id);
</script>


<style scoped>

.bloc-modale {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.overlay {
    background: rgba(0,0,0,0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}


.modale {
    background: #f1f1f1;
    color: #333;
    padding: 50px;
    position: fixed;
    top: 30%;
}

.btn-modale {
    position: absolute;
    top: 10px;
    right: 10px;
}
</style>
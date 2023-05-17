<template>
    <div class="bloc-modale" v-if="revele">
        <div class="overlay" @click="toggleModale">
        </div>

        <!-- PARTIE PERSON -->
        <div v-if="type=='person'" class="modale card border-black border bg-white rounded">
            <Suspense>
                <PersonDeleteModale :revele="props.revele" :toggleModale="props.toggleModale" :id="props.id" />
                <template #fallback>
                    Loading...
                </template>
            </Suspense>
        </div>
       
        <!-- PARTIE COMPANY -->
        <div v-if="type=='company'" class="modale card border-black border bg-white rounded">
            <Suspense>
                <CompanyDeleteModale :revele="props.revele" :toggleModale="props.toggleModale" :id="props.id" />
            <template #fallback>
                Loading...
            </template>
            </Suspense>
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
    id: {},
    type: {}
});

import PersonDeleteModale from "./components/PersonDeleteModale.vue";
import CompanyDeleteModale from "./components/CompanyDeleteModale.vue";

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


</style>
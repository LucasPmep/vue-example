<template>
    <main class="container text-white pt-4">
      <div class="flex flex-col gap-4 ml-auto mr-auto">
          Here is the create-person view, which calls to other components to display. 
          
          <Suspense>
            <PersonCreate />
            <template #fallback>
              <Loader />
            </template>
          </Suspense>
      </div>
    </main>
  </template>


<script setup>
import PersonCreate from '../components/PersonCreate.vue';
import Loader from "../components/Loader.vue";

</script>
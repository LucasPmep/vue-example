<template>
    <main class="container text-white pt-4">
      <div class="flex flex-col gap-4">
          Here is the person-list view, which calls to other components to display. 
          
          <Suspense>
            <AsyncComponent />
            <template #fallback>
              <p>Loading...</p>
            </template>
          </Suspense>
      </div>
    </main>
  </template>


<script setup>
import AsyncComponent from "../components/PersonList.vue";
</script>
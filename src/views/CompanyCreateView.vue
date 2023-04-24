<template>
    <main class="container text-white pt-4">
      <div class="flex flex-col gap-4">
          Here is the company-create view, which calls to other components to display. 
          
          <Suspense>
            <CompanyCreate />
            <template #fallback>
              <p>Loading...</p>
            </template>
          </Suspense>
      </div>
    </main>
  </template>


<script setup>
import CompanyCreate from '../components/CompanyCreate.vue';


</script>
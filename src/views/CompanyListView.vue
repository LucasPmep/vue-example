<template>
    <main class="container text-white pt-4">
      <div class="flex flex-col gap-4">
          Here is the new company view, which calls to other components to display. 
          
          <Suspense>
            <CompanyList />
            <template #fallback>
              <p>Loading...</p>
            </template>
          </Suspense>
      </div>
    </main>
  </template>


<script setup>
import CompanyList from '../components/CompanyList.vue';


</script>
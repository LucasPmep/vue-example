<template>
    <main class="container text-white pt-4">
      <div class="flex flex-col gap-4 ml-auto mr-auto">
          Here is the new company-list view, which calls to other components to display. 
          
          <Suspense>
            <CompanyList />
            <template #fallback>
              <Loader />
            </template>
          </Suspense>
      </div>
    </main>
  </template>


<script setup>
import CompanyList from '../components/CompanyList.vue';
import Loader from "../components/Loader.vue";

</script>
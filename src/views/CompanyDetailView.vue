<template>
    <main class="container text-white pt-4">
      <div class="flex flex-col gap-4 ml-auto mr-auto">
          Here is the detail-company view, which calls to other components to display. 
          
          <Suspense>
            <template #default>
            <AsyncComponent :id="id"/>
          </template>
            <template #fallback>
              <Loader />
            </template>
          </Suspense>
      </div>
    </main>
  </template>


<script setup>
const props = defineProps({
    id: {
        required: true,
        type: String, 
    }
});

import AsyncComponent from "../components/CompanyDetail.vue";
import Loader from "../components/Loader.vue";
</script>
<template>
    <main class="container text-white pt-4">
      <div class="flex flex-col gap-4 ml-auto mr-auto">
          Here is the detail-person view, which calls to other components to display. 
          
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
// import { defineAsyncComponent } from "vue";

const props = defineProps({
    id: {
        required: true,
        type: String, 
    }
});

import AsyncComponent from "../components/PersonDetail.vue";
import Loader from "../components/Loader.vue";
// const AsyncComponent = defineAsyncComponent(() => {
//   import('../components/PersonDetail.vue')
// })

// const AsyncComponent = defineAsyncComponent({
//   loader: () => import ('../components/PersonDetail.vue'),
//   loadingComponent: 'LOADING...',
//   suspensible: true
// })


</script>
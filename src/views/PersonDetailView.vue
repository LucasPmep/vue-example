<template>
    <main class="container text-white pt-4">
      <div class="flex flex-col gap-4">
          Here is the detail-person view, which calls to other components to display. 
          
          <Suspense>
            <PersonDetail :id="id"/>
            <template #fallback>
              <p>Loading...</p>
            </template>
          </Suspense>
      </div>
    </main>
  </template>


<script setup>
import PersonDetail from '../components/PersonDetail.vue';
const props = defineProps({
    id: {
        required: true,
        type: String, 
    }
});

</script>
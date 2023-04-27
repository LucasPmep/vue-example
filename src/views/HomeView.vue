<template>
    <main class="container text-white pt-4">
      <div class="flex flex-col gap-4">
          <div class="m-6 leading-none text-9xl font-extrabold text-center">
            Dashboard
          </div>
          
          <Suspense>
            <template #default>
            <Dashboard />
          </template>
            <template #fallback>
              <p>Loading...</p>
            </template>
          </Suspense>
      </div>
    </main>
  </template>


<script setup>
import Dashboard from '../components/Dashboard.vue';



</script>
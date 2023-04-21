<template>
    <main class="container text-white pt-4">
      <div class="flex flex-col gap-4">
          Here is the classic home view, which calls to other components to display. 
          
          <Suspense>
            <h1>DASHBOARD</h1>
            <template #fallback>
              <p>Loading...</p>
            </template>
          </Suspense>
      </div>
    </main>
  </template>


<script setup>


</script>
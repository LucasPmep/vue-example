<script setup>
import { RouterView } from "vue-router";
import NavigationBar from "./components/NavigationBar.vue"
</script>

<template>
    <div class="flex flex-col min-h-screen font-Roboto bg-slate-500">
      <NavigationBar />
      <RouterView />
    </div>
</template>
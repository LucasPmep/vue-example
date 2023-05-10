<template>
    <div>
      <ul>
        <li v-for="post in laravelData.data" :key="post.id">{{ post.firstname }}  {{ post.lastname }}</li>
      </ul>
      <!-- <Bootstrap5Pagination
          :data="laravelData"
          @pagination-change-page="getResults"
      /> -->
      <Pagination 
      :data="laravelData"
      @pagination-change-page="getResults"/>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import Pagination from "./pagination/Pagination.vue";
  const laravelData = ref({});
  
  const getResults = async (page = 1) => {
      const response = await fetch(`http://localhost:8000/api/persons?page=${page}`);
      laravelData.value = await response.json();
      console.log(laravelData)
  }
  
  getResults();
  </script>
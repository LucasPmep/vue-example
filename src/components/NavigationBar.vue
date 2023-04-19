<template>
    <header class="sticky top-0 shadow-lg">
        <div class="container flex flex-col items-center pt-2 pb-2 text-white">
            <nav class="flex flex-row gap-4">
                <RouterLink :to="{ name: 'home'}">
                    <div class="flex items-center gap-3">
                        <p class="text-xl">Home</p>
                    </div>
                </RouterLink>
                <RouterLink :to="{ name: 'home'}">
                    <div class="flex items-center gap-3">
                        <p class="text-xl">Companies</p>
                    </div>
                </RouterLink>
                <RouterLink :to="{ name: 'home'}">
                    <div class="flex items-center gap-3">
                        <p class="text-xl">People</p>
                    </div>
                </RouterLink>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
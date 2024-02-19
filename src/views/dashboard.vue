<script setup>
import navbar from '../components/navbar.vue';
</script>
<template>
    <main role="main" class="container">
        <navbar></navbar>
        <h1>{{ $route.params.username }}</h1>
    </main>
</template>

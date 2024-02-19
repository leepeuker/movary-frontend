<script setup>
import navbar from '../components/navbar.vue';
</script>
<template>
    <main role="main" class="container">
        <navbar></navbar>
        <div style="text-align: center; padding-bottom: 1rem">
            <br />
            <h1 class="fw-normal" style="font-size: 8rem">404</h1>
            <h4 style="margin-bottom: 0.8rem">Page not found :(</h4>
            <a @click="$router.back()">back</a>
        </div>
    </main>
</template>

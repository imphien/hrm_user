<template>
  <router-view></router-view>
</template>

<script setup>
    import { onMounted } from 'vue';
    import router from "@/router";

    onMounted(() => {
      localStorage.removeItem('token');
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login')
      }
    })
</script>

<style>
  body {
    background: #f7f8f8 !important;
  }
</style>

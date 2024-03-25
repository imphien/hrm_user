<template>
    <header-component></header-component>
    <sidebar-component></sidebar-component>
    <router-view></router-view>
</template>
<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import SidebarComponent from '@/components/SidebarComponent.vue'
</script>
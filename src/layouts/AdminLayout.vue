<template>
    <header-component></header-component>
    <div class="content container-fluid position-fixed">
      <div class="row">
        <sidebar-component></sidebar-component>
        <router-view></router-view>
      </div>
    </div>
</template>
<script setup>
    import HeaderComponent from '@/components/HeaderComponent.vue'
    import SidebarComponent from '@/components/SidebarComponent.vue'
</script>
<style>
  .content {
    top: 114px;
  }
</style>
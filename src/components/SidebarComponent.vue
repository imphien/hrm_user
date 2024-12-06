<template>
    <div class="sidebar col-2 pt-4 px-3 bg-white">
        <ul class="list-group">
            <li class="list-group-item">
              <router-link :to="{ name: 'recruitments' }" class="text-decoration-none text-dark">Tuyển dụng</router-link>
            </li>
            <li class="list-group-item">
              <router-link :to="{ name: 'notifications' }" class="text-decoration-none text-dark">Thông báo</router-link>
            </li>
            <li class="list-group-item">
              <router-link :to="{ name: 'approvals' }" class="text-decoration-none text-dark">Đơn từ</router-link>
            </li>
            <li class="list-group-item">
              <router-link :to="{ name: 'timekeeping' }" class="text-decoration-none text-dark">Chấm công</router-link>
            </li>
            <li class="list-group-item">
              <router-link :to="{ name: 'salaries' }" class="text-decoration-none text-dark">Lương</router-link>
            </li>
        </ul>
    </div>
</template>
<style>
  .sidebar {
    height: calc(100vh - 114px);
  }
</style>
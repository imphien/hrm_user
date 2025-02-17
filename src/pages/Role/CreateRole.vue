<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4 pb-4">Tạo quyền</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component class="mb-2" title="Tên quyền" @data="timekeepingInfo.name = $event"></input-component>
      </div>
    </div>
    <div class="text-center mt-5">
      <button type="button" class="btn btn-primary me-3 px-4" @click="creatRecruitment()">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>
<script setup>
import InputComponent from '@/components/InputComponent.vue'
import {ref} from "vue";
import api from "@/api";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

const timekeepingInfo = ref({
  name : '',
})

const errorMessage = ref('');

const creatRecruitment = async () => {
  try {
    timekeepingInfo.value.guard_name = 'User';
    await api.post('roles', timekeepingInfo.value);
    location.reload();
  } catch (err) {
    errorMessage.value = err.response?.data?.errors || "Có lỗi xảy ra.";
  }
};
</script>
<style scoped>
.content {
  width: 815px;
  height: 450px;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dee2e6;
}

select {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

.status-selected {
  width: 162px !important;
}
</style>
<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Tạo mới thông báo</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component class="mb-2" title="Ngày bắt đầu" @data="notificationInfo.start_date = $event"></input-component>
        <input-component class="mb-2" title="Ngày kết thúc" @data="notificationInfo.end_date = $event"></input-component>
      </div>
      <div>
        <input-component class="mb-2" title="Nội dung" @data="notificationInfo.content = $event"></input-component>
      </div>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="createNotification">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>
<script setup>
import InputComponent from '@/components/InputComponent.vue'
import {ref} from "vue";
import {config} from "@/Common/app.config.ts";
import axios from "axios";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

const notificationInfo = ref({
  content : '',
  start_date : '',
  end_date: '',
})

const errorMessage = ref('');

const createNotification = async () => {
  try {
    await axios.post(
        `${config.apiUrl}notifications`, notificationInfo.value
    )
    location.reload();
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}
</script>
<style scoped>
.content {
  width: 750px;
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
</style>
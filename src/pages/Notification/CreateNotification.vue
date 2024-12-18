<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Tạo mới thông báo</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <div class="d-flex pb-2">
          <span class="input-title fw-medium">Ngày bắt đầu</span>
          <Datepicker
              v-model="startDate"
              placeholder="Chọn ngày hết hạn"
              class="p-2"
              :disabled-dates="disablePastDates"
          />
        </div>
        <div class="d-flex pb-2">
          <span class="input-title fw-medium">Ngày kết thúc</span>
          <Datepicker
              v-model="endDate"
              placeholder="Chọn ngày hết hạn"
              class="p-2"
              :disabled-dates="disablePastDates"
          />
        </div>
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
import Datepicker from "vue3-datepicker";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

const notificationInfo = ref({
  content : '',
  start_date : '',
  end_date: '',
})
const startDate = ref('');
const endDate = ref('');

const errorMessage = ref('');

const createNotification = async () => {
  try {
    const payload = { ...notificationInfo.value };

    if (startDate.value instanceof Date) {
      const adjustedDate = new Date(
          startDate.value.getTime() + Math.abs(startDate.value.getTimezoneOffset() * 60000)
      );
      payload.start_date = adjustedDate.toISOString().split("T")[0];
    }

    if (endDate.value instanceof Date) {
      const adjustedDate = new Date(
          endDate.value.getTime() + Math.abs(endDate.value.getTimezoneOffset() * 60000)
      );
      payload.end_date = adjustedDate.toISOString().split("T")[0];
    }

    await axios.post(
        `${config.apiUrl}notifications`, payload
    )
    location.reload();
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}

const disablePastDates = {
  predicate: (currentDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return currentDate < today;
  },
};
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
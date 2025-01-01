<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Tạo mới thông báo</h1>
    <div class="mx-4">
      <div class="date mx-4 d-flex">
        <div>
          <div class="d-flex pb-2">
            <span class="input-title fw-medium">Ngày bắt đầu</span>
            <Datepicker
                v-model="startDate"
                placeholder="Chọn ngày bắt đầu"
                class="p-2"
                :disabled-dates="disablePastDates"
                :clearable="true"
            />
          </div>
          <p v-if="errors.start_date" class="text-danger">{{ errors.start_date }}</p>
        </div>

        <div>
          <div class="d-flex pb-2">
            <span class="input-title fw-medium">Ngày kết thúc</span>
            <Datepicker
                v-model="endDate"
                placeholder="Chọn ngày kết thúc"
                class="p-2"
                :disabled-dates="disablePastDates"
                :clearable="true"
            />
          </div>
          <p v-if="errors.end_date" class="text-danger">{{ errors.end_date }}</p>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column mx-5">
      <span class="input-title fw-medium mb-2">Nội dung</span>
      <textarea
          class="form-control resize-none"
          :rows="3"
          v-model="notificationInfo.content"
      ></textarea>
      <p v-if="errors.content" class="text-danger">{{ errors.content }}</p>
    </div>

    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="createNotification">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { config } from "@/Common/app.config.ts";
import axios from "axios";
import Datepicker from "vue3-datepicker";

// eslint-disable-next-line no-undef
defineEmits(['isShow']);

const notificationInfo = ref({
  content: '',
  start_date: '',
  end_date: '',
});
const startDate = ref('');
const endDate = ref('');
const errors = ref({}); // Đối tượng lưu lỗi

const errorMessage = ref('');

const createNotification = async () => {
  // Reset lỗi
  errors.value = {};

  // Validate các trường
  let isValid = true;

  if (!startDate.value) {
    errors.value.start_date = "Không được để trống ngày bắt đầu";
    isValid = false;
  }
  if (!endDate.value) {
    errors.value.end_date = "Không được để trống ngày kết thúc";
    isValid = false;
  }
  if (!notificationInfo.value.content) {
    errors.value.content = "Không được để trống nội dung";
    isValid = false;
  }

  // Nếu có lỗi, dừng xử lý
  if (!isValid) return;

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
    );
    location.reload();
  } catch (err) {
    errorMessage.value = err.response?.data.errors || "Đã xảy ra lỗi khi tạo thông báo.";
  }
};

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

.date {
  gap: 28px;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>

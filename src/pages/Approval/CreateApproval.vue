<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Tạo mới đơn</h1>
    <div class="d-flex mx-4 justify-content-between flex-column">
      <div class="mx-4 mb-3">
        <div class="d-flex">
          <span class="input-title fw-medium text-nowrap">Loại đơn</span>
          <select class="status-selected form-select w-50" id="status" name="status" v-model="selectType">
            <option value="" disabled>Chọn loại đơn</option>
            <option v-for="(typeName, typeId) in types" :value="typeId" :key="typeId">{{ typeName }}</option>
          </select>
        </div>
        <p v-if="errors.type" class="text-danger">{{ errors.type }}</p>
      </div>
      <div class="mx-4" v-if="!isTypeResignation">
        <div class="d-flex justify-content-between mb-3">
          <div>
            <div class="d-flex">
              <span class="input-title fw-medium text-nowrap">Thời gian bắt đầu</span>
              <select class="form-select mt-2 input-time" v-model="startTime">
                <option value="" disabled>Chọn giờ</option>
                <option v-for="time in times" :key="time" :value="time">
                  {{ time }}
                </option>
              </select>
            </div>
            <p v-if="errors.start_time" class="text-danger">{{ errors.start_time }}</p>
          </div>

          <div>
            <div class="d-flex">
              <span class="input-title fw-medium text-nowrap">Thời gian kết thúc</span>
              <select class="form-select mt-2 input-time" v-model="endTime">
                <option value="" disabled>Chọn giờ</option>
                <option v-for="time in times" :key="time" :value="time">
                  {{ time }}
                </option>
              </select>
            </div>
            <p v-if="errors.end_time" class="text-danger">{{ errors.end_time }}</p>
          </div>
        </div>
        <div class="d-flex justify-content-between">
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
      <div class="mx-4">
        <div class="d-flex flex-column">
          <span class="input-title fw-medium mb-2">Lý do</span>
          <textarea class="form-control resize-none" :rows="!isTypeResignation ? 3 : 6" v-model="approvalInfo.content"></textarea>
        </div>
        <p v-if="errors.content" class="text-danger">{{ errors.content }}</p>
      </div>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="createApproval">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import Datepicker from "vue3-datepicker";
import api from "@/api";

// eslint-disable-next-line no-undef
defineEmits(['isShow']);

const approvalInfo = ref({
  content: '',
  start_date: '',
  end_date: '',
  user_id: '',
  type: '',
  start_time: '',
  end_time: '',
});
const startDate = ref('');
const endDate = ref('');
const endTime = ref('');
const startTime = ref('');
const selectType = ref('');
const errors = ref({}); // Đối tượng lưu lỗi
const types = ref({
  1: 'Đơn xin nghỉ phép',
  2: 'Đơn xin nghỉ việc',
  3: 'Đơn chấm công',
});

const times = [
  "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30",
  "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30",
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "24:00"
];

const isTypeResignation = computed(() => {
  return selectType.value === '2';
});

const errorMessage = ref('');

const createApproval = async () => {
  // Reset lỗi
  errors.value = {};

  // Validate các trường
  let isValid = true;

  if (!selectType.value) {
    errors.value.type = "Vui lòng chọn loại đơn.";
    isValid = false;
  }

  if (!approvalInfo.value.content) {
    errors.value.content = "Lý do không được để trống.";
    isValid = false;
  }

  if (!isTypeResignation.value) {
    if (!startTime.value) {
      errors.value.start_time = "Thời gian bắt đầu không được để trống.";
      isValid = false;
    }

    if (!endTime.value) {
      errors.value.end_time = "Thời gian kết thúc không được để trống.";
      isValid = false;
    }

    if (!startDate.value) {
      errors.value.start_date = "Ngày bắt đầu không được để trống.";
      isValid = false;
    }

    if (!endDate.value) {
      errors.value.end_date = "Ngày kết thúc không được để trống.";
      isValid = false;
    }
  }

  if (!isValid) return;

  try {
    const payload = { ...approvalInfo.value };

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

    const storedUser = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(storedUser);
    payload.user_id = currentUser.id;
    payload.type = selectType.value;
    payload.start_time = startTime.value;
    payload.end_time = endTime.value;

    await api.post('approvals', payload);
    location.reload();
  } catch (err) {
    errorMessage.value = err.response?.data.errors || "Đã xảy ra lỗi.";
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
  height: 600px;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dee2e6;
}

.input-time {
  max-height: 100px;
  overflow-y: auto;
  appearance: none;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.resize-none {
  resize: none;
}

.text-danger {
  margin-bottom: 0;
}
</style>

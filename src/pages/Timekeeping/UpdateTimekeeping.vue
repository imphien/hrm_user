<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4 pb-4">Thông tin công</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <div class="d-flex">
          <span class="input-title fw-medium">Ngày</span>
          <Datepicker
              v-model="timekeepingInfo.date"
              placeholder="Chọn ngày hết hạn"
              class="p-2"
          />
        </div>
      </div>
      <div class="mx-4">
        <div class="d-flex justify-content-between pb-2">
          <span class="input-title fw-medium">Chấm công</span>
          <select
              class="role-selected form-select"
              id="roles"
              name="roles"
              v-model="timekeepingInfo.type"
          >
            <option v-for="(typeName, typeId) in types" :value="typeId" :key="typeId">{{ typeName }}</option>
          </select>
        </div>
        <input-component class="mb-2" title="Thời gian bắt đầu" :value="timekeepingInfo.start_time" @data="timekeepingInfo.start_time = $event"></input-component>

        <input-component class="mb-2" title="Thời gian kết thúc" :value="timekeepingInfo.end_time" @data="timekeepingInfo.end_time = $event"></input-component>
      </div>
    </div>
    <div class="text-center mt-5">
      <button type="button" class="btn btn-primary me-3 px-4" @click="updateRecruitment(timekeepingInfo.id)">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>
<script setup>
import InputComponent from '@/components/InputComponent.vue'
import {ref} from "vue";
import {config} from "@/Common/app.config.ts";
import Datepicker from 'vue3-datepicker';
import api from "@/api";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

// eslint-disable-next-line no-undef
const props = defineProps(['timekeeping']);

const timekeepingInfo = ref({
  id: props.timekeeping.id,
  date : new Date(props.timekeeping.date),
  type : props.timekeeping.type,
  hours: props.timekeeping.hours,
  user_id: props.timekeeping.user_id,
  start_time: props.timekeeping.start_time,
  end_time: props.timekeeping.end_time,
})
const types = ref({
  1: 'Công thường',
  2: 'Tăng ca',
});

const convertToMinutes = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 60 + minutes + Math.floor(seconds / 60);
};

const calculateHours = (start, end) => {
  const startMinutes = convertToMinutes(start);
  const endMinutes = convertToMinutes(end);

  const totalMinutes =
      endMinutes >= startMinutes
          ? endMinutes - startMinutes
          : 24 * 60 - startMinutes + endMinutes;

  const hours = totalMinutes / 60;
  return parseFloat(hours.toFixed(1));
};

const errorMessage = ref('');

const updateRecruitment = async (timekeepingId) => {
  try {
    const payload = { ...timekeepingInfo.value };

    if (payload.date instanceof Date) {
      const adjustedDate = new Date(
          payload.date.getTime() + Math.abs(payload.date.getTimezoneOffset() * 60000)
      );
      payload.date = adjustedDate.toISOString().split('T')[0];
    }

    payload.hours = calculateHours(
        payload.start_time,
        payload.end_time
    );

    await api.put(
        `${config.apiUrl}timekeeping/${timekeepingId}`, payload
    )
    location.reload();
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}
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
</style>
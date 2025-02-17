<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4 pb-4">Tạo thông tin công</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component class="mb-2" title="Mã nhân viên" @data="timekeepingInfo.user_id = $event"></input-component>
        <div>
          <div class="d-flex pb-2">
            <span class="input-title fw-medium">Ngày bắt đầu</span>
            <Datepicker
                v-model="date"
                placeholder="Chọn ngày"
                class="p-2"
                :clearable="true"
            />
          </div>
        </div>
      </div>
      <div class="mx-4">
        <input-component class="mb-2" title="Thời gian bắt đầu" @data="timekeepingInfo.start_time = $event"></input-component>

        <input-component class="mb-2" title="Thời gian kết thúc" @data="timekeepingInfo.end_time = $event"></input-component>
        <div class="d-flex">
          <span class="input-title fw-medium text-nowrap">Loại công</span>
          <select class="status-selected form-select w-50" id="status" name="status" v-model="selectType">
            <option value="" disabled>Chọn loại công</option>
            <option v-for="(typeName, typeId) in types" :value="typeId" :key="typeId">{{ typeName }}</option>
          </select>
        </div>
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
import Datepicker from "vue3-datepicker";
import api from "@/api";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

const timekeepingInfo = ref({
  date : '',
  type : '',
  user_id: '',
  hours: '',
  start_time: '',
  end_time: '',
})
const selectType = ref('');
const date = ref('');
const types = ref({
  1: 'Công thường',
  2: 'Tăng ca',
});

const errorMessage = ref('');
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

const creatRecruitment = async () => {
  try {
    if (date.value instanceof Date) {
      const adjustedDate = new Date(
          date.value.getTime() + Math.abs(date.value.getTimezoneOffset() * 60000)
      );
      timekeepingInfo.value.date = adjustedDate.toISOString().split("T")[0];
    }

    timekeepingInfo.value.type = selectType.value;

    timekeepingInfo.value.hours = calculateHours(
        timekeepingInfo.value.start_time,
        timekeepingInfo.value.end_time
    );

    await api.post('timekeeping', timekeepingInfo.value);
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
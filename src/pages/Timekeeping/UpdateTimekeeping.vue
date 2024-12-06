<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4 pb-4">Thông tin công</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component class="mb-2" title="Họ và tên" :value="timekeepingInfo.user.full_name" @data="timekeepingInfo.user.full_name = $event"></input-component>
        <input-component class="mb-2" title="Ngày" :value="timekeepingInfo.date" @data="timekeepingInfo.date = $event"></input-component>
      </div>
      <div class="mx-4">
        <input-component class="mb-2" title="Giờ" :value="timekeepingInfo.hours" @data="timekeepingInfo.hours = $event"></input-component>
        <input-component class="mb-2" title="Chấm công" :value="timekeepingInfo.type" @data="timekeepingInfo.type = $event"></input-component>
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
import axios from "axios";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

// eslint-disable-next-line no-undef
const props = defineProps(['timekeeping']);

const timekeepingInfo = ref({
  id: props.timekeeping.id,
  date : props.timekeeping.date,
  type : props.timekeeping.type,
  hours: props.timekeeping.hours,
  user: props.timekeeping.user,
})

const errorMessage = ref('');

const updateRecruitment = async (timekeepingId) => {
  try {
    await axios.put(
        `${config.apiUrl}timekeeping/${timekeepingId}`, timekeepingInfo.value
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
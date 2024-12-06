<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Thông tin tuyển dụng</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component class="mb-2" title="Vị trí" :value="salaryInfo.position" @data="salaryInfo.position = $event"></input-component>
        <input-component class="mb-2" title="Số lượng" :value="salaryInfo.quantity" @data="salaryInfo.quantity = $event"></input-component>
        <input-component class="mb-2" title="Nội dung" :value="salaryInfo.content" @data="salaryInfo.content = $event"></input-component>
      </div>
      <div>
        <input-component class="mb-2" title="Yêu cầu" :value="salaryInfo.content" @data="salaryInfo.content = $event"></input-component>
        <input-component class="mb-2" title="Ngày hết hạn" :value="salaryInfo.expired" @data="salaryInfo.expired = $event"></input-component>
      </div>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="updatesalary(salaryInfo.id)">Lưu</button>
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
const props = defineProps(['salary']);

const salaryInfo = ref({
  id: props.salary.id,
  content : props.salary.content,
  quantity : props.salary.quantity,
  position: props.salary.position,
  requirement: props.salary.requirement,
  expired: props.salary.expired,
})

const errorMessage = ref('');

const updatesalary = async (salaryId) => {
  try {
    await axios.put(
        `${config.apiUrl}salaries/${salaryId}`, salaryInfo.value
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
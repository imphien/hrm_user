<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Cập nhập lương</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component class="mb-2" title="Lương" :value="salaryInfo.salary" @data="salaryInfo.salary = $event"></input-component>
        <input-component class="mb-2" title="Trợ cấp" :value="salaryInfo.allowance" @data="salaryInfo.allowance = $event"></input-component>
      </div>
      <div>
        <input-component class="mb-2" title="Khoản trừ" :value="salaryInfo.dedution" @data="salaryInfo.dedution = $event"></input-component>
        <input-component class="mb-2" title="Thưởng thêm" :value="salaryInfo.bonus" @data="salaryInfo.bonus = $event"></input-component>
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
import api from "@/api";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

// eslint-disable-next-line no-undef
const props = defineProps(['salary']);

const salaryInfo = ref({
  id: props.salary.id,
  salary : props.salary.salary,
  allowance : props.salary.allowance,
  dedution: props.salary.dedution,
  bonus: props.salary.bonus,
})

const errorMessage = ref('');

const updatesalary = async (salaryId) => {
  try {
    await api.put(
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
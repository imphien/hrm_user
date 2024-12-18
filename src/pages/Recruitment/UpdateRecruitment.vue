<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Thông tin tuyển dụng</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <div class="d-flex justify-content-between pb-2">
          <span class="input-title fw-medium">Vai trò</span>
          <select class="role-selected form-select" id="roles" name="roles" v-model="recruitmentInfo.role_id">
            <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
          </select>
        </div>
        <input-component class="mb-2" title="Số lượng" :value="recruitmentInfo.quantity" @data="recruitmentInfo.quantity = $event"></input-component>
        <input-component class="mb-2" title="Nội dung" :value="recruitmentInfo.content" @data="recruitmentInfo.content = $event"></input-component>
      </div>
      <div>
        <div>
          <input-component class="mb-2" title="Yêu cầu" :value="recruitmentInfo.requirement" @data="recruitmentInfo.requirement = $event"></input-component>
          <div class="d-flex">
            <span class="input-title fw-medium">Ngày hết hạn</span>
            <Datepicker
                v-model="recruitmentInfo.expired"
                placeholder="Chọn ngày hết hạn"
                class="p-2"
                :disabled-dates="disablePastDates"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="updateRecruitment(recruitmentInfo.id)">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>
<script setup>
import InputComponent from '@/components/InputComponent.vue'
import {onMounted, ref} from "vue";
import {config} from "@/Common/app.config.ts";
import axios from "axios";
import Datepicker from "vue3-datepicker";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

// eslint-disable-next-line no-undef
const props = defineProps(['recruitment']);

const recruitmentInfo = ref({
  id: props.recruitment.id,
  content : props.recruitment.content,
  quantity : props.recruitment.quantity,
  role_id: props.recruitment.role_id,
  requirement: props.recruitment.requirement,
  expired: new Date(props.recruitment.expired),
})

const roles = ref([]);

const errorMessage = ref('');

onMounted(() => {
  getListRoles();
})

const updateRecruitment = async (recruitmentId) => {
  try {
    const payload = { ...recruitmentInfo.value };

    if (payload.expired instanceof Date) {
      const adjustedDate = new Date(
          payload.expired.getTime() + Math.abs(payload.expired.getTimezoneOffset() * 60000)
      );
      payload.expired = adjustedDate.toISOString().split("T")[0];
    }

    await axios.put(
        `${config.apiUrl}recruitments/${recruitmentId}`, payload
    )
    location.reload();
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}

const getListRoles = async () => {
  try {
    const response = await axios.get(
        `${config.apiUrl}roles`,
    )
    roles.value = response.data.data
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
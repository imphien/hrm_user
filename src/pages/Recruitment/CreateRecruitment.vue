<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Tạo mới thông tin tuyển dụng</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <div class="d-flex justify-content-between pb-2">
          <span class="input-title fw-medium">Vai trò</span>
          <select class="role-selected form-select" id="roles" name="roles" v-model="recruitmentInfo.role_id">
            <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
          </select>
        </div>
        <input-component class="mb-2" title="Vị trí" @data="recruitmentInfo.position = $event"></input-component>
        <input-component class="mb-2" title="Số lượng" type="number" @data="recruitmentInfo.quantity = $event"></input-component>
        <input-component class="mb-2" title="Nội dung" @data="recruitmentInfo.content = $event"></input-component>
      </div>
      <div>
        <input-component class="mb-2" title="Yêu cầu" @data="recruitmentInfo.requirement = $event"></input-component>
        <div class="d-flex">
          <span class="input-title fw-medium">Ngày hết hạn</span>
          <Datepicker
              v-model="dateExpired"
              placeholder="Chọn ngày hết hạn"
              class="p-2"
              :disabled-dates="disablePastDates"
          />
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="createRecruitment">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>
<script setup>
import InputComponent from '@/components/InputComponent.vue'
import {onMounted, ref} from "vue";
import Datepicker from "vue3-datepicker";
import api from "@/api";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

const dateExpired = ref('');
const roles = ref([]);

const recruitmentInfo = ref({
  content : '',
  quantity : '',
  role_id: '',
  requirement: '',
  expired: '',
})

const errorMessage = ref('');

onMounted(() => {
  getListRoles();
});

const createRecruitment = async () => {
  try {
    const date = new Date(dateExpired.value);
    recruitmentInfo.value.expired =  new Intl.DateTimeFormat('en-CA').format(date);
    await api.post('recruitments', recruitmentInfo.value)
    location.reload();
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}

const getListRoles = async () => {
  try {
    const response = await api.get('roles');
    roles.value = response.data.data;
  } catch (err) {
    errorMessage.value = err.response?.data.errors;
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

.input-title {
  padding: 6px 20px 0 0;
}
</style>
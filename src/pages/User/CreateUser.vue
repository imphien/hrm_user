<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Tạo tài khoản nhân viên</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component
            class="mb-2"
            title="Họ và tên"
            @data="userInfo.full_name = $event"
        ></input-component>
        <p v-if="errors.full_name" class="text-danger">{{ errors.full_name }}</p>

        <div class="d-flex mb-2">
          <span class="title-birthday fw-medium">Ngày sinh</span>
          <Datepicker
              v-model="birthday"
              placeholder="Chọn ngày sinh"
              class="p-2"
              :disabled-dates="disablePastDates"
              :clearable="true"
          />
        </div>
        <p v-if="errors.birthday" class="text-danger">{{ errors.birthday }}</p>

        <div class="d-flex mb-2 fw-medium">
          <span class="select-title fw-medium">Giới tính</span>
          <select
              class="role-selected select-data form-select"
              id="sex"
              name="sex"
              v-model="userInfo.sex"
          >
            <option value="" selected disabled>Chọn giới tính</option>
            <option :value="0">Nam</option>
            <option :value="1">Nữ</option>
          </select>
        </div>
        <p v-if="errors.sex" class="text-danger">{{ errors.sex }}</p>

        <input-component
            class="mb-2"
            title="Tên hệ thống"
            @data="userInfo.username = $event"
        ></input-component>
        <p v-if="errors.username" class="text-danger">{{ errors.username }}</p>
      </div>
      <div>
        <input-component
            class="mb-2"
            title="Số điện thoại"
            @data="userInfo.phone = $event"
        ></input-component>
        <p v-if="errors.phone" class="text-danger">{{ errors.phone }}</p>

        <input-component
            class="mb-2"
            title="Email"
            @data="userInfo.email = $event"
        ></input-component>
        <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>

        <div class="d-flex justify-content-between pb-2">
          <span class="input-title fw-medium">Vai trò</span>
          <select
              class="role-selected form-select"
              id="roles"
              name="roles"
              v-model="userInfo.role"
          >
            <option value="">Chọn vai trò</option>
            <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
          </select>
        </div>
        <p v-if="errors.role_id" class="text-danger">{{ errors.role_id }}</p>
      </div>
    </div>
    <div class="d-flex flex-column mx-5">
      <span class="input-title fw-medium mb-2">Địa chỉ</span>
      <textarea
          class="form-control resize-none"
          :rows="3"
          v-model="userInfo.address"
      ></textarea>
      <p v-if="errors.address" class="text-danger">{{ errors.address }}</p>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="createUser">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
  <LoadingComponent :visible="loading" />
</template>

<script setup>
import InputComponent from '@/components/InputComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import {onMounted, ref} from 'vue';
import Datepicker from "vue3-datepicker";
import api from "@/api";

// eslint-disable-next-line no-undef
defineEmits(['isShow']);

const userInfo = ref({
  full_name: '',
  birthday: '',
  sex: '',
  phone: '',
  email: '',
  address: '',
  username: '',
  password: '',
  role: '',
});

const errors = ref({});
const errorMessage = ref('');
const birthday = ref('');
const roles = ref([]);
const loading = ref(false);

onMounted(() => {
  getListRoles();
});

const createUser = async () => {
  errors.value = {};

  let isValid = true;

  if (!userInfo.value.full_name) {
    errors.value.full_name = 'Họ và tên không được để trống.';
    isValid = false;
  }

  if (!birthday.value) {
    errors.value.birthday = 'Ngày sinh không được để trống.';
    isValid = false;
  }

  if (!userInfo.value.sex && userInfo.value.sex !== 0) {
    errors.value.sex = 'Vui lòng chọn giới tính.';
    isValid = false;
  }

  if (!userInfo.value.username) {
    errors.value.username = 'TK Đăng nhập không được để trống.';
    isValid = false;
  }

  if (!userInfo.value.phone) {
    errors.value.phone = 'Số điện thoại không được để trống.';
    isValid = false;
  }

  if (!userInfo.value.address) {
    errors.value.address = 'Địa chỉ không được để trống.';
    isValid = false;
  }

  if (!userInfo.value.email) {
    errors.value.email = 'Email không được để trống.';
    isValid = false;
  }

  if (!userInfo.value.email) {
    errors.value.email = "Email không được để trống.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userInfo.value.email)) {
    errors.value.email = "Email không hợp lệ.";
    isValid = false;
  }

  if (!userInfo.value.role) {
    errors.value.role = 'Vai trò không được để trống.';
    isValid = false;
  }

  if (!isValid) return;

  try {
    const date = new Date(birthday.value);
    userInfo.value.birthday = new Intl.DateTimeFormat('en-CA').format(date);
    userInfo.value.password = userInfo.value.username + userInfo.value.phone;

    await api.post('users', userInfo.value);
    location.reload();
  } catch (err) {
    errorMessage.value = err.response?.data.errors || 'Đã xảy ra lỗi.';
  }
};

const getListRoles = async () => {
  try {
    loading.value = true;
    const response = await api.get('roles');
    roles.value = response.data.data;
  } catch (err) {
    errors.value.apiError = err.response?.data.errors || 'Không thể tải danh sách vai trò.';
  } finally {
    loading.value = false;
  }
};

const disablePastDates = {
  predicate: (currentDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return currentDate > today;
  },
};
</script>

<style scoped>
.content {
  width: 750px;
  height: 660px;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dee2e6;
  top: 0;
}

.select-title {
  padding: 6px 15px 0 0;
  min-width: 115px;
}

.select-data {
  width: 100px !important;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.role-selected {
  width: 150px !important;
}

.title-birthday {
  min-width: 115px;
  padding: 6px 15px 0 0;
}
</style>

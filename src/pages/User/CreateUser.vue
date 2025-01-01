<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Tạo tài khoản nhân viên</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <!-- Họ và tên -->
        <input-component
            class="mb-2"
            title="Họ và tên"
            @data="userInfo.full_name = $event"
        ></input-component>
        <p v-if="errors.full_name" class="text-danger">{{ errors.full_name }}</p>

        <!-- Ngày sinh -->
        <input-component
            class="mb-2"
            title="Ngày sinh"
            @data="userInfo.birthday = $event"
        ></input-component>
        <p v-if="errors.birthday" class="text-danger">{{ errors.birthday }}</p>

        <!-- Giới tính -->
        <div class="d-flex mb-2 fw-medium">
          <span class="select-title fw-medium">Giới tính</span>
          <select
              class="role-selected select-data form-select"
              id="sex"
              name="sex"
              v-model="userInfo.sex"
          >
            <option value="">Chọn giới tính</option>
            <option :value="0">Nam</option>
            <option :value="1">Nữ</option>
          </select>
        </div>
        <p v-if="errors.sex" class="text-danger">{{ errors.sex }}</p>

        <!-- Tài khoản đăng nhập -->
        <input-component
            class="mb-2"
            title="TK Đăng nhập"
            @data="userInfo.username = $event"
        ></input-component>
        <p v-if="errors.username" class="text-danger">{{ errors.username }}</p>
      </div>
      <div>
        <!-- Số điện thoại -->
        <input-component
            class="mb-2"
            title="Số điện thoại"
            @data="userInfo.phone = $event"
        ></input-component>
        <p v-if="errors.phone" class="text-danger">{{ errors.phone }}</p>

        <!-- Địa chỉ -->
        <input-component
            class="mb-2"
            title="Địa chỉ"
            @data="userInfo.address = $event"
        ></input-component>
        <p v-if="errors.address" class="text-danger">{{ errors.address }}</p>

        <!-- Email -->
        <input-component
            class="mb-2"
            title="Email"
            @data="userInfo.email = $event"
        ></input-component>
        <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>

        <!-- Vai trò -->
        <role-component
            title="Vai trò"
            @data="userInfo.role = $event"
        ></role-component>
        <p v-if="errors.role" class="text-danger">{{ errors.role }}</p>
      </div>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="createUser">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>

<script setup>
import InputComponent from '@/components/InputComponent.vue';
import RoleComponent from '@/components/RoleComponent';
import axios from 'axios';
import { ref } from 'vue';
import { config } from '@/Common/app.config.ts';

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

const errors = ref({}); // Đối tượng lưu lỗi
const errorMessage = ref('');

const createUser = async () => {
  // Reset lỗi
  errors.value = {};

  // Validate các trường
  let isValid = true;

  if (!userInfo.value.full_name) {
    errors.value.full_name = 'Họ và tên không được để trống.';
    isValid = false;
  }

  if (!userInfo.value.birthday) {
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

  if (!userInfo.value.role) {
    errors.value.role = 'Vai trò không được để trống.';
    isValid = false;
  }

  if (!isValid) return;

  try {
    userInfo.value.password = userInfo.value.username + userInfo.value.phone;

    await axios.post(`${config.apiUrl}`, userInfo.value);
    location.reload();
  } catch (err) {
    errorMessage.value = err.response?.data.errors || 'Đã xảy ra lỗi.';
  }
};
</script>

<style scoped>
.content {
  width: 750px;
  height: 550px;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dee2e6;
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
</style>

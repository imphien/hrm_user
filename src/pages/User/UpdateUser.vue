<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Thông tin nhân viên</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component
            class="mb-2"
            title="Họ và tên"
            :value="userInfo.full_name"
            @data="userInfo.full_name = $event"
        ></input-component>
        <p v-if="errors.full_name" class="text-danger">{{ errors.full_name }}</p>

        <div class="d-flex mb-2">
          <span class="birthday input-title fw-medium">Ngày sinh</span>
          <Datepicker
              v-model="userInfo.birthday"
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
            <option value="">Chọn giới tính</option>
            <option :value="0">Nam</option>
            <option :value="1">Nữ</option>
          </select>
        </div>
        <p v-if="errors.sex" class="text-danger">{{ errors.sex }}</p>

        <input-component
            class="mb-2"
            title="TK Đăng nhập"
            :value="userInfo.username"
            @data="userInfo.username = $event"
        ></input-component>
        <p v-if="errors.username" class="text-danger">{{ errors.username }}</p>
      </div>
      <div>
        <input-component
            class="mb-2"
            title="Số điện thoại"
            :value="userInfo.phone"
            @data="userInfo.phone = $event"
        ></input-component>
        <p v-if="errors.phone" class="text-danger">{{ errors.phone }}</p>

        <input-component
            class="mb-2"
            title="Địa chỉ"
            :value="userInfo.address"
            @data="userInfo.address = $event"
        ></input-component>
        <p v-if="errors.address" class="text-danger">{{ errors.address }}</p>

        <input-component
            class="mb-2"
            title="Email"
            :value="userInfo.email"
            @data="userInfo.email = $event"
        ></input-component>
        <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>

        <div class="d-flex justify-content-between pb-2">
          <span class="input-title fw-medium">Vai trò</span>
          <select
              class="role-selected form-select"
              id="roles"
              name="roles"
              v-model="selectedRole"
          >
            <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
          </select>
        </div>
        <p v-if="errors.role_id" class="text-danger">{{ errors.role_id }}</p>
      </div>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="updateUser(userInfo.id)">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
  <LoadingComponent :visible="loading" />
</template>

<script setup>
import InputComponent from '@/components/InputComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import Datepicker from 'vue3-datepicker';
import {onMounted, ref} from 'vue';
import api from "@/api";

// eslint-disable-next-line no-undef
defineEmits(['isShow']);

// eslint-disable-next-line no-undef
const props = defineProps(['user']);

const userInfo = ref({
  id: props.user.id,
  full_name: props.user.full_name,
  birthday: new Date(props.user.birthday),
  sex: props.user.sex,
  phone: props.user.phone,
  email: props.user.email,
  address: props.user.address,
  username: props.user.username,
  roles: props.user.roles,
});

const selectedRole = ref(userInfo.value.roles[0]?.id || '');
const errors = ref({});
const errorMessage = ref('');
const loading = ref(false);
const roles = ref([]);

onMounted(() => {
  getListRoles();
});

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

const updateUser = async (userId) => {
  errors.value = {};

  let isValid = true;

  if (!userInfo.value.full_name) {
    errors.value.full_name = 'Họ và tên không được để trống.';
    isValid = false;
  }

  if (!userInfo.value.birthday) {
    errors.value.birthday = 'Ngày sinh không được để trống.';
    isValid = false;
  }

  if (userInfo.value.sex === '' || userInfo.value.sex === null) {
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

  if (!selectedRole.value) {
    errors.value.role_id = 'Vai trò không được để trống.';
    isValid = false;
  }

  if (!isValid) return;

  try {
    if (userInfo.value.birthday instanceof Date) {
      const adjustedDate = new Date(
          userInfo.value.birthday.getTime() + Math.abs(userInfo.value.birthday.getTimezoneOffset() * 60000)
      );
      userInfo.value.birthday= adjustedDate.toISOString().split('T')[0];
    }
    userInfo.value.role = selectedRole
    await api.put(`users/${userId}`, userInfo.value);
    location.reload();
  } catch (err) {
    errorMessage.value = err.response?.data.errors || 'Đã xảy ra lỗi.';
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
  height: 450px;
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

.birthday {
  min-width: 115px;
}
</style>

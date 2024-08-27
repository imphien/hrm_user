<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Thông tin nhân viên</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component class="mb-2" title="Họ và tên" :value="userInfo.full_name" @data="userInfo.full_name = $event"></input-component>
        <input-component class="mb-2" title="Ngày sinh" :value="userInfo.birthday" @data="userInfo.birthday = $event"></input-component>
        <div class="d-flex mb-2 fw-medium">
          <span class="select-title fw-medium">Giới tính</span>
          <select class="role-selected select-data form-select" id="sex" name="sex" v-model="userInfo.sex">
            <option :value="0" selected>Nam</option>
            <option :value="1">Nữ</option>
          </select>
        </div>
        <input-component class="mb-2" title="TK Đăng nhập" :value="userInfo.username" @data="userInfo.username = $event"></input-component>
      </div>
      <div>
        <input-component class="mb-2" title="Số điện thoại" :value="userInfo.phone" @data="userInfo.phone = $event"></input-component>
        <input-component class="mb-2" title="Địa chỉ" :value="userInfo.address" @data="userInfo.address = $event"></input-component>
        <input-component class="mb-2" title="Email" :value="userInfo.email" @data="userInfo.email = $event"></input-component>
      </div>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="updateUser(userInfo.id)">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>
<script setup>
import InputComponent from '@/components/InputComponent.vue'
import axios from "axios";
import {ref} from "vue";
import {config} from "@/Common/app.config.ts";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

// eslint-disable-next-line no-undef
const props = defineProps(['user']);

const userInfo = ref({
  id: props.user.id,
  full_name : props.user.full_name,
  birthday : props.user.birthday,
  sex: props.user.sex,
  phone: props.user.phone,
  email: props.user.email,
  address: props.user.address,
  username: props.user.username,
  roles: props.user.roles
})

const errorMessage = ref('');

const updateUser = async (userId) => {
  try {
    await axios.put(
        `${config.apiUrl}users/${userId}`, userInfo.value
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

.select-title {
  padding: 6px 15px 0 0;
  min-width: 115px;
}

.select-data {
  width: 100px !important;
}

select {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}
</style>
<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Tài khoản nhân viên
    </div>
    <div class="d-flex pt-3">
      <div class="col-9">
        <div class="d-flex justify-content-around">
          <div class="d-flex">
            <span class="input-title fw-medium">Mã nhân viên</span>
            <input type="text" v-model="userId">
          </div>
          <div class="d-flex">
            <span class="input-title fw-medium">Họ và tên</span>
            <input type="text" v-model="userFullName">
          </div>
        </div>
        <div class="d-flex justify-content-around pt-3">
          <div class="d-flex">
            <span class="input-title fw-medium">Vai trò</span>
            <select class="role-selected form-select" id="roles" name="roles" v-model="selectRole">
              <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
            </select>
          </div>
          <button class="btn btn-dark" @click="searchUsers()">
            <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
          </button>
        </div>
      </div>
      <div class="col-3">
        <button class="btn btn-primary btn-lg" @click="showCreateUser()"> Thêm mới </button>
      </div>
    </div>
    <div class="pt-5">
      <table class="table table-bordered">
        <thead>
        <tr class="text-center">
          <th scope="col">STT</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">SDT</th>
          <th scope="col">Ngày sinh</th>
          <th scope="col">Giới tính</th>
          <th scope="col">Email</th>
          <th scope="col">Vai trò</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Xem chi tiết</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.full_name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.birthday }}</td>
          <td>Nam</td>
          <td>{{ user.email }}</td>
          <td>{{ user.roles.length > 0 ? user.roles[0].name : '' }}</td>
          <td>Hoạt động</td>
          <td class="d-flex justify-content-around">
            <button class="btn btn-primary" @click="showUpdateUser(user)">Sửa</button>
            <button class="btn btn-danger" @click="deleteUser(user.id)">Xoá</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <CreateUser v-if="isShowCreateUser" @hide="hideCreateUser">
  </CreateUser>
  <UpdateUser v-if="isShowUpdateUser" :user="userDetail" @hide="hideUpdateUser">
  </UpdateUser>
</template>
<script setup>
  import axios from "axios";
  import {onMounted, ref} from "vue";
  import qs from "qs";

  import CreateUser from './CreateUser';
  import UpdateUser from './UpdateUser';
  import {config} from "@/Common/app.config.ts";

  const errorMessage = ref({});
  const users = ref([]);
  const roles = ref([]);
  const selectRole = ref('');
  const userId = ref('');
  const userFullName = ref('');
  const isShowCreateUser = ref(false);
  const isShowUpdateUser = ref(false);
  const userDetail = ref({});

  const getListUsers = async () => {
    try {
       const response = await axios.get(
          `${config.apiUrl}users`,
      )
      users.value = response.data;
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

  const searchUsers = async () => {
    try {
      let params = {};
      if (selectRole.value) {
        params.role_id = selectRole.value;
      }
      if (userId.value) {
        params.user_id = userId.value;
      }
      if (userFullName.value) {
        params.full_name = userFullName.value;
      }
      const queryString = qs.stringify(params);
      const response = await axios.get(
          `${config.apiUrl}users?${queryString}`,
      )
      users.value = response.data;
    } catch (err) {
      errorMessage.value = err.response.data.errors;
    }
  }

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
          `${config.apiUrl}users/${userId}`,
      )
      location.reload();
    } catch (err) {
      errorMessage.value = err.response.data.errors;
    }
  }

  const showCreateUser = () => {
    isShowCreateUser.value = true
  }

  const hideCreateUser = () => {
    isShowCreateUser.value = false
  }

  const showUpdateUser = (user) => {
    userDetail.value = user
    isShowUpdateUser.value = true
  }

  const hideUpdateUser = () => {
    isShowUpdateUser.value = false
  }

  onMounted(() => {
    getListUsers();
    getListRoles();
  })
</script>
<style>
  .input-title {
    padding: 6px 15px 0 0;
  }

  .role-selected {
    width: 175px !important;
  }

  input {
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
  }
</style>

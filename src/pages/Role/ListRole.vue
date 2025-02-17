<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Quản lý quyền
    </div>
    <div class="d-flex pt-3">
      <div class="col-3" @click="showCreateRecruitment">
        <button class="btn btn-primary btn-lg"> Thêm mới </button>
      </div>
    </div>
    <div class="pt-5">
      <table class="table table-bordered">
        <thead>
        <tr class="text-center">
          <th scope="col">STT</th>
          <th scope="col">Vị trí</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" v-for="role in roles" :key="role.id">
          <th scope="row">{{ role.id }}</th>
          <td>{{ role.name }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <CreateRole v-if="isShowCreateRecruitment" @hide="hideCreateRecruitment" />
  <LoadingComponent :visible="loading" />
</template>
<script setup>
import {onMounted, ref} from "vue";
import LoadingComponent from '@/components/LoadingComponent.vue';
import api from "@/api";
import CreateRole from "@/pages/Role/CreateRole";

const roles = ref([]);
const errorMessage = ref({});
const isShowCreateRecruitment = ref(false);
const loading = ref(false);

onMounted(() => {
  getListRoles();
});

const getListRoles = async () => {
  try {
    loading.value = true;
    const response = await api.get('roles');
    roles.value = response.data.data;
  } catch (err) {
    errorMessage.value = err.response?.data.errors;
  } finally {
    loading.value = false;
  }
};

const hideCreateRecruitment = () => {
  isShowCreateRecruitment.value = false;
};

const showCreateRecruitment = () => {
  isShowCreateRecruitment.value = true;
};
</script>
<style scoped>
input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
}
</style>
<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Tin tuyển dụng
    </div>
    <div class="d-flex pt-3">
      <div class="col-9">
        <div class="d-flex justify-content-around">
          <div class="d-flex">
            <span class="input-title fw-medium">Từ ngày</span>
            <Datepicker
                v-model="startDate"
                placeholder="Chọn ngày bắt đầu"
                class="p-2"
            />
          </div>
          <div class="d-flex">
            <span class="input-title fw-medium">Đến ngày</span>
            <Datepicker
                v-model="endDate"
                placeholder="Chọn ngày bắt đầu"
                :format="(date) => date.toLocaleDateString()"
                class="p-2"
            />
          </div>
        </div>
        <div class="d-flex justify-content-around pt-3">
          <div class="d-flex">
            <span class="input-title fw-medium">Vai trò</span>
            <select class="role-selected form-select" id="roles" name="roles" v-model="selectRole">
              <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
            </select>
          </div>
          <button class="btn btn-dark" @click="getListRecruitments">
            <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
          </button>
        </div>
      </div>
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
          <th scope="col">Số lượng</th>
          <th scope="col">Nội dung</th>
          <th scope="col">Yêu cầu</th>
          <th scope="col">Ngày hết hạn</th>
          <th scope="col">Sửa</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" v-for="recruitment in recruitments" :key="recruitment.id">
          <th scope="row">{{ recruitment.id }}</th>
          <td>{{ recruitment.position }}</td>
          <td>{{ recruitment.quantity }}</td>
          <td>{{ recruitment.content }}</td>
          <td>{{ recruitment.requirement }}</td>
          <td>{{ recruitment.expired }}</td>
          <td>
            <button class="btn btn-primary" @click="showUpdateRecruitment(recruitment)">Sửa</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <CreateRecruitment v-if="isShowCreateRecruitment" @hide="hideCreateRecruitment" />
  <UpdateRecruitment
      v-if="isShowUpdateRecruitment"
      :recruitment="recruitmentDetail"
      @hide="hideUpdateRecruitment"
  />
</template>
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {config} from "@/Common/app.config.ts";
import qs from "qs";
import UpdateRecruitment from "@/pages/Recruitment/UpdateRecruitment";
import CreateRecruitment from "@/pages/Recruitment/CreateRecruitment";
import Datepicker from "vue3-datepicker";

const startDate = ref('');
const endDate = ref('');
const selectRole = ref('');
const recruitments = ref([]);
const roles = ref([]);
const errorMessage = ref({});
const isShowUpdateRecruitment = ref(false);
const isShowCreateRecruitment = ref(false);
const recruitmentDetail = ref({});

onMounted(() => {
  getListRecruitments();
  getListRoles();
});

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-CA').format(date);
}

const getListRecruitments = async () => {
  try {
    let params = {};
    if (selectRole.value) {
      params.role_id = selectRole.value;
    }
    if (startDate.value) {
      params.start_date = formatDate(startDate.value);
    }
    if (endDate.value) {
      params.end_date = formatDate(endDate.value);
    }

    const queryString = qs.stringify(params);
    const response = await axios.get(
        `${config.apiUrl}recruitments?${queryString}`
    );
    recruitments.value = response.data;
  } catch (err) {
    errorMessage.value = err.response?.data.errors;
  }
};

const getListRoles = async () => {
  try {
    const response = await axios.get(`${config.apiUrl}roles`);
    roles.value = response.data.data;
  } catch (err) {
    errorMessage.value = err.response?.data.errors;
  }
};

const hideUpdateRecruitment = () => {
  isShowUpdateRecruitment.value = false;
};

const hideCreateRecruitment = () => {
  isShowCreateRecruitment.value = false;
};

const showUpdateRecruitment = (recruitment) => {
  recruitmentDetail.value = recruitment;
  isShowUpdateRecruitment.value = true;
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
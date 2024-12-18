<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Bảng lương
    </div>
    <div class="d-flex pt-3">
      <div class="col-9">
        <div class="d-flex justify-content-around">
          <div class="d-flex">
            <span class="input-title fw-medium">Tháng</span>
            <input type="text" class="px-2" v-model="month">
          </div>
          <div class="d-flex">
            <span class="input-title fw-medium">Họ và tên</span>
            <input type="text" class="px-2" v-model="fullName">
          </div>
        </div>
        <div class="d-flex justify-content-around pt-3">
          <div class="d-flex">
            <span class="input-title fw-medium">Mã công nhân</span>
            <input type="text" class="px-2" v-model="userId">
          </div>
          <div class="d-flex">
            <button class="btn btn-dark me-5" @click="getListSalaries">
              <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
            </button>
            <i class="fa-solid fa-file-import fa-2x pt-1" @click="triggerFileInput"></i>
            <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" />
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <table class="table table-bordered">
        <thead>
        <tr class="text-center">
          <th scope="col">STT</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">Tháng</th>
          <th scope="col">Số ngày công</th>
          <th scope="col">Lương</th>
          <th scope="col">Phụ cấp</th>
          <th scope="col">Khoản trừ</th>
          <th scope="col">Thưởng thêm</th>
          <th scope="col">Thực nhận</th>
          <th scope="col">Thao tác</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" v-for="salary in salaries" :key="salary.id">
          <th scope="row">{{ salary.id }}</th>
          <td>{{ salary.user.full_name }}</td>
          <td>{{ salary.month }}</td>
          <td>{{ salary.days }}</td>
          <td>{{ salary.salary }}</td>
          <td>{{ salary.allowance }}</td>
          <td>{{ salary.dedution }}</td>
          <td>{{ salary.bonus }}</td>
          <td>100000</td>
          <td class="d-flex justify-content-around">
            <button class="btn btn-danger" @click="showUpdateSalary(salary)">Sửa</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <UpdateSalary v-if="isShowUpdateSalary" :salary="salaryDetail" @hide="hideUpdateSalary">
  </UpdateSalary>
</template>
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {config} from "@/Common/app.config.ts";
import qs from "qs";
import UpdateSalary from "@/pages/Salary/UpdateSalary";

const month = ref('');
const fullName = ref('');
const userId = ref('');
const salaries = ref([]);
const salaryDetail = ref({});
const isShowUpdateSalary = ref(false);
const fileInput = ref(null);

const errorMessage = ref({});

onMounted(() => {
  getListSalaries();
})

const getListSalaries = async () => {
  try {
    let params = {};
    if (month.value) {
      params.month = month.value;
    }
    if (fullName.value) {
      params.full_name = fullName.value;
    }
    if (userId.value) {
      params.user_id = userId.value;
    }
    const queryString = qs.stringify(params);
    const response = await axios.get(
        `${config.apiUrl}salaries?${queryString}`,
    )
    salaries.value = response.data
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}

const showUpdateSalary = (salary) => {
  salaryDetail.value = salary
  isShowUpdateSalary.value = true
}

const hideUpdateSalary = () => {
  isShowUpdateSalary.value = false
}

const triggerFileInput = () => {
  fileInput.value.click();
}

const handleFileChange = async (event) => {
  const file = event.target.files[0];

  const formData = new FormData();
  formData.append('file', file);

  await axios.post(
      config.apiUrl + `salaries/import`, formData
  )
}
</script>
<style scoped>
input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
}
</style>
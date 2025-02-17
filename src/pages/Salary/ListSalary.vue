<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Bảng lương
    </div>
    <div class="d-flex pt-3">
      <div class="col-9">
        <div class="d-flex justify-content-around">
          <div class="d-flex flex-column">
            <div class="d-flex">
              <span class="input-title fw-medium">Tháng</span>
              <input type="text" class="px-2" v-model="month" placeholder="YYYY-MM">
            </div>
            <span v-if="monthError" class="text-danger mt-1">{{ monthError }}</span>
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
          <td>{{ salary.salary_format }}</td>
          <td>{{ salary.allowance_format }}</td>
          <td>{{ salary.dedution_format }}</td>
          <td>{{ salary.bonus_format }}</td>
          <td>{{ salary.total }}</td>
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
  <LoadingComponent :visible="loading" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import UpdateSalary from "@/pages/Salary/UpdateSalary";
import api from "@/api";
import LoadingComponent from "@/components/LoadingComponent.vue";

const month = ref('');
const fullName = ref('');
const userId = ref('');
const salaries = ref([]);
const salaryDetail = ref({});
const isShowUpdateSalary = ref(false);
const fileInput = ref(null);
const loading = ref(false);
const monthError = ref('');

const errorMessage = ref({});

onMounted(() => {
  getListSalaries();
});

const validateMonth = () => {
  const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
  if (!monthRegex.test(month.value)) {
    monthError.value = 'Tháng không đúng định dạng.';
    return false;
  }
  monthError.value = '';
  return true;
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) return "0";
  return parseInt(value, 10).toLocaleString("vi-VN") + " ₫";
};

const getListSalaries = async () => {
  try {
    loading.value = true;

    if (month.value && !validateMonth()) {
      return;
    }

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

    const response = await api.get("salaries", { params });
    salaries.value = response.data.map((salary) => {
      const total =
          (salary.salary || 0) +
          (salary.allowance || 0) -
          (salary.dedution || 0) +
          (salary.bonus || 0);

      return {
        ...salary,
        salary_format: formatCurrency(salary.salary),
        allowance_format: formatCurrency(salary.allowance),
        dedution_format: formatCurrency(salary.dedution),
        bonus_format: formatCurrency(salary.bonus),
        total: formatCurrency(total),
      };
    });
  } catch (err) {
    errorMessage.value = err.response?.data?.errors || "Có lỗi xảy ra.";
  } finally {
    loading.value = false;
  }
};

const showUpdateSalary = (salary) => {
  salaryDetail.value = salary;
  isShowUpdateSalary.value = true;
};

const hideUpdateSalary = () => {
  isShowUpdateSalary.value = false;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = async (event) => {
  try {
    loading.value = true;
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    await api.post("salaries/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    location.reload();
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Có lỗi xảy ra khi tải lên tệp.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
}
</style>
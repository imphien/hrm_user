<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Chấm công chi tiết
    </div>
    <div class="d-flex pt-3">
      <div class="col-9">
        <div class="d-flex justify-content-around">
          <div class="d-flex">
            <span class="input-title fw-medium">Ngày</span>
            <Datepicker
                v-model="month"
                placeholder="Chọn ngày bắt đầu"
                class="p-2"
                :clearable="true"
            />
          </div>
          <div class="d-flex" v-if="isUserAdmin">
            <span class="input-title fw-medium">Họ và tên</span>
            <input type="text" class="px-2" v-model="fullName">
          </div>
          <button class="btn btn-dark me-5" @click="getListTimekeeping">
            <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
          </button>
        </div>
        <div class="d-flex justify-content-between pt-3 ps-4 pe-5">
          <div class="d-flex" v-if="isUserAdmin">
            <span class="input-title fw-medium">Mã công nhân</span>
            <input type="text" class="px-2" v-model="userId">
          </div>
          <div class="d-flex" v-if="false">
            <i class="fa-solid fa-file-import fa-2x pt-1" @click="triggerFileInput" v-if="isUserAdmin"></i>
            <input type="file" ref="fileInput" @change="handleFileChange" style="display: none;" v-if="isUserAdmin"/>
          </div>
        </div>
      </div>
      <div class="col-3" @click="showCreateTimekeeping" v-if="isUserAdmin">
        <button class="btn btn-primary btn-lg"> Thêm công </button>
      </div>
    </div>
    <div class="pt-5">
      <table class="table table-bordered">
        <thead>
        <tr class="text-center">
          <th scope="col">STT</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">Ngày</th>
          <th scope="col">Chấm công</th>
          <th scope="col">Số giờ</th>
          <th scope="col">Thời gian bắt đầu</th>
          <th scope="col">Thời gian kết thúc</th>
          <th scope="col" v-if="isUserAdmin">Thao tác</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" v-for="item in timekeeping" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.user.full_name }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.hours }}</td>
          <td>{{ item.start_time }}</td>
          <td>{{ item.end_time }}</td>
          <td class="d-flex justify-content-around" v-if="isUserAdmin">
            <button class="btn btn-danger" @click="showUpdateTimekeeping(item)">Sửa</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <UpdateTimekeeping v-if="isShowUpdateTimekeeping" :timekeeping="timekeepingDetail" @hide="hideUpdateTimekeeping">
  </UpdateTimekeeping>
  <CreateTimekeeping v-if="isShowCreateTimekeeping" :timekeeping="timekeepingDetail" @hide="hideCreateTimekeeping">
  </CreateTimekeeping>
</template>
<script setup>
import {onMounted, ref} from "vue";
import UpdateTimekeeping from "@/pages/Timekeeping/UpdateTimekeeping";
import CreateTimekeeping from "@/pages/Timekeeping/CreateTimekeeping";
import Datepicker from "vue3-datepicker";
import api from "@/api";

const month = ref(null);
const fullName = ref('');
const userId = ref('');
const timekeeping = ref([]);
const timekeepingDetail = ref({});
const fileInput = ref(null);
const isShowUpdateTimekeeping = ref(false);
const isShowCreateTimekeeping = ref(false);
const isUserAdmin = ref(false);
const userObject = ref(false);

const errorMessage = ref({});

onMounted(() => {
  getListTimekeeping();
  isAdmin();
})

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-CA').format(date);
}

const getListTimekeeping = async () => {
  try {
    let params = {};
    if (month.value) {
      params.month = formatDate(month.value);
    }
    if (fullName.value) {
      params.full_name = fullName.value;
    }
    if (userId.value) {
      params.user_id = userId.value;
    }

    const currentUser = localStorage.getItem('currentUser');
    userObject.value = JSON.parse(currentUser);

    if (!userObject.value.roles.some(role => role.name === 'admin')) {
      params.user_id = userObject.value.id;
    }

    const response = await api.get(
        'timekeeping', {params}
    )
    timekeeping.value = response.data
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}

const showUpdateTimekeeping = (timekeeping) => {
  timekeepingDetail.value = timekeeping
  isShowUpdateTimekeeping.value = true
}

const hideUpdateTimekeeping = () => {
  isShowUpdateTimekeeping.value = false
}

const showCreateTimekeeping = () => {
  isShowCreateTimekeeping.value = true
}

const hideCreateTimekeeping = () => {
  isShowCreateTimekeeping.value = false
}

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = async (event) => {
  try {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    await api.post("timekeeping/import", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Có lỗi xảy ra khi tải lên tệp.");
  }
};

const isAdmin = () => {
  const currentUser = localStorage.getItem('currentUser');
  userObject.value = JSON.parse(currentUser);
  if (userObject.value.roles.some(role => role.name === 'admin')) {
    return isUserAdmin.value = true;
  }

  return isUserAdmin.value = false;

}
</script>
<style scoped>
input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
}
</style>
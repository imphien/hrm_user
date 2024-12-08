<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Chấm công chi tiết
    </div>
    <div class="d-flex pt-3">
      <div class="col-9">
        <div class="d-flex justify-content-around">
          <div class="d-flex">
            <span class="input-title fw-medium">Tháng</span>
            <Datepicker
                v-model="month"
                placeholder="Chọn ngày bắt đầu"
                class="p-2"
            />
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
            <button class="btn btn-dark me-5" @click="getListTimekeeping">
              <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
            </button>
            <i class="fa-solid fa-file-export fa-2x pt-1"></i>
          </div>
        </div>
      </div>
      <div class="col-3" @click="showCreateTimekeeping">
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
          <th scope="col">Thao tác</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" v-for="item in timekeeping" :key="item.id">
          <th scope="row">{{ item.id }}</th>
          <td>{{ item.user.full_name }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.hours }}</td>
          <td class="d-flex justify-content-around">
            <button class="btn btn-danger" @click="showUpdateTimekeeping(item)">Chi tiết</button>
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
import axios from "axios";
import {config} from "@/Common/app.config.ts";
import qs from "qs";
import UpdateTimekeeping from "@/pages/Timekeeping/UpdateTimekeeping";
import CreateTimekeeping from "@/pages/Timekeeping/CreateTimekeeping";
import Datepicker from "vue3-datepicker";

const month = ref(null);
const fullName = ref('');
const userId = ref('');
const timekeeping = ref([]);
const timekeepingDetail = ref({});
const isShowUpdateTimekeeping = ref(false);
const isShowCreateTimekeeping = ref(false);

const errorMessage = ref({});

onMounted(() => {
  getListTimekeeping();
})

const getListTimekeeping = async () => {
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
        `${config.apiUrl}timekeeping?${queryString}`,
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
</script>
<style scoped>
input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
}
</style>
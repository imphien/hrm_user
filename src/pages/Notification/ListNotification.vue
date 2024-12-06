<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Thông báo
    </div>
    <div>
      <div class="d-flex pt-5">
        <div class="col-9">
          <div class="d-flex justify-content-around">
            <div class="d-flex">
              <span class="input-title fw-medium">Từ ngày</span>
              <input type="text" class="px-2" v-model="startDate">
            </div>
            <div class="d-flex">
              <span class="input-title fw-medium">Đến ngày</span>
              <input type="text" class="px-2" v-model="endDate">
            </div>
            <div>
              <button class="btn btn-dark" @click="getListNotifications">
                <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
              </button>
            </div>
            <div>
              <button class="btn btn-primary" @click="showCreateNotification"> Thêm mới</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-5">
      <table class="table table-bordered">
        <thead>
        <tr class="text-center">
          <th scope="col">STT</th>
          <th scope="col">Ngày bắt đầu</th>
          <th scope="col">Ngày kết thúc</th>
          <th scope="col">Nội dung</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" v-for="notification in notifications" :key="notification.id">
          <th scope="row">{{ notification.id }}</th>
          <td>{{ notification.start_date }}</td>
          <td>{{ notification.end_date }}</td>
          <td>{{ notification.content }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  <CreateNotification v-if="isShowCreateNotification" @hide="hideCreateNotification">
  </CreateNotification>
</template>
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {config} from "@/Common/app.config.ts";
import qs from "qs";
import CreateNotification from "@/pages/Notification/CreateNotification";

const startDate = ref('');
const endDate = ref('');
const notifications = ref([]);
const errorMessage = ref({});
const isShowCreateNotification = ref(false);

onMounted(() => {
  getListNotifications();
})

const getListNotifications = async () => {
  try {
    let params = {};
    if (startDate.value) {
      params.start_date = startDate.value;
    }
    if (endDate.value) {
      params.end_date = endDate.value;
    }
    const queryString = qs.stringify(params);
    const response = await axios.get(
        `${config.apiUrl}notifications?${queryString}`,
    )
    notifications.value = response.data
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}

const hideCreateNotification = () => {
  isShowCreateNotification.value = false
}

const showCreateNotification = () => {
  isShowCreateNotification.value = true
}
</script>
<style scoped>
input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
}
</style>
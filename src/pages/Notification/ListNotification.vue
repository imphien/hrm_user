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
                  class="p-2"
              />
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
import CreateNotification from "@/pages/Notification/CreateNotification";
import Datepicker from "vue3-datepicker";
import api from "@/api";

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
    const params = {};
    if (startDate.value) {
      params.start_date = formatDate(startDate.value);
    }
    if (endDate.value) {
      params.end_date = formatDate(endDate.value);
    }
    const response = await api.get('notifications', { params })
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

function formatDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-CA').format(date);
}
</script>
<style scoped>
input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
}
</style>
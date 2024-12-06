<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Thông tin đơn từ
    </div>
    <div class="d-flex pt-3">
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
          <div class="d-flex">
            <span class="input-title fw-medium">Mã nhân viên</span>
            <input type="text" class="px-2" v-model="endDate">
          </div>
        </div>
        <div class="d-flex justify-content-around pt-3">
          <div class="d-flex">
            <span class="input-title fw-medium">Trạng thái</span>
            <select class="status-selected form-select" id="status" name="status" v-model="selectStatus">
              <option v-for="statusValue in status" :value="statusValue.id" :key="statusValue.id">{{ statusValue }}</option>
            </select>
          </div>
          <div class="d-flex">
            <span class="input-title fw-medium">Loại đơn</span>
            <select class="type-selected form-select" id="type" name="type" v-model="selectType">
              <option v-for="type in types" :value="type.id" :key="type.id">{{ selectType }}</option>
            </select>
          </div>
          <button class="btn btn-dark" @click="getListApprovals">
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
          <th scope="col">Ngày bắt đầu</th>
          <th scope="col">Ngày kết thúc</th>
          <th scope="col">Họ tên</th>
          <th scope="col">Loại đơn</th>
          <th scope="col">Nội dung</th>
          <th scope="col">Duyệt</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center" v-for="approval in approvals" :key="approval.id">
          <th scope="row">{{ approval.id }}</th>
          <td>{{ approval.start_date }}</td>
          <td>{{ approval.end_date }}</td>
          <td>{{ approval.user.full_name }}</td>
          <td>{{ approval.type }}</td>
          <td>{{ approval.content }}</td>
          <td class="d-flex justify-content-around">
            <button class="btn btn-primary">Đồng ý</button>
            <button class="btn btn-danger">Từ chối</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {config} from "@/Common/app.config.ts";
import qs from "qs";

const startDate = ref('');
const endDate = ref('');
const selectStatus = ref('');
const selectType = ref('');
const approvals = ref([]);
const status = ref({
  1 : 'Đã phê duyệt',
  2 : 'Chưa phê duyệt',
  3 : 'Từ chối',
});

const types = ref({
  1 : 'Đơn xin nghỉ phép',
  2 : 'Đơn xin nghỉ việc',
  3 : 'Đơn chấm công',
});

const errorMessage = ref({});

onMounted(() => {
  getListApprovals();
})

const getListApprovals = async () => {
  try {
    let params = {};
    if (selectStatus.value) {
      params.status = selectStatus.value;
    }
    if (startDate.value) {
      params.start_date = startDate.value;
    }
    if (endDate.value) {
      params.end_date = endDate.value;
    }
    if (selectType.value) {
      params.type = selectType.value;
    }
    const queryString = qs.stringify(params);
    const response = await axios.get(
        `${config.apiUrl}approvals?${queryString}`,
    )
    approvals.value = response.data
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}
</script>
<style scoped>
input:focus {
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 .25rem rgba(13, 110, 253, .25);
}

.status-selected {
  width: 175px !important;
}

.type-selected {
  width: 175px !important;
}
</style>
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
          <div class="d-flex">
            <span class="input-title fw-medium">Mã nhân viên</span>
            <input type="text" class="px-2" v-model="userId">
          </div>
        </div>
        <div class="d-flex justify-content-around pt-3">
          <div class="d-flex">
            <span class="input-title fw-medium">Trạng thái</span>
            <select class="status-selected form-select" id="status" name="status" v-model="selectStatus">
              <option v-for="(statusName, statusId) in status" :value="statusId" :key="statusId">{{ statusName }}</option>
            </select>
          </div>
          <div class="d-flex">
            <span class="input-title fw-medium">Loại đơn</span>
            <select class="status-selected form-select" id="status" name="status" v-model="selectType">
              <option v-for="(typeName, typeId) in types" :value="typeId" :key="typeId">{{ typeName }}</option>
            </select>
          </div>
          <button class="btn btn-dark" @click="getListApprovals">
            <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
          </button>
        </div>
      </div>
      <div class="col-3" @click="showCreateApproval">
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
  <CreateApproval v-if="isShowCreateApproval" @hide="hideCreateApproval" />
</template>
<script setup>
import {onMounted, ref} from "vue";
import Datepicker from "vue3-datepicker";
import CreateApproval from "@/pages/Approval/CreateApproval";
import api from "@/api";

const startDate = ref('');
const endDate = ref('');
const userId = ref('');
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
const isShowCreateApproval = ref(false);

const errorMessage = ref({});

onMounted(() => {
  getListApprovals();
})

const getListApprovals = async () => {
  try {
    const params = {};
    if (selectStatus.value) {
      params.status = selectStatus.value;
    }
    if (selectType.value) {
      params.type = selectType.value;
    }
    if (userId.value) {
      params.user_id = userId.value;
    }

    if (startDate.value instanceof Date) {
      const adjustedDate = new Date(
          startDate.value.getTime() + Math.abs(startDate.value.getTimezoneOffset() * 60000)
      );
      params.start_date = adjustedDate.toISOString().split("T")[0];
    }

    if (endDate.value instanceof Date) {
      const adjustedDate = new Date(
          endDate.value.getTime() + Math.abs(endDate.value.getTimezoneOffset() * 60000)
      );
      params.end_date = adjustedDate.toISOString().split("T")[0];
    }

    const response = await api.get('approvals', { params })
    approvals.value = response.data
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}

const hideCreateApproval = () => {
  isShowCreateApproval.value = false;
};

const showCreateApproval = () => {
  isShowCreateApproval.value = true;
};
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
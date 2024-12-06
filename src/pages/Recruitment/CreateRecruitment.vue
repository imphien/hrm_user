<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Tạo mới thông tin tuyển dụng</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component class="mb-2" title="Vị trí" @data="recruitmentInfo.position = $event"></input-component>
        <input-component class="mb-2" title="Số lượng" type="number" @data="recruitmentInfo.quantity = $event"></input-component>
        <input-component class="mb-2" title="Nội dung" @data="recruitmentInfo.content = $event"></input-component>
      </div>
      <div>
        <input-component class="mb-2" title="Yêu cầu" @data="recruitmentInfo.requirement = $event"></input-component>
        <div class="d-flex">
          <span class="input-title fw-medium">Ngày hết hạn</span>
          <Datepicker
              v-model="dateExpired"
              placeholder="Chọn ngày hết hạn"
              class="p-2"
          />
        </div>
      </div>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="createRecruitment">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>
<script setup>
import InputComponent from '@/components/InputComponent.vue'
import {ref} from "vue";
import {config} from "@/Common/app.config.ts";
import axios from "axios";
import Datepicker from "vue3-datepicker";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

const dateExpired = ref('');

const recruitmentInfo = ref({
  content : '',
  quantity : '',
  position: '',
  requirement: '',
  expired: '',
})

const errorMessage = ref('');

const createRecruitment = async () => {
  try {
    const date = new Date(dateExpired.value);
    recruitmentInfo.value.expired =  new Intl.DateTimeFormat('en-CA').format(date);
    await axios.post(
        `${config.apiUrl}recruitments`, recruitmentInfo.value
    )
    location.reload();
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}
</script>
<style scoped>
.content {
  width: 750px;
  height: 450px;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dee2e6;
}

select {
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
}

.input-title {
  padding: 6px 20px 0 0;
}
</style>
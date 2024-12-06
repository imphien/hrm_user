<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Thông tin tuyển dụng</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <input-component class="mb-2" title="Vị trí" :value="recruitmentInfo.position" @data="recruitmentInfo.position = $event"></input-component>
        <input-component class="mb-2" title="Số lượng" :value="recruitmentInfo.quantity" @data="recruitmentInfo.quantity = $event"></input-component>
        <input-component class="mb-2" title="Nội dung" :value="recruitmentInfo.content" @data="recruitmentInfo.content = $event"></input-component>
      </div>
      <div>
        <input-component class="mb-2" title="Yêu cầu" :value="recruitmentInfo.content" @data="recruitmentInfo.content = $event"></input-component>
        <input-component class="mb-2" title="Ngày hết hạn" :value="recruitmentInfo.expired" @data="recruitmentInfo.expired = $event"></input-component>
      </div>
    </div>
    <div class="text-center mt-4">
      <button type="button" class="btn btn-primary me-3 px-4" @click="updateRecruitment(recruitmentInfo.id)">Lưu</button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">Huỷ</button>
    </div>
  </div>
</template>
<script setup>
import InputComponent from '@/components/InputComponent.vue'
import {ref} from "vue";
import {config} from "@/Common/app.config.ts";
import axios from "axios";

// eslint-disable-next-line no-undef
defineEmits(['isShow'])

// eslint-disable-next-line no-undef
const props = defineProps(['recruitment']);

const recruitmentInfo = ref({
  id: props.recruitment.id,
  content : props.recruitment.content,
  quantity : props.recruitment.quantity,
  position: props.recruitment.position,
  requirement: props.recruitment.requirement,
  expired: props.recruitment.expired,
})

const errorMessage = ref('');

const updateRecruitment = async (recruitmentId) => {
  try {
    await axios.put(
        `${config.apiUrl}recruitments/${recruitmentId}`, recruitmentInfo.value
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
</style>
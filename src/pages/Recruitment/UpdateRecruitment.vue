<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Thông tin tuyển dụng</h1>
    <div class="d-flex mx-4">
      <div class="mx-4">
        <div class="d-flex justify-content-between pb-2">
          <span class="input-title fw-medium">Vai trò</span>
          <select
              class="role-selected form-select"
              id="roles"
              name="roles"
              v-model="recruitmentInfo.role_id"
          >
            <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
          </select>
          <p v-if="errors.role_id" class="text-danger">{{ errors.role_id }}</p>
        </div>

        <input-component
            class="mb-2"
            title="Số lượng"
            :value="recruitmentInfo.quantity"
            @data="recruitmentInfo.quantity = $event"
        ></input-component>
        <p v-if="errors.quantity" class="text-danger">{{ errors.quantity }}</p>
      </div>

      <div>
        <input-component
            class="mb-2"
            title="Yêu cầu"
            :value="recruitmentInfo.requirement"
            @data="recruitmentInfo.requirement = $event"
        ></input-component>
        <p v-if="errors.requirement" class="text-danger">{{ errors.requirement }}</p>

        <div class="d-flex">
          <span class="input-title fw-medium">Ngày hết hạn</span>
          <Datepicker
              v-model="recruitmentInfo.expired"
              placeholder="Chọn ngày hết hạn"
              class="p-2"
              :disabled-dates="disablePastDates"
          />
        </div>
        <p v-if="errors.expired" class="text-danger">{{ errors.expired }}</p>
      </div>
    </div>

    <div class="d-flex flex-column mx-5">
      <span class="input-title fw-medium mb-2">Nội dung</span>
      <textarea
          class="form-control resize-none"
          :rows="3"
          v-model="recruitmentInfo.content"
      ></textarea>
      <p v-if="errors.content" class="text-danger">{{ errors.content }}</p>
    </div>

    <div class="text-center mt-4">
      <button
          type="button"
          class="btn btn-primary me-3 px-4"
          @click="updateRecruitment(recruitmentInfo.id)"
      >
        Lưu
      </button>
      <button type="button" class="btn btn-danger me-3 px-4" @click="$emit('hide')">
        Huỷ
      </button>
    </div>
    <LoadingComponent :visible="loading" />
  </div>
</template>

<script setup>
import InputComponent from '@/components/InputComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { onMounted, ref } from 'vue';
import Datepicker from 'vue3-datepicker';
import api from '@/api';

// eslint-disable-next-line no-undef
defineEmits(['isShow']);

// eslint-disable-next-line no-undef
const props = defineProps(['recruitment']);

const recruitmentInfo = ref({
  id: props.recruitment.id,
  content: props.recruitment.content,
  quantity: props.recruitment.quantity,
  role_id: props.recruitment.role_id,
  requirement: props.recruitment.requirement,
  expired: new Date(props.recruitment.expired),
});

const roles = ref([]);
const errors = ref({});
const loading = ref(false);

onMounted(() => {
  getListRoles();
});

const updateRecruitment = async (recruitmentId) => {
  errors.value = {};
  let isValid = true;

  for (const key in recruitmentInfo.value) {
    if (!recruitmentInfo.value[key]) {
      let title = '';
      if (key === 'role_id') {
        title = 'vai trò';
      }
      if (key === 'content') {
        title = 'nội dung';
      }
      if (key === 'quantity') {
        title = 'số lượng';
      }
      if (key === 'requirement') {
        title = 'yêu cầu';
      }
      errors.value[key] = `Không được để trống ${title}`;
      isValid = false;
    }
  }

  if (!isValid) return;

  try {
    loading.value = true;
    const payload = { ...recruitmentInfo.value };

    if (payload.expired instanceof Date) {
      const adjustedDate = new Date(
          payload.expired.getTime() + Math.abs(payload.expired.getTimezoneOffset() * 60000)
      );
      payload.expired = adjustedDate.toISOString().split('T')[0];
    }

    await api.put(`recruitments/${recruitmentId}`, payload);
    location.reload();
  } catch (err) {
    errors.value.apiError = err.response?.data.errors || 'Đã xảy ra lỗi.';
  } finally {
    loading.value = false;
  }
};

const getListRoles = async () => {
  try {
    loading.value = true;
    const response = await api.get('roles');
    roles.value = response.data.data;
  } catch (err) {
    errors.value.apiError = err.response?.data.errors || 'Không thể tải danh sách vai trò.';
  } finally {
    loading.value = false;
  }
};

const disablePastDates = {
  predicate: (currentDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return currentDate < today;
  },
};
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

.text-danger {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>

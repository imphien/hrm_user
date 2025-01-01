<template>
  <div class="content">
    <h1 class="text-title text-center fs-3 fw-bold pt-4 mb-4">Tạo mới thông tin tuyển dụng</h1>
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
            <option value="">Chọn vai trò</option>
            <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
          </select>
        </div>
        <p v-if="errors.role_id" class="text-danger">{{ errors.role_id }}</p>

        <input-component
            class="mb-2"
            title="Số lượng"
            type="number"
            @data="recruitmentInfo.quantity = $event"
        ></input-component>
        <p v-if="errors.quantity" class="text-danger">{{ errors.quantity }}</p>
      </div>

      <div>
        <input-component
            class="mb-2"
            title="Yêu cầu"
            @data="recruitmentInfo.requirement = $event"
        ></input-component>
        <p v-if="errors.requirement" class="text-danger">{{ errors.requirement }}</p>

        <div class="d-flex">
          <span class="input-title fw-medium">Ngày hết hạn</span>
          <Datepicker
              v-model="dateExpired"
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
          @click="createRecruitment"
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

const dateExpired = ref('');
const roles = ref([]);

const recruitmentInfo = ref({
  content: '',
  quantity: '',
  role_id: '',
  requirement: '',
  expired: '',
});
const loading = ref(false);

const errors = ref({});

onMounted(() => {
  getListRoles();
});

const createRecruitment = async () => {
  errors.value = {};
  let isValid = true;

  for (const key in recruitmentInfo.value) {
    if (key === 'expired') {
      continue;
    }
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

  if (!dateExpired.value) {
    errors.value.expired = 'Không được để trống ngày hết hạn';
    isValid = false;
  }

  if (!isValid) return;

  try {
    loading.value = true;
    const date = new Date(dateExpired.value);
    recruitmentInfo.value.expired = new Intl.DateTimeFormat('en-CA').format(date);
    await api.post('recruitments', recruitmentInfo.value);
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
  height: 550px;
  position: absolute;
  background-color: white;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dee2e6;
}

.input-title {
  padding: 6px 20px 0 0;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>

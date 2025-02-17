<template>
  <div class="d-flex">
    <span class="input-title fw-medium">{{ props.title }}</span>
    <select class="form-select" id="roles" name="roles" @select='$emit("data", $event.target.value)'>
      <option value="" selected disabled>Chọn vai trò</option>
      <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
    </select>
  </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import api from "@/api";

// eslint-disable-next-line no-undef
const props = defineProps(['title']);
const roles = ref([]);
const errorMessage = ref('');

const getListRoles = async () => {
  try {
    const response = await api.get('roles',
    )
    roles.value = response.data.data
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}

onMounted(() => {
  getListRoles();
})
</script>
<style scoped>
.input-title {
  min-width: 115px;
}

.form-select {
  width: 150px;
}
</style>
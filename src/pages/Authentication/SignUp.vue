<template>
  <div class="container d-flex justify-content-center align-items-center">
    <div>
      <div class="form d-flex flex-column rounded-4 px-5">
        <h1 class="text-center py-5">Đăng nhập</h1>

        <div class="form-input-auth text-center mb-3 position-relative">
          <input
              class="form-input pt-4 pb-2 px-3 rounded-2"
              type="text"
              v-model="dataInputEmail"
          />
          <label class="form-input-label" :class="activeClassEmail">Email</label>
        </div>
        <p v-if="errors.email" class="text-danger">{{ errors.email }}</p>

        <div class="form-input-auth text-center mb-3 position-relative">
          <input
              class="form-input pt-4 pb-2 px-3 rounded-2"
              type="password"
              v-model="dataInputPassword"
          />
          <label class="form-input-label" :class="activeClassPassword">Mật khẩu</label>
        </div>
        <p v-if="errors.password" class="text-danger">{{ errors.password }}</p>

<!--        <div class="d-flex flex-row-reverse mb-3">-->
<!--          <a class="text-decoration-none text-reset" href="#">Quên mật khẩu</a>-->
<!--        </div>-->

        <div class="text-center px-5 mb-3">
          <button class="rounded-5 btn btn-dark" @click="login()">Đăng nhập</button>
        </div>

        <div class="text-center p-5">
          <p>Make by I'm Phiến</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import router from '@/router';
import api from "@/api";

const dataInputEmail = ref('');
const dataInputPassword = ref('');
const errors = ref({}); // Đối tượng lưu lỗi

const activeClassEmail = computed(() => {
  return dataInputEmail.value ? 'active' : '';
});

const activeClassPassword = computed(() => {
  return dataInputPassword.value ? 'active' : '';
});

const login = async () => {
  errors.value = {};

  let isValid = true;

  if (!dataInputEmail.value) {
    errors.value.email = "Email không được để trống.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataInputEmail.value)) {
    errors.value.email = "Email không hợp lệ.";
    isValid = false;
  }

  if (!dataInputPassword.value) {
    errors.value.password = "Mật khẩu không được để trống.";
    isValid = false;
  }

  if (!isValid) return;

  try {
    const response = await api.post('login', {
      email: dataInputEmail.value,
      password: dataInputPassword.value,
    });
    localStorage.setItem('token', response.data.data.access_token);
    await getCurrentUser();
    await router.push('/notifications');
  } catch (err) {
    errors.value = err.response.data.errors || {
      password: "Email hoặc mật khẩu không đúng.",
    };
  }
};

const getCurrentUser = async () => {
  try {
    const response = await api.get('users/who-am-i');
    localStorage.setItem('currentUser', JSON.stringify(response.data.data));
  } catch (err) {
    errors.value = err.response.data.errors;
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
}

.form {
  background: white;
  width: 520px;
}

.form-input-auth {
  width: 100%;
}

input {
  width: 100%;
  background-color: #f4f5f7;
  border: 1px solid #f4f5f7;
  color: black;
  line-height: 20px;
}

.form-input-label {
  position: absolute;
  left: 17px;
  top: 16px;
  font-size: 17px;
  transition: 0.5s;
}

input:focus ~ .form-input-label {
  top: 5px;
  font-size: 13px;
  opacity: 0.5;
}

.form-input-label.active {
  top: 5px;
  font-size: 13px;
  opacity: 0.5;
}

input:hover {
  border: 1px solid #f4f5f7;
}

button {
  height: 50px;
  width: 100%;
}

p {
  width: 100%;
}

.text-danger {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>

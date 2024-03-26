<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div>
            <div class="form d-flex flex-column rounded-4 px-5">
                <h1 class="text-center py-5">Đăng nhập</h1>
                <div class="form-input-auth text-center mb-3 position-relative">
                    <input class="form-input pt-4 pb-2 px-3 rounded-2" type="text" v-model="dataInputEmail">
                    <label class="form-input-label" :class="activeClassEmail">Email</label>
                </div>
                <p v-if="errorMessage.email" class="text-danger">{{ errorMessage.email[0] }}</p>
                <div class="form-input-auth text-center mb-3 position-relative">
                    <input class="form-input pt-4 pb-2  px-3 rounded-2" type="password" v-model="dataInputPassword">
                    <label class="form-input-label" :class="activeClassPassword">Mật khẩu</label>
                </div>
                <p v-if="errorMessage.password" class="text-danger">{{ errorMessage.password[0] }}</p>
                <div class="d-flex flex-row-reverse mb-3">
                    <a class="text-decoration-none text-reset" href="#">Quên mật khẩu</a>
                </div>
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
    import axios from 'axios';

    const dataInputEmail = ref('');
    const dataInputPassword = ref('');
    const errorMessage = ref({});
    
    const activeClassEmail = computed(() => {
      return dataInputEmail.value ? 'active' : '';
    });

    const activeClassPassword = computed(() => {
      return dataInputPassword.value ? 'active' : '';
    });

    const login = async () => {
        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/login`,
                {
                    email: dataInputEmail.value,
                    password: dataInputPassword.value,
                }
            )
            localStorage.setItem('token', response.data.data.access_token)
        } catch (err) {
            errorMessage.value = err.response.data.errors;
        }
    }

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

    input:focus ~ .form-input-label{
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
</style>

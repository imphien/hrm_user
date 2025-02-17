<template>
    <div class="container-fuild header-body">
        <div class="row">
            <div class="container-image col-9 px-0 border border-5 border-dark">
                <img class="img-header" src="../assets/images-2.jpeg">
            </div>
            <div class="col-3 d-flex bg-white border border-dark">
                <img class="img-user" src="../assets/images-2.png">
                <div class="ps-5">
                    <div class="py-2">
                        <div>{{ currentUser.full_name }}</div>
                        <div>Mã nhân viên: {{ currentUser.id }}</div>
                    </div>
                    <div>
<!--                        <a href="#">Đổi mật khẩu</a>-->
                        <a class="" href="#" @click="logout">Đăng xuất</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import router from "@/router";
import api from "@/api";

const currentUser = ref({});
const errorMessage = ref({});

onMounted(() => {
  getCurrentUser();
})

const getCurrentUser = () => {
  const storedUser = localStorage.getItem('currentUser');
  currentUser.value = JSON.parse(storedUser);
}

const logout = async () => {
  try {
    await api.post('logout', {});

    localStorage.setItem('currentUser', null)
    localStorage.setItem('token', null)

    await router.push('/login')
  } catch (err) {
    errorMessage.value = err.response.data.errors;
  }
}
</script>
<style scoped>
    .header-body {
        height: 100px;
        position: fixed;
        width: 100%;
    }

    .img-user {
        height: 100px;
        width: 100px;
    }

    .img-header {
        height: 104px;
        width: 100%;
    }
</style>
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
                        <div>Quan tri he thong</div>
                    </div>
                    <div>
                        <a href="#">Đổi mật khẩu</a>
                        <a class="ps-3" href="#" @click="logout">Đăng xuất</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import {config} from "@/Common/app.config.ts";
import router from "@/router";

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
    const token = localStorage.getItem('token');
    await axios.post(
        config.apiUrl + `logout`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    )

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
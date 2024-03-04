<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div>
            <form class="form d-flex flex-column rounded-4 px-5">
                <h1 class="text-center py-5">Đăng nhập</h1>
                <div class="form-input-auth text-center mb-3 position-relative">
                    <input class="form-input pt-4 pb-2 px-3 rounded-2" type="text" v-model="activeClass">
                    <label class="form-input-label" :class="'active'">Email</label>
                </div>
                <div class="form-input-auth text-center mb-3 position-relative">
                    <input class="form-input pt-4 pb-2  px-3 rounded-2" type="password">
                    <label class="form-input-label" :class="activeClass">Mật khẩu</label>
                </div>
                <div class="d-flex flex-row-reverse mb-3">
                    <a class="text-decoration-none text-reset" href="#">Quên mật khẩu</a>
                </div>
                <div class="text-center px-5 mb-3">
                    <button class="rounded-5 btn btn-dark">Đăng nhập</button>
                </div>
                <div class="text-center p-5">
                    <p>Make by I'm Phiến</p>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup>{
    const { ref, computed } = Vue;

    const dataInput = ref('');
    
    const activeClass = computed(() => {
      return dataInput.value ? 'active' : '';
    });
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

    .form-input-label.active {
        position: absolute;
        left: 17px;
        top: 16px;
        font-size: 17px;
        transition: 0.5s;
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

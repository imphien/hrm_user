<template>
    <div class="container d-flex justify-content-center align-items-center">
        <div>
            <form class="form d-flex flex-column rounded-4 px-5">
            <h1 class="text-center py-5">Đăng nhập</h1>
            <div class="form-input text-center mb-3">
                <input class="py-2 px-3 rounded-2" type="text" placeholder="Email">
            </div>
            <div class="form-input text-center mb-3">
                <input class="py-2 px-3 rounded-2" type="password" placeholder="Mật khẩu">
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
<script>
    export default {
        name: 'SignUp'
    }
</script>
<style>
    .container {
        height: 100vh;
    }

    .form {
        background: white;
        width: 520px;
    }

    .form-input {
        width: 100%;
    }

    input {
        width: 100%;
        background-color: #f4f5f7;
        border: 1px solid #f4f5f7;
        color: black;
        line-height: 20px;
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

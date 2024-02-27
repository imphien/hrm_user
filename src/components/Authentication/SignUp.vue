<template>
    <div class="container d-flex justify-content-center align-items-center">
        <form class="form d-flex flex-column rounded-4">
            <h1 class="text-center pt-4 pb-4">Đăng nhập</h1>
            <div class="d-flex px-4 py-2">
                <label class="pt-1" for="email">Tên đăng nhập</label>
                <input class="rounded-3 border-0 px-3" type="text" placeholder="Nhập email">
            </div>
            <div class="d-flex px-4 py-2">
                <label class="pt-1" for="password">Mật khẩu</label>
                <input class="rounded-3 border-0 px-3" type="password" placeholder="Nhập password">
            </div>
            <div class="text-center my-2 ms-5">
                <input type="checkbox">
                <label class="text-center" for="remember_login">
                    Nhớ đăng nhập
                </label>
            </div>
            <div>
                <button class="btn-submit position-absolute btn btn-primary">Đăng nhập</button>
            </div>
        </form>
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
        width: 400px;
        height: 400px;
        background-color: bisque;
    }

    input {
        flex: 1;
        outline: none;
       
    }

    label {
        min-width: 130px;
        height: 35px;
    }

    .btn-submit {
        width: 150px;
        left: 45%;
    }
</style>

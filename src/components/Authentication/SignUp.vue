<template>
    <div class="tien">
      <form class="form-login">
        <h1 class="title">Đăng nhập</h1>
        <div class="container d-flex flex-column">
          <div class="d-flex mb-3">
            <label class="form-label" for="email" style="min-width: 100px;">Email</label>
            <input type="text" placeholder="Nhập email" style="flex: 1;">
          </div>
          <div class="d-flex mb-3">
            <label class="form-label" style="min-width: 100px;">Mật khẩu</label>
            <input type="password" placeholder="Nhập mật khẩu" style="flex: 1;">
          </div>
          <label class="mb-5">
            <input class="me-2" type="checkbox" id="save_name">Nhớ tên đăng nhập
          </label>
          <div class="d-grid gap-2 d-md-block">
            <button class="btn btn-primary" type="button">ĐĂNG NHẬP</button>
          </div>
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
    .tien {
      background-color: #606468;
      position: absolute;
      width: 100vw;
      background-repeat: no-repeat;
    }
    .title {
        padding: 20px 0 50px 0;
    }
    .form-login {
        width: 400px;
        height: 400px;
        margin: 5% auto 15% auto;
        border-radius: 20px;
    }

    input {
        border-radius: 10px;
        border: 1px solid #bdbdbd;
        outline: none;
        padding: 0 15px;
    }
</style>

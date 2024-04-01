<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Tài khoản nhân viên
    </div>
    <div class="d-flex pt-3">
      <div class="col-9">
        <div class="d-flex justify-content-around">
          <div class="d-flex">
            <span class="input-title fw-medium">Mã nhân viên</span>
            <input type="text">
          </div>
          <div class="d-flex">
            <span class="input-title fw-medium">Họ và tên</span>
            <input type="text">
          </div>
        </div>
        <div class="d-flex justify-content-around pt-3">
          <div class="d-flex">
            <span class="input-title fw-medium">Vai trò</span>
            <select class="role-selected form-select" id="roles" name="roles">
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="worker">Worker</option>
            </select>
          </div>
          <button class="btn btn-dark">
            <i class="fa-solid fa-magnifying-glass"></i> Tìm kiếm
          </button>
        </div>
      </div>
      <div class="col-3">
        <button class="btn btn-primary btn-lg"> Thêm mới </button>
      </div>
    </div>
    <div class="pt-5">
      <table class="table table-bordered">
        <thead>
        <tr class="text-center">
          <th scope="col">STT</th>
          <th scope="col">Họ và tên</th>
          <th scope="col">SDT</th>
          <th scope="col">Ngày sinh</th>
          <th scope="col">Giới tính</th>
          <th scope="col">Email</th>
          <th scope="col">Vai trò</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Xem chi tiết</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center">
          <th scope="row">1</th>
          <td>Phạm Văn Tiến</td>
          <td>0868793781</td>
          <td>13-08-2000</td>
          <td>Nam</td>
          <td>phamvantienbm@gmail.com</td>
          <td>Admin</td>
          <td>Hoạt động</td>
          <td class="d-flex justify-content-around">
            <button class="btn btn-primary">Sửa</button>
            <button class="btn btn-danger">Xoá</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
</script>
<style>
  .input-title {
    padding: 6px 15px 0 0;
  }

  .role-selected {
    width: 175px !important;
  }

  input {
    border: 1px solid #dee2e6;
    border-radius: 0.375rem;
  }
</style>

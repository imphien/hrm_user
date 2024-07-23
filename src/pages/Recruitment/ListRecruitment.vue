<template>
  <div class="col-10">
    <div class="text-title text-center fs-2 fw-bold pt-4">
      Tin tuyển dụng
    </div>
    <div class="d-flex pt-3">
      <div class="col-9">
        <div class="d-flex justify-content-around">
          <div class="d-flex">
            <span class="input-title fw-medium">Từ ngày</span>
            <input type="text">
          </div>
          <div class="d-flex">
            <span class="input-title fw-medium">Đến ngày</span>
            <input type="text">
          </div>
        </div>
        <div class="d-flex justify-content-around pt-3">
          <div class="d-flex">
            <span class="input-title fw-medium">Vai trò</span>
            <select class="role-selected form-select" id="roles" name="roles">
              <option></option>
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
          <th scope="col">Vị trí</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Nội dung</th>
          <th scope="col">Yêu cầu</th>
          <th scope="col">Ngày hết hạn</th>
          <th scope="col">Sửa</th>
        </tr>
        </thead>
        <tbody>
        <tr class="text-center">
          <th scope="row">1</th>
          <td>Developer</td>
          <td>1</td>
          <td>Intern</td>
          <td>Kinh nghiệm trên 3 năm</td>
          <td>10-12-2024</td>
          <td>
            <button class="btn btn-primary">Sửa</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>

</script>
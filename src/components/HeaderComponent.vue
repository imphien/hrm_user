<template>
    <div class="container-fuild header-body">
        <div class="row">
            <div class="container-image col-9 px-0 border border-5 border-dark">
                <img class="img-header" src="../assets/images-2.jpeg">
            </div>
            <div class="col-3 d-flex bg-white">
                <img class="img-user" src="../assets/images-2.png">
                <div class="ps-5">
                    <div class="py-2">
                        <div>Nguyen Van A</div>
                        <div>Quan tri he thong</div>
                    </div>
                    <div>
                        <a href="#">Đổi mật khẩu</a>
                        <a class="ps-5" href="#">Đăng xuất</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
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
        height: 100px;
        width: 100%;
    }
</style>
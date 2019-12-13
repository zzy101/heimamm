<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <div class="login-from">
        <!-- 标题 -->
      <div class="login-title">
        <img src="../../assets/login-log.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
    </div>
    <!-- 右边的图片 -->
    <div class="login-img">
      <img src="../../assets/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang = "less">
.login-container {
  /* 开启弹性 */
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );

  /* 登录表单 */
  .login-from {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 44px;

    /* 标题 */
    .login-title {
        display: flex;
        align-items: center;
        /* log */
        img {
            width: 22px;
            height: 17px;
            margin-right: 16px;
        }
        .title {
            font-size: 24px;
            margin-right: 14px;
        }
        i {
            width: 1px;
            height: 28px;
            background-color: #C7C7C7;
            margin-right: 12px;
        }
        .sub-title {
            font-size: 22px;
        }

    }
  }
}
</style>
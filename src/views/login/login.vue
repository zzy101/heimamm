<template>
  <div class="login-container">
      <!-- 登录表单 -->
    <div class="login-from"></div>
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
  }
}
</style>
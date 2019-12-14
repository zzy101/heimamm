<template>
  <div class="login-container">
    <!-- 登录内容 -->
    <div class="login-main">
      <!-- 标题 -->
      <div class="login-title">
        <img src="../../assets/login-log.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 登录表单 -->
      <el-form class="login-from" status-icon :rules="rules" ref="form" :model="form">
        <!-- 用户名 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="captcha">
          <el-row>
            <!-- 验证码输入框 -->
            <el-col :span="16">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.captcha"></el-input>
            </el-col>
            <!-- 验证码图片 -->
            <el-col class="captcha" :span="8">
              <img @click="newCaptcha" :src="captchaUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item>
          <el-checkbox v-model="form.checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button class="register" type="success">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右边的图片 -->
    <div class="login-img">
      <img src="../../assets/login_banner_ele.png" alt />
    </div>
  </div>
</template>

<script>
// 导入axios
import axios from "axios";

export default {
  data() {
    // 手机号判断
    var checkedPhone = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value) == false) {
          callback(new Error("手机格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      // 表单数据
      form: {
        phone: "",
        password: "",
        captcha: "",
        checked: false
      },
      // 表单规则
      rules: {
        // 手机号
        phone: [{ required: true, validator: checkedPhone, trigger: "blur" }],
        // 密码
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "change"
          }
        ],
        // 验证码
        captcha: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          },
          {
            min: 4,
            max: 4,
            message: "长度在 4 个字符",
            trigger: "change"
          }
        ]
      },
      // 验证码接口
      captchaUrl: process.env.VUE_APP_baseUrl + "/captcha?type=login"
    };
  },
  methods: {
    // 点击登录按钮做的表单验证
    submitForm() {
      if (this.form.checked == true) {
        this.$refs.form.validate(valid => {
          // 登录成功
          if (valid) {
            // window.console.log(this.form.phone)
             window.console.log(this.form.captcha)

            axios({
              url: process.env.VUE_APP_baseUrl + "/login",
              method: "post",
              // 因为基地址和 当前路径不同源, 但是后台已经处理了跨域的问题, 但是cook令牌带不过去, 所以要加上这句代码
              withCredentials: true,

              data: {
                phone: this.form.phone,
                password: this.form.password,
                code: this.form.captcha
              }
            }).then(res => {
              //成功回调
              window.console.log(res);
            });
          } else {
            this.$message.error("输入的内容有误或者不全");
          }
        });
      } else {
        this.$message.warning("请同意用户协议");
      }
    },
    // 点击验证码切换 因为浏览器缓存的原因 在后面加一个 时间戳 就可以了
    newCaptcha() {
      this.captchaUrl = this.captchaUrl + Date.now();
    }
  }
};
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

  /* 登录模块 */
  .login-main {
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
        background-color: #c7c7c7;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }

    /* 登录表单 */
    .login-from {
      margin-top: 27px;
      /* 验证码 */
      .el-row {
        .captcha {
          height: 40px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      /* 用户协议 */
      .el-checkbox {
        display: flex;
        align-items: center;

        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
      /* 按钮样式 */
      .el-button {
        width: 100%;
        margin: 0;
        font-size: 16px;
      }
      .register {
        margin-top: 26px;
      }
    }
  }
}
</style>
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
          <el-button class="register" @click="dialogFormVisible = true" type="success">注册</el-button>
        </el-form-item>
      </el-form>
      <!-- 注册表单 -->
      <el-dialog
        class="registerForm"
        title="用户注册"
        :visible.sync="dialogFormVisible"
        center
        width="30%"
      >
        <el-form :model="regForm" :rules="registerRules" ref="registerForm">
          <!-- 头像 -->
          <el-form-item  label="头像" :label-width="formLabelWidth" prop="icon">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1/heimamm/public/uploads"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 昵称 -->
          <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="regForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 邮箱 -->
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="regForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 手机 -->
          <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
            <el-input v-model="regForm.phone" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
            <el-input show-password v-model="regForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 图形码 -->
          <el-row>
            <el-col :span="16">
              <el-form-item label="图形码" :label-width="formLabelWidth" prop="handover">
                <el-input v-model="regForm.handover" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="7">
              <img @click="handoverRegPic" class="registerPic" :src="registerSendsms" alt />
            </el-col>
          </el-row>
          <!-- 验证码 -->
          <el-row>
            <el-col :span="16">
              <el-form-item label="验证码" :label-width="formLabelWidth" prop="captcha">
                <el-input v-model="regForm.captcha" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :offset="1" :span="7">
              <el-button @click="getRegCpatcha" class="registerCpatcha">发送验证码</el-button>
            </el-col>
          </el-row>
        </el-form>
        <!-- 底部按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
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
    // 邮箱判断
    let checkedEmail = (rule, value, callback) => {
      if (value == "") {
        return callback(new Error("邮箱不能为空"));
      } else {
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value) == false) {
          callback(new Error("邮箱格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      // 登录表单数据
      form: {
        phone: "", //手机号
        password: "", //密码
        captcha: "", //验证码
        checked: false //复选框
      },
      // 注册表单数据
      regForm: {
        name: "", //昵称
        email: "", //邮箱
        phone: "", //手机号
        password: "", //密码
        handover: "", //图形码
        captcha: "" //验证码
      },
      dialogFormVisible: false, //是否打开弹出框
      formLabelWidth: "65px",
      // 登录表单规则
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
      // 注册表单规则
      registerRules: {
        // 昵称
        name: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 2,
            max: 6,
            message: "长度在 2 到 6 个字符",
            trigger: "change"
          }
        ],
        // 邮箱
        email: [{ required: true, validator: checkedEmail, trigger: "blur" }],
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
        // 图形码
        handover: [
          {
            required: true,
            message: "请输入图形码",
            trigger: "blur"
          },
          {
            min: 4,
            max: 4,
            message: "长度在 4 字符",
            trigger: "change"
          }
        ],
        // 验证码
        captcha:[{
          required:true
        }],
        // 头像
        icon:[{
          required:true
        }]
      },
      // 登录模块验证码接口
      captchaUrl: process.env.VUE_APP_baseUrl + "/captcha?type=login",
      imageUrl: "", //头像路径
      registerSendsms: `${process.env.VUE_APP_baseUrl}/captcha?type=sendsms` //注册模块 图形码
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
            window.console.log(this.form.captcha);

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
    // 点击登录页面验证码切换 因为浏览器缓存的原因 在后面加一个 时间戳 就可以了
    newCaptcha() {
      this.captchaUrl = this.captchaUrl + Date.now();
    },
    // 头像功能 - 上传成功
    handleAvatarSuccess(res, file) {
      window.console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 头像功能 - 上传规则
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 < 500;
      window.console.log(file);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 500KB!");
      }
      return isJPG && isLt2M;
    },
    // 点击注册页面图形码切换 因为浏览器缓存的原因 在后面加一个 时间戳 就可以了
    handoverRegPic() {
      window.console.log("1");
      this.registerSendsms = `${
        process.env.VUE_APP_baseUrl
      }/captcha?type=sendsms&${Date.now()}`;
    },
    // 点击获取注册界面短信验证码
    getRegCpatcha() {
      // axios({
      //   url:process.env.VUE_APP_baseUrl + '/sendsms',
      //   method:'post',
      //   data: {
      //     code :
      //   },
      // }).then(res=>{
      //   //成功回调
      //   console.log(res)
      // });
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

    /* 注册表单 */
    .registerForm .el-dialog {
      width: 603px;
      /* 标题 */
      .el-dialog__header {
        text-align: center;
        background: linear-gradient(to right, #01c5fa, #1395fa);
        padding: 15px;

        /* 关闭右边的叉叉 */
        .el-dialog__close {
          display: none;
        }

        /* 标题颜色 */
        .el-dialog__title {
          color: white;
        }
      }
    }
  }

  /* 注册模块 */
  .registerForm {
    /* 顶部头像 */
    .avatar-uploader {
      text-align: center;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    /* 图形码的图片 */
    .registerPic {
      width: 100%;
      height: 40px;
    }
    /* 验证码按钮 */
    .registerCpatcha {
      width: 100%;
    }
    /* 底部确认按钮 */
    .el-dialog__footer {
      align-content: center;
    }
  }
}
</style>
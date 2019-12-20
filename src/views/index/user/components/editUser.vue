<template>
  <!-- 新增用户 -->
  <el-dialog class="userAdd" title="编辑用户" :visible.sync="$parent.editFormVisible" center>
    <el-form :model="editForm" ref="editFrom" :rules="editRulse">
      <!-- 用户号 -->
      <el-form-item label="用户号" :label-width="formLabelWidth" prop="username">
        <el-input v-model="editForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 电话 -->
      <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="editForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 角色 -->
      <el-form-item label="角色" :label-width="formLabelWidth" prop="role_id">
        <el-select v-model="editForm.role_id" placeholder="请选择角色">
          <el-option label="管理员" :value="2"></el-option>
          <el-option label="老师" :value="3"></el-option>
          <el-option label="学生" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <!-- 状态 -->
      <el-form-item label="状态" :label-width="formLabelWidth" prop="status">
        <el-select v-model="editForm.status" placeholder="请选择角色">
          <el-option label="禁用" :value="0"></el-option>
          <el-option label="启用" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <!-- 备注 -->
      <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <!-- 确认按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入user 抽取层
import { useredit } from "../../../../API/user.js";
export default {
  data() {
    //   验证邮箱
    let checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else {
        let email = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (email.test(value)) {
          callback();
        } else {
          return callback(new Error("邮箱格式错误"));
        }
      }
    };
    // 手机号判断
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机不能为空"));
      } else {
        let email = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (email.test(value)) {
          callback();
        } else {
          return callback(new Error("手机格式错误"));
        }
      }
    };
    return {
      // 新增列表
      editForm: {
        //   用户名称
        username: "",
        // 邮箱
        email: "",
        // 手机号
        phone: "",
        // 角色
        role_id: "",
        // 状态
        status: "",
        // 备注
        remark: ""
      },
      //   新增列表规则
      editRulse: {
        //   用户名
        username: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "change" }
        ],
        // 邮箱
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        // 手机号
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }]
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    //   提交表单验证
    submitForm() {
      this.$refs.editFrom.validate(valid => {
        if (valid) {
          useredit({ ...this.editForm }).then(res => {
              window.console.log(res)
            if (res.code === 200) {
              this.$message.success("修改成功");
              this.$parent.getList(); //重新刷新数据
              this.$parent.editFormVisible = false; //关闭对话框
            } else if (res.code === 201) {
              this.$message.warning("用户名已存在");
            }
            // $parent.editFormVisible = false;
          });
        } else {
          this.$message.warning("修改失败!!!");
          return false;
        }
      });
    },

  }
};
</script>

<style>
</style>
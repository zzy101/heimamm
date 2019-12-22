<template>
  <!-- 新增用户 -->
  <el-dialog class="enterpriseAdd" title="新增用户" :visible.sync="$parent.addFormVisible" center>
    <el-form :model="addForm" ref="addFrom" :rules="addRulse">
      <!-- 企业编号-->
      <el-form-item label="企业编号" :label-width="formLabelWidth" prop="eid">
        <el-input v-model="addForm.eid" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 企业名称-->
      <el-form-item label="企业名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 企业简称-->
      <el-form-item label="企业简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 企业简介-->
      <el-form-item label="企业简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 企业备注-->
      <el-form-item label="企业备注" :label-width="formLabelWidth" prop="rema">
        <el-input v-model="addForm.rema" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <!-- 确认按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入user 抽取层
import { enterpriseAdd } from "../../../../API/enterprise";
export default {
  data() {
    return {
      // 新增列表
      addForm: {
        eid: "", //企业编号
        name: "", //企业名称
        short_name: "", //企业简称
        intro: "", //企业简介
        rema: "" //企业备注
      },
      //   新增列表规则
      addRulse: {
        //   企业编号
        eid : [
            {required: true, message: '请输入企业编号', trigger: 'blur'}
        ],
        // 企业名称
        name : [
            {required: true, message: '请输入企业名称', trigger: 'blur'}
        ],
        // 企业简称
        short_name : [
            {required: true, message: '请输入企业简称', trigger: 'blur'}
        ],
        // 企业简介
        intro : [
            {required: true, message: '请输入企业简介', trigger: 'blur'}
        ],
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    //   提交表单验证
    submitForm() {
      this.$refs.addFrom.validate(valid => {
        if (valid) {
          enterpriseAdd({ ...this.addForm }).then(res => {
            window.console.log(res)
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.$parent.getList(); //重新刷新数据
              this.$parent.addFormVisible = false; //关闭对话框
              this.addForm = {}
            } else if (res.code === 201) {
              this.$message.warning("用户名已存在");
            }
            // $parent.addFormVisible = false;
          });
        } else {
          this.$message.warning("新增失败!!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.enterpriseAdd {
  .el-dialog {
    width: 603px;
    .el-dialog__header {
      background: linear-gradient(to right, #01c5fa, #1395fa);
      .el-dialog__title {
        color: white;
      }
    }
  }
}
</style>
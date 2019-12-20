<template>
  <!-- 新增用户 -->
  <el-dialog class="subjectAdd" title="新增用户" :visible.sync="$parent.addFormVisible" center>
    <el-form :model="addForm" ref="addFrom" :rules="addRulse">
      <!-- 学科编号-->
      <el-form-item label="学科编号" :label-width="formLabelWidth" prop="rid">
        <el-input v-model="addForm.rid" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科名称-->
      <el-form-item label="学科名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="addForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简称-->
      <el-form-item label="学科简称" :label-width="formLabelWidth" prop="short_name">
        <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科简介-->
      <el-form-item label="学科简介" :label-width="formLabelWidth" prop="intro">
        <el-input v-model="addForm.intro" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 学科备注-->
      <el-form-item label="学科备注" :label-width="formLabelWidth" prop="rema">
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
import { subjectAdd } from "../../../../API/subject";
export default {
  data() {
    return {
      // 新增列表
      addForm: {
        rid: "", //学科编号
        name: "", //学科名称
        short_name: "", //学科简称
        intro: "", //学科简介
        rema: "" //学科备注
      },
      //   新增列表规则
      addRulse: {
        //   学科编号
        rid : [
            {required: true, message: '请输入学科编号', trigger: 'blur'}
        ],
        // 学科名称
        name : [
            {required: true, message: '请输入学科名称', trigger: 'blur'}
        ],
        // 学科简称
        short_name : [
            {required: true, message: '请输入学科简称', trigger: 'blur'}
        ],
        // 学科简介
        intro : [
            {required: true, message: '请输入学科简介', trigger: 'blur'}
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
          subjectAdd({ ...this.addForm }).then(res => {
            if (res.code === 200) {
              this.$message.success("新增成功");
              this.$parent.getList(); //重新刷新数据
              this.$parent.addFormVisible = false; //关闭对话框
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
.subjectAdd {
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
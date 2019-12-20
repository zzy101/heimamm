<template>
  <el-dialog title="收货地址" :visible.sync="$parent.addFormVisible" center>
    <el-form :model="form">
      <el-form-item label="学科" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动学科">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动阶段">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动企业">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择活动城市">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题型" :label-width="formLabelWidth">
        <el-radio v-model="form.radio" label="1">单选</el-radio>
        <el-radio v-model="form.radio" label="2">多选</el-radio>
        <el-radio v-model="form.radio" label="3">简答</el-radio>
      </el-form-item>
      <el-form-item label="难度" :label-width="formLabelWidth">
        <el-radio v-model="form.radio" label="1">简单</el-radio>
        <el-radio v-model="form.radio" label="2">一般</el-radio>
        <el-radio v-model="form.radio" label="3">困难</el-radio>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="试题标题" :label-width="formLabelWidth">
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="$parent.addFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        radio: "1"
      },
      formLabelWidth: "80px"
    };
  }
};
</script>

<style lang='less'>
.el-dialog__wrapper {
  .el-dialog {
    width: 1430px;
    // 头部标题颜色
    .el-dialog__header {
      background: linear-gradient(to right, #02c5fa, #1394fa);
    }
    .el-form {
      padding-left: 300px;
    //   文字靠左
      .el-form-item__label{
          text-align: left
      }
      .el-divider--horizontal {
        width: 830px;
      }
    }
  }
}
</style>
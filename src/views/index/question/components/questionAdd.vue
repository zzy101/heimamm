<template>
  <div class="question-add">
    <el-dialog
      title="题库列表"
      :visible.sync="$parent.addFormVisible"
      fullscreen
      center
      @opened="opened"
    >
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
        <el-form-item label="试题标题" :label-width="formLabelWidth"></el-form-item>
        <div class="editor-title"></div>
        <div class="editor-conter"></div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="$parent.addFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import wangeditor from "wangeditor";

export default {
  components: {},
  data() {
    return {
      form: {
        title: ""
      },
      formLabelWidth: "80px",
      editor: undefined,
      a:''
    };
  },
  methods: {
    // 打开 对话框的回调函数
    opened() {
      if (this.editor == undefined) {
        this.editor = new wangeditor(".editor-title", ".editor-conter");
        // 获取富文本框的内容
        this.editor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          this.form.title = html;
        };
        this.editor.create();
      }
    }
  },
  mounted() {}
};
</script>

<style lang='less'>
.question-add {
  .el-dialog {
    // 头部标题颜色
    .el-dialog__header {
      background: linear-gradient(to right, #02c5fa, #1394fa);
    }
    // 内盒子居中
    .el-dialog__body {
      width: 60%;
      margin: 0 auto;
      // 下拉框 文字 靠左
      .el-form-item__label {
        text-align: left;
      }
      // 下拉框样式
      .el-select {
        width: 365px;
      }
    }
    // 富文本样式
    .editor-title,
    .editor-conter {
      border: 1px solid #000;
    }
    .editor-conter {
      border-top: none;
      height: 100px;
    }
  }
}
</style>
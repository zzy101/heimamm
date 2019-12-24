<template>
  <div class="question-container">
    <!-- 表单卡片 -->
    <el-card class="box-card question-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <el-select v-model="formInline.region" placeholder="请选择学科">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.region" placeholder="请选择阶段">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="formInline.region" placeholder="请选择企业">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.region" placeholder="请选择题型">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.region" placeholder="请选择难度">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-col>
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formInline.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <br />
        <el-form-item class="title" label="标题">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button @click="addFormVisible = true" icon="el-icon-plus" type="primary">新增题目</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目"></el-table-column>
        <el-table-column prop="step" label="学科阶段"></el-table-column>
        <el-table-column prop="type" label="题型"></el-table-column>
        <el-table-column prop="enterprise" label="企业"></el-table-column>
        <el-table-column prop="creater" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="address" label="访问量"></el-table-column>
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>
    </el-card>
    <!-- 新增题目 -->
    <questionAdd></questionAdd>
  </div>
</template>

<script>
// 导入 API 抽取层
import { questionList } from "../../../API/question.js";
// 导入 新增 组件
import questionAdd from "./components/questionAdd.vue";

export default {
  components: {
    questionAdd
  },
  data() {
    return {
      // 表单数据
      formInline: {
        user: "",
        region: "",
        date1: "",
        date2: ""
      },
      // 新增对话框是否显示
      addFormVisible: false,
      // 表格数据
      tableData: []
    };
  },
  created() {
    questionList().then(res => {
      window.console.log(res);
    });
  }
};
</script>

<style lang="less">
.question-container {
  .question-form {
    margin-bottom: 20px;
    // input框样式
    .el-form-item {
      margin-left: 20px;
      .el-form-item__content {
        width: 150px;
      }
    }
    // input框 标题样式
    .el-form-item__label {
      margin-right: 20px;
    }
    // 按钮样式
    .btn .el-form-item__content {
      width: 100%;
    }
    // 标题样式
    .title .el-form-item__content {
      width: 388px;
    }
  }
  // 表格样式
  .el-card__body {
    .el-table .is-leaf {
      padding: 20px;
    }
  }
}
</style>
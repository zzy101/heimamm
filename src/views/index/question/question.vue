<template>
  <div class="question-container">
    <!-- 表单卡片 -->
    <el-card class="box-card question-form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科">
          <!-- 遍历学科数据 -->
          <el-select v-model="formInline.subject" placeholder="请选择学科">
            <template v-for="(item, index) in subjectAll">
              <el-option :key="index" :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="阶段">
          <el-select v-model="formInline.step" placeholder="请选择阶段">
            <el-option label="初级" value="1"></el-option>
            <el-option label="中级" value="2"></el-option>
            <el-option label="高级" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业">
          <el-select v-model="formInline.enterprise" placeholder="请选择企业">
            <!-- 遍历企业数据 -->
            <template v-for="(item, index) in enterpriseAll">
              <el-option :key="index" :label="item.name" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="题型">
          <el-select v-model="formInline.type" placeholder="请选择题型">
            <el-option label="单选" value="1"></el-option>
            <el-option label="多选" value="2"></el-option>
            <el-option label="简答" value="3"></el-option>
          </el-select>
        </el-form-item>
        <br />
        <el-form-item label="难度">
          <el-select v-model="formInline.difficulty" placeholder="请选择难度">
            <el-option label="简单" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="困难" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="禁止" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="formInline.create_date"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
        <br />
        <el-form-item class="title" label="标题">
          <el-input v-model="formInline.title"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button @click="getList()" type="primary">搜索</el-button>
          <el-button @click="clear">清除</el-button>
          <el-button @click="addFormVisible = true" icon="el-icon-plus" type="primary">新增题目</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-table :data="tableData" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="title" label="题目">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="step" label="学科阶段"></el-table-column>
        <el-table-column prop="type" label="题型"></el-table-column>
        <el-table-column prop="enterprise" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启动</span>
            <span v-else style="color:red">禁止</span>
          </template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button v-power="['学生']" @click="subjectEdit(scope.row)" type="text">编辑</el-button>
            <el-button
              @click="show_status(scope.row)"
              type="text"
            >{{scope.row.status == 1?'禁用':'启用'}}</el-button>
            <el-button v-power="['老师','学生','管理员']" @click="remove(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增题目 -->
    <questionAdd ref="setQuestion"></questionAdd>
  </div>
</template>

<script>
// 导入 学科 API 抽取层
import { subjectList } from "../../../API/subject.js";
// 导入企业 API 抽取层
import { enterpriseList } from "../../../API/enterprise.js";
// 导入 题库 API 抽取层
import { questionList,questionRemove} from "../../../API/question.js";
// 导入 新增 组件
import questionAdd from "./components/questionAdd.vue";

export default {
  name: "question",
  components: {
    questionAdd
  },
  data() {
    return {
      // 表单数据
      formInline: {},
      // 新增对话框是否显示
      addFormVisible: false,
      // 表格数据
      tableData: [],
      // 定义 学科
      subjectAll: [],
      // 定义企业
      enterpriseAll: []
    };
  },
  methods: {
    // 列表
    getList() {
      questionList({
        ...this.formInline
      }).then(res => {
        window.console.log(this.formInline);
        this.tableData = res.data.items;
      });
    },
    // 删除
    remove(items) {
      // window.console.log(items)
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          questionRemove({
            id: items.id
          }).then(res => {
            window.console.log(res);
            this.getList();
          });
        })
        .catch(() => {});
    },
     // 清空事件
    clear() {
      this.formInline = {};
      this.getList();
    },
  },
  created() {
    // 企业数据
    enterpriseList().then(res => {
      this.enterpriseAll = res.data.items;
    });
    // 学科数据
    subjectList().then(res => {
      this.subjectAll = res.data.items;
    });
    // 题库数据
    this.getList();
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
}
</style>
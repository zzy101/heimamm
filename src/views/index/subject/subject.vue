<template>
  <div class="subject">
    <el-card class="box-card subject-from">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- 学科编号 -->
        <el-form-item class="width100" label="学科编号">
          <el-input v-model="formInline.rid"></el-input>
        </el-form-item>
        <!-- 学科名称 -->
        <el-form-item label="学科名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <!-- 创建者 -->
        <el-form-item class="width100" label="创建者">
          <el-input v-model="formInline.username"></el-input>
        </el-form-item>
        <!-- 状态框 -->
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择状态">
            <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button @click="getList" type="primary">搜索</el-button>
        </el-form-item>
        <!-- 清除按钮 -->
        <el-form-item>
          <el-button @click="clear">清空</el-button>
        </el-form-item>
        <!-- 新增按钮 -->
        <el-form-item>
          <el-button @click="addFormVisible = true" type="primary" class="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card subject-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span style="color:red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button @click="handover(scope.row)" type="text">{{scope.row.status == 1?'禁用':'启用'}}</el-button>
            <el-button @click="remove(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="page_sizes"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增学科 -->
    <subjectAdd></subjectAdd>
  </div>
</template>

<script>
// 导入 API 接收 抽取层
import { subjectList, subjectRemove } from "../../../API/subject.js";

// 导入新增组件
import subjectAdd from "./compoents/subjectAdd";
export default {
  components: {
    subjectAdd
  },
  data() {
    return {
      // 表单数据
      formInline: {
        rid: "", //学科编号
        name: "", //学科名称
        username: "", //创建者
        status: "" //zhu
      },
      // 表格数据
      tableData: [],
      // 新增框是否显示
      addFormVisible: false,
      // 页容量
      page_sizes: [2, 4, 6, 8],
      page: 1, //当前页
      limit: 2, //页容量
      total: 0  //总条数
    };
  },
  methods: {
    // 获取列表信息
    getList() {
      subjectList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        window.console.log(res);
        this.tableData = res.data.items;
        this.total = res.data.pagination.total;
      });
    },
    // 清空事件
    clear() {
      this.formInline = {};
      this.getList();
    },
    // 切换状态
    handover(items) {
      if (items.status == 1) {
        items.status = 0;
      } else {
        items.status = 1;
      }
    },
    // 删除数据
    remove(items) {
      // window.console.log(items)
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subjectRemove({
            id: items.id
          }).then(res => {
            window.console.log(res);
            this.getList();
          });
        })
        .catch(() => {});
    },
    handleSizeChange(value) {
      this.limit = value;
      this.getList();
    },
    handleCurrentChange(value) {
      this.page = value;
      this.getList();
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less">
.subject {
  .subject-from {
    margin-bottom: 19px;
    .width100 .el-form-item__content {
      width: 100px;
    }
  }
  // 分页样式
  .el-pagination {
    margin-top: 30px;
    text-align: center;
  }
}
</style>
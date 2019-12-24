<template>
  <div class="enterprise">
    <el-card class="box-card enterprise-from">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- 企业编号 -->
        <el-form-item class="width100" label="企业编号">
          <el-input v-model="formInline.eid"></el-input>
        </el-form-item>
        <!-- 企业名称 -->
        <el-form-item label="企业名称">
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
          <el-button @click="addFormVisible = true" type="primary" class="el-icon-plus">新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card enterprise-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="eid" label="企业编号"></el-table-column>
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="username" label="创建者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期">
          <template slot-scope="scope">
                {{scope.row.create_time | filterMoment}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span style="color:red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作">
          <template slot-scope="scope">
            <el-button v-power="['老师','学生']" @click="enterpriseEdit(scope.row)" type="text">编辑</el-button>
            <el-button
              @click="show_status(scope.row)"
              type="text"
            >{{scope.row.status == 1?'禁用':'启用'}}</el-button>
            <el-button @click="remove(scope.row)"  type="text" v-power="['老师','学生','管理员']">删除</el-button>
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
    <!-- 新增企业 -->
    <enterpriseAdd></enterpriseAdd>
    <!-- 编辑企业 -->
    <enterpriseEdit ref="editData"></enterpriseEdit>
  </div>
</template>

<script>
// 导入 API 接收 抽取层
import {
  enterpriseList,
  enterpriseRemove,
  enterpriseStatus
} from "../../../API/enterprise.js";

// 导入新增组件
import enterpriseAdd from "./compoents/enterpriseAdd.vue";
import enterpriseEdit from "../enterprise/compoents/enterpriseEdit.vue";

export default {
  components: {
    enterpriseAdd,
    enterpriseEdit
  },
  data() {
    return {
      // 表单数据
      formInline: {
        eid: "", //企业编号
        name: "", //企业名称
        username: "", //创建者
        status: "" //zhu
      },
      // 表格数据
      tableData: [],
      // 新增框是否显示
      addFormVisible: false,
      // 编辑框是否显示
      editFormVisible: false,
      // 页容量
      page_sizes: [2, 4, 6, 8],
      page: 1, //当前页
      limit: 2, //页容量
      total: 0 //总条数
    };
  },
  methods: {
    // 获取列表信息
    getList() {
      enterpriseList({
        page: this.page,
        limit: this.limit,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.items;
        this.total = res.data.pagination.total;
      });
    },
    // 清空事件
    clear() {
      this.formInline = {};
      this.getList();
    },
    // 开启状态
    show_status(items) {
      enterpriseStatus({
        id: items.id
      }).then(res => {
        if (res.code === 200) {
          this.getList();
        }
      });
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
          enterpriseRemove({
            id: items.id
          }).then(res => {
            window.console.log(res);
            this.getList();
          });
        })
        .catch(() => {});
    },
    // 传数据去 编辑 组件
    enterpriseEdit(items) {
      this.editFormVisible = true;
      this.$refs.editData.editForm = JSON.parse(JSON.stringify(items)); //深拷贝
    },
    // 分页 页容量 -- 页容量发生变化的时候就会调用
    handleSizeChange(value) {
      this.limit = value;
      this.getList();
    },
    // 分页 - 页码 -- 页码发生变化的时候就会调用
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
.enterprise {
  .enterprise-from {
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
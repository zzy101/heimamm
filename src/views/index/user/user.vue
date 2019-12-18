<template>
  <div class="user">
    <el-card class="box-card user-from">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- 用户名称 -->
        <el-form-item class="width100" label="用户名称">
          <el-input v-model="formInline.number"></el-input>
        </el-form-item>
        <!-- 用户邮箱 -->
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <!-- 状态框 -->
        <el-form-item label="角色">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="0" value="user"></el-option>
            <el-option label="1" value="VIP"></el-option>
          </el-select>
        </el-form-item>
        <!-- 搜索按钮 -->
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <!-- 清除按钮 -->
        <el-form-item>
          <el-button>删除</el-button>
        </el-form-item>
        <!-- 新增按钮 -->
        <el-form-item>
          <el-button type="primary" class="el-icon-plus">新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card user-table">
      <!-- 表格数据主体 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        :default-sort="{prop: 'id', order: 'descending'}"
      >
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户号"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="create_time" label="操作"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        hide-on-single-page
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { userList } from "../../../API/user.js";
export default {
  data() {
    return {
      // 表单数据
      formInline: {
        number: "", //学科编号
        user: "" //学科名称
      },
      // 表格数据
      tableData: [],
      // currentPage4: 1, //默认分页为1
      total: 0, //总条数
      limit: 3, //每页 有多少行
      page: 1, //当前页码
      reverse : false,
    };
  },
  methods: {
    getList() {
      userList({
        limit: this.limit,
        page: this.page
      }).then(res => {
        // window.console.log(res);
        this.tableData = (res.data.data.items).reverse();
        // this.tableData.reverse(); //反转数组
        window.console.log(this.tableData)
        this.total = res.data.data.pagination.total; //总页数
      });
    },
    handleSizeChange(limit) {
      this.limit = limit; //每页 有多少行
      this.page = 1; //当前页面
      this.getList();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getList();
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less">
.user {
  // 用户表单
  .user-from {
    margin-bottom: 19px;
    .width100 .el-form-item__content {
      width: 100px;
    }
  }
  // 分页
  .el-pagination {
    text-align: center;
    margin-top: 31px;
  }
}
</style>
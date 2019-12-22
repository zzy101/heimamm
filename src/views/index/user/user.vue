<template>
  <div class="user">
    <!-- 表单数据 -->
    <el-card class="box-card user-from">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- 用户名称 -->
        <el-form-item class="width100" label="用户名称">
          <el-input v-model="formInline.user_name"></el-input>
        </el-form-item>
        <!-- 用户邮箱 -->
        <el-form-item label="用户邮箱">
          <el-input v-model="formInline.email"></el-input>
        </el-form-item>
        <!-- 状态框 -->
        <el-form-item label="角色">
          <el-select v-model="formInline.role_id" placeholder="请选择状态">
            <el-option label="管理员" value="2"></el-option>
            <el-option label="老师" value="3"></el-option>
            <el-option label="学生" value="4"></el-option>
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
    <!-- 表格数据 -->
    <el-card class="box-card user-table">
      <!-- 表格数据主体 -->
      <el-table :data="tableData" style="width: 100%" border>
        <!-- <el-table-column prop="id" label="序号"></el-table-column> -->
        <el-table-column class="add-index" type="index" label="序号"></el-table-column>
        <el-table-column prop="username" label="用户号"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色">
          <template slot-scope="scope">
            <span v-if="scope.row.role_id == 2">管理员</span>
            <span v-else-if="scope.row.role_id == 3">老师</span>
            <span v-else>学生</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="status" label="状态">
          <!-- 插槽 -->
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1">启用</span>
            <span style="color : red" v-else>禁用</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="editUser(scope.row)" type="text">编辑</el-button>
            <el-button
              type="text"
              @click="show_status(scope.row)"
            >{{scope.row.status == 1?'禁用':'启用'}}</el-button>
            <el-button @click="removeUser(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
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
    <!-- 新增列表 -->
    <addUser ref="addUser"></addUser>
    <editUser ref="editUser"></editUser>
  </div>
</template>

<script>
// 导入 api 抽取层
import { userList, userremove,userstatus } from "../../../API/user.js";

// 导入 子组件 新增列表
import addUser from "./components/addUser.vue"; // 新增组件
import editUser from "./components/editUser.vue"; // 新增组件
export default {
  components: {
    addUser,
    editUser
  },
  data() {
    return {
      // 表单数据
      formInline: {
        user_name: "", //学科编号
        email: "",
        role_id: ""
      },
      // 新增框是否显示
      addFormVisible: false,
      //编辑表格是否显示
      editFormVisible: false,
      // 表格数据
      tableData: [],
      // currentPage4: 1, //默认分页为1
      total: 0, //总条数
      limit: 3, //每页 有多少行
      page: 1, //当前页码
      reverse: false
    };
  },
  methods: {
    // 获取用户列表
    getList() {
      userList({
        limit: this.limit,
        page: this.page,
        ...this.formInline
      }).then(res => {
        // window.console.log(res);
        this.tableData = res.data.items; //用户列表的数据 赋值给 表格数据
        // window.console.log(this.tableData);
        this.total = res.data.pagination.total; //总页数
      });
    },
    // 清空搜索框
    clear() {
      this.formInline = {};
      this.getList();
    },
    // 删除用户
    removeUser(items) {
      this.$confirm("确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          userremove({
            id: items.id
          }).then(res => {
            if (res.code === 200) {
              this.$message.success("删除成功");
              this.getList();
            } else {
              this.$message.error("删除失败");
            }
          });
        })
        .catch(() => {});
    },
    // 编辑用户
    editUser(items) {
      this.editFormVisible = true;
      this.$refs.editUser.editForm = JSON.parse(JSON.stringify(items));
    },
    // 开启状态
    show_status(items) {
      userstatus({
        id : items.id
      }).then(res=>{
        if(res.code === 200) {
          this.getList()
        }
      })
      // this.getList()
    },
    // 点击每页显示
    handleSizeChange(limit) {
      this.limit = limit; //每页 有多少行
      this.page = 1; //当前页面
      this.getList();
    },
    // 点击页码触发的钩子
    handleCurrentChange(page) {
      this.page = page;
      this.getList();
    }
  },
  created() {
    this.getList();
    // window.console.log(this.formInline.number);
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
  // 表格样式
  .el-card__body .el-table {
    text-align: center;
    .el-table_1_column_1 .cell {
      width: 50px;
    }
  }
  // 分页
  .el-pagination {
    text-align: center;
    margin-top: 31px;
  }
  /* 注册表单 */
  .userAdd .el-dialog {
    width: 603px;
    /* 标题 */
    .el-dialog__header {
      text-align: center;
      background: linear-gradient(to right, #01c5fa, #1395fa);
      padding: 15px;

      /* 关闭右边的叉叉 */
      .el-dialog__close {
        display: none;
      }

      /* 标题颜色 */
      .el-dialog__title {
        color: white;
      }
    }
  }
}
</style>
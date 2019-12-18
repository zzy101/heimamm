<template>
  <el-container>
    <el-header class="index-header">
      <div class="header-left">
        <i @click="isCollapse = !isCollapse" class="el-icon-s-operation"></i>
        <img src="../../assets/login-log.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="header-right">
        <img :src="$store.state.userInfo.avatar" alt />
        <span class="username">
          <i>{{$store.state.userInfo.username}}</i>,你好
        </span>
        <el-button @click="loginOut" type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左边导航栏 -->
      <el-aside width="auto">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          router
        >
          <!-- 数据概览 -->
          <el-menu-item index="/index">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <!-- 用户列表 -->
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <!-- 题库列表 -->
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <!-- 企业列表 -->
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <!-- 学科列表 -->
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右边主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入token的抽取层
// import { getToken } from "../../utils/token";
import { removerToken } from "../../utils/token";

// 导入首页的API抽取层
// import {userInfo} from '../../API/index.js'
// 导入路由
// import router from '../../router/router.js'

export default {
  data() {
    return {
      isCollapse: false //列表 滑入(滑出)
    };
  },
  methods: {
    loginOut() {
      this.$confirm("确定要退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          this.$router.push('/login'); //退出回到登录页
          removerToken(); //删除tooken
        }).catch(()=>{
          
        })
    }
  },
  beforeCreate() {
    // 检查是否存在token
    // if(!localStorage.getItem('token')){
    //   this.$router.push('/login')
    //   this.$message.error('没有权限')
    // }
    // if (getToken()) {
    //   this.$router.push("/login");
    //   this.$message.error("没有权限");      //设置导航守卫
    // }
  },
  created() {
    // userInfo().then(res=>{
    //   window.console.log(res)
    // })
    // window.console.log(this.$store.state.userInfo)   //查看接收 store 的值
    // window.console.log(this.$route.path)
  }
};
</script>

<style lang="less">
// 首页头部
.index-header {
  // background-color: red;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // 头部左边
  .header-left {
    display: flex;
    align-content: center;
    i {
      font-size: 24px;
      margin-right: 22px;
    }
    img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    span {
      font-size: 22px;
      color: #49a1ff;
    }
  }
  // 头部右边
  .header-right {
    display: flex;
    align-content: center;
    img {
      border-radius: 50%;
      width: 43px;
      margin-right: 9px;
    }
    .username {
      font-size: 14px;
      margin-right: 38px;
      display: flex;
      align-items: center;
      i {
        font-style: normal;
      }
    }
  }
}
// 首页导航栏
.el-aside {
  text-align: center;
  // 首页左边
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
// 首页主体
.el-main {
  background-color:#E8E9EC;
}
</style>
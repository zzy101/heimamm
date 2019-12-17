<template>
  <el-container>
    <el-header class="index-header">
      <div class="header-left">
        <i @click="isCollapse = !isCollapse" class="el-icon-s-operation"></i>
        <img src="../../assets/login-log.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="header-right">
        <img src="../../assets/login-log.png" alt />
        <span class="username">
          <i>李达</i>,你好
        </span>
        <el-button type="primary">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 左边导航栏 -->
      <el-aside width="auto">
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" router>
          <!-- 数据概览 -->
          <el-menu-item index="/index/chart">
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
export default {
  data() {
    return {
      isCollapse: false
    };
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
  // 首页左边
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
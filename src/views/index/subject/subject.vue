<template>
  <div class="subject">
    <el-card class="box-card subject-from">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <!-- 学科编号 -->
        <el-form-item class="width100" label="学科编号">
          <el-input v-model="formInline.number"></el-input>
        </el-form-item>
        <!-- 学科名称 -->
        <el-form-item label="学科名称">
          <el-input v-model="formInline.subject"></el-input>
        </el-form-item>
        <!-- 创建者 -->
        <el-form-item class="width100" label="创建者">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <!-- 状态框 -->
        <el-form-item label="状态">
          <el-select v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
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
    <el-card class="box-card subject-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="serial" label="序号"></el-table-column>
        <el-table-column prop="number" label="学科编号"></el-table-column>
        <el-table-column prop="subject" label="学科名称"></el-table-column>
        <el-table-column prop="short" label="简称"></el-table-column>
        <el-table-column prop="name" label="创建者"></el-table-column>
        <el-table-column prop="date" label="创建日期"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="operation" label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      // 表单数据
      formInline: {
        number: "", //学科编号
        subject: "", //学科名称
        name: "" //创建者
      },
      // 表格数据
      tableData: [
        {
          serial: "", //序号
          number: "", //学科编号
          subject: "", //学科名称
          short: "", //简称
          name: "", //创建者
          date: "", //创建日期
          status: "", //状态
          operation: "" //操作
        }
      ]
    };
  },
  methods: {},
  created() {
    
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
}
</style>
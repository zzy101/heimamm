<template>
  <div class="chart">
    <el-card class="title-card">
      <ul>
        <li>
          <i class="red">1</i>
          <span>2</span>
        </li>
        <li>
          <i class="red">1</i>
          <span>2</span>
        </li>
        <li>
          <i class="blue">1</i>
          <span>2</span>
        </li>
        <li>
          <i class="blue">1</i>
          <span>2</span>
        </li>
        <li>
          <i class="green">1</i>
          <span>2</span>
        </li>
        <li>
          <i class="green">1</i>
          <span>2</span>
        </li>
      </ul>
    </el-card>
    <el-card>
      <span>整体数据</span>
      <div class="main-card" ref="mainCard">
    </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.mainCard);

    // 指定图表的配置项和数据
    var option= {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["直接访问", "邮件营销", "联盟广告"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" }
            ]
          }
        ]
      }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>

<style lang='less'>
.title-card {
  margin-bottom: 30px;
  ul {
    display: flex;
    justify-content: space-around;
    text-align: center;
    li {
      list-style: none;
      i {
        display: block;
        width: 100px;
        height: 100px;
        border: 1px solid #000;
        border-radius: 50%;
        line-height: 100px;
        margin-bottom: 10px;
      }
      .red {
        border: 2px solid red;
      }
      .blue {
        border: 2px solid blue;
      }
      .green {
        border: 2px solid green;
      }
    }
  }
}
.main-card {
  height: 571px;
}
</style>
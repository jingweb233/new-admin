<template>
  <div class="data-view">
    <el-card>
      <div class="main1" ref="main1"></div>
    </el-card>
    <el-card>
      <div class="main2" ref="main2"></div>
    </el-card>
  </div>
</template>

<script>
import { dataView } from "@/api/api";
export default {
  data() {
    return {};
  },
  created() {
    dataView().then(res=>{
        if (res.data.status === 200) {
            let{legend,xAxis,series} = res.data.data
            this.draw(legend,xAxis,series)
        }
    }).catch(err=>{
        console.error(err);
    })
  },
  mounted() {
    let myChart = this.$echarts.init(this.$refs.main1);
    myChart.setOption({
      title: {
        text: "班级",
      },
      xAxis: {
        type: "category",
        data: ["一班", "二班", "三班", "四班", "五班"],
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "人数",
          type: "bar",
          data: [23, 24, 18, 25, 27],
        },
      ],
    });
  },
  methods: {
    draw(legend, xAxis, series) {
      let myChart1 = this.$echarts.init(this.$refs.main2);
      let option = {
        title: {
          text: "会话量",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: legend,
        },
        xAxis: {
          type: "category",
          data: xAxis,
        },
        yAxis: {
          type: "value",
        },
        series: series,
      };
      myChart1.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.data-view {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 50%;
    .main1,
    .main2 {
      height: 500px;
    }
  }
}
</style>
<template>
  <div ref="echart">

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name:'EChart',
  props:{
    // 区分他是折线，柱状图还是饼状图
    isAxisChart:{
      type:Boolean,
      default:true,
      
    },
    // 接收传递进来的option
    chartData:{
      type:Object,
      default(){
        return {
          xData:[],
          series:[]
        }
      }//保证容错性
    }
  },
  watch:{
      //监听数据改变，echart表格重新绘制
      chartData:{
        handler:function(){
          this.initChart()
        },
        deep:true
      }
  },
  methods:{
    initChart(){
      this.initChartData()
      if (this.echart) {
        this.echart.setOption(this.options)
      }else{
        this.echart=echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    }, 
    initChartData(){
      if (this.isAxisChart) {
        this.axisOption.xAxis.data=this.chartData.xData;
        this.axisOption.series=this.chartData.series
      }else{
        this.normalOption.series=this.charData.series
      }
    }

  },
  data(){
    return {
       //折线/柱状图的options
      axisOption:{
          legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
        series: [],
          },
      //饼状图
      normalOption:{
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
    //观察echart数据有没有渲染
    echart:null
    }
   
  },
  computed:{
    //判断isAxisChart属性
    options(){
      return this.isAxisChart? this.axisOption:this.normalOption
    }
  }
}
</script>

<style>

</style>
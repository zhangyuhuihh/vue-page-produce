<template>
  <div class="line_chart_child_one_container" ref="mychart"></div>
</template>

<script>
import echarts from 'echarts'
import componentsMixins from '../../components_mixins'

export default {
  name: 'LineChartChildOne',
  mixins: [componentsMixins],
  props: {
    dragSize: {
      type: Object
    }
  },
  data() {
    return {
      myChart: null,
      option: {
        backgroundColor: '#333333',
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {} // 待配置
        },
        yAxis: {
          type: 'value',
          axisLabel: {}
        },
        series: [
          {
            data: [],
            type: 'line',
            lineStyle: {},
            itemStyle: {}
          }
        ]
      }
    }
  },
  watch: {
    dragSize: {
      // todo 防抖和节流
      handler() {
        this.$nextTick(() => {
          this.myChart.resize()
        })
      },
      deep: true
    },
    styleFields: {
      handler(newValue, oldValue) {
        this.option.series[0].lineStyle.color = newValue.lineColor.formModel
        this.option.series[0].lineStyle.width = newValue.lineWidth.formModel
        this.option.series[0].itemStyle.color = newValue.itemColor.formModel
        this.option.xAxis.axisLabel.fontSize =
          newValue.axisLabelFontSize.formModel
        this.option.yAxis.axisLabel.fontSize =
          newValue.axisLabelFontSize.formModel
        this.option.backgroundColor = newValue.backgroundColor.formModel
        this.refreshChart()
      },
      immediate: true,
      deep: true
    },
    fields: {
      handler(newValue, oldValue) {
        let fakeData = JSON.parse(newValue.fakeData.formModel)
        this.option.xAxis.data = fakeData.map(v => v.xAxis)
        this.option.series[0].data = fakeData.map(v => v.yAxis)
        this.refreshChart()
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart()
    })
  },
  methods: {
    // 创建实例并生成表格
    initEchart() {
      this.myChart = echarts.init(this.$refs.mychart, 'dark') // 创建实例
      this.myChart.clear()
      this.myChart.setOption(this.option) // 生成图表
    },
    refreshChart() {
      if (this.myChart) {
        this.myChart.setOption(this.option)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.line_chart_child_one_container {
  width: 100%;
  height: 100%;
}
</style>

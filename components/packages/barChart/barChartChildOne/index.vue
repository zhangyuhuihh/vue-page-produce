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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisLabel: {}
        },
        yAxis: {
          type: 'value',
          axisLabel: {}
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
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
        this.option.series[0].itemStyle.color =
          newValue.seriesItemColor.formModel
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
        let fakeData = JSON.parse(newValue.isFakeData.formModel.fakeData)
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
      this.setEchart()
    })
  },
  methods: {
    // 创建实例并生成表格
    setEchart() {
      this.myChart = echarts.init(this.$refs.mychart, 'dark') // 创建实例
      this.myChart.clear()
      this.myChart.setOption(this.option) // 生成图表
    },
    refreshChart() {
      if (this.myChart) {
        this.myChart.setOption(this.option)
      }
    }
  },
  destroyed() {}
}
</script>

<style lang='scss' scoped>
.line_chart_child_one_container {
  width: 100%;
  height: 100%;
}
</style>

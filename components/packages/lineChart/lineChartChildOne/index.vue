<template>
  <div class="line_chart_child_one_container" ref="mychart"></div>
</template>

<script>
import echarts from 'echarts'
import componentsMixins from '../../components_mixins'
import _ from 'lodash'
export default {
  name: 'LineChartChildOne',
  mixins: [componentsMixins],
  props: {
    dragSize: {
      type: Object,
    },
  },
  data() {
    return {
      myChart: null,
      option: {
        grid: {
          left: '',
          right: '',
          bottom: '',
          top: '',
          containLabel: true,
        },
        backgroundColor: '#333333',
        xAxis: {
          type: 'category',
          data: [],
          axisLabel: {}, // 待配置
        },
        yAxis: {
          type: 'value',
          axisLabel: {},
        },
        series: [
          {
            data: [],
            type: 'line',
            lineStyle: {},
            itemStyle: {},
            smooth: '',
          },
        ],
      },
    }
  },
  computed: {
    distanceAll() {
      return {
        left: this.styleFields.distanceLeft.formModel + '%',
        right: this.styleFields.distanceRight.formModel + '%',
        top: this.styleFields.distanceTop.formModel + '%',
        bottom: this.styleFields.distanceBottom.formModel + '%',
      }
    },
    lineStyleAll() {
      return {
        color: this.styleFields.lineColor.formModel,
        width: this.styleFields.lineWidth.formModel,
        smooth: this.styleFields.smooth.formModel,
        itemColor: this.styleFields.itemColor.formModel,
        type: this.styleFields.lineType.formModel,
      }
    },
    pointAll() {
      return {
        symbol: this.styleFields.pointShape.formModel,
        symbolSize: this.styleFields.pointSize.formModel,
      }
    },
  },
  watch: {
    dragSize: {
      // todo 防抖和节流
      handler() {
        this.$nextTick(() => {
          this.myChart.resize()
        })
      },
      deep: true,
    },
    distanceAll: {
      handler(newValue, oldValue) {
        this.option.grid = { ...this.option.grid, ...newValue }
        this.refreshChart()
      },
      immediate: true,
      deep: true,
    },
    lineStyleAll: {
      handler(newValue, oldValue) {
        this.option.series[0].lineStyle = {
          ...this.option.series[0].lineStyle,
          ..._.omit(newValue, ['smooth', 'itemColor']),
        }
        this.option.series[0].itemStyle = {
          ...this.option.series[0].itemStyle,
          color: newValue.itemColor,
        }
        this.option.series[0].smooth = newValue.smooth
        this.refreshChart()
      },
      immediate: true,
      deep: true,
    },
    pointAll: {
      handler(newValue, oldValue) {
        this.option.series[0].symbol = newValue.symbol
        this.option.series[0].symbolSize = newValue.symbolSize
        this.refreshChart()
      },
      immediate: true,
      deep: true,
    },
    styleFields: {
      handler(newValue, oldValue) {
        // this.option.series[0].lineStyle.color = newValue.lineColor.formModel
        // this.option.series[0].lineStyle.width = newValue.lineWidth.formModel
        // this.option.series[0].itemStyle.color = newValue.itemColor.formModel
        // this.option.xAxis.axisLabel.fontSize =
        //   newValue.axisLabelFontSize.formModel
        // this.option.yAxis.axisLabel.fontSize =
        //   newValue.axisLabelFontSize.formModel
        // this.option.backgroundColor = newValue.backgroundColor.formModel
        // this.refreshChart()
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart()
    })
  },
  methods: {
    reactToFieldsChange(newData) {
      if (newData) {
        let valueToShow = JSON.parse(newData)
        this.option.xAxis.data = valueToShow.map((v) => v.xAxis)
        this.option.series[0].data = valueToShow.map((v) => v.yAxis)
        this.refreshChart()
      }
    },
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
    },
  },
}
</script>

<style lang="scss" scoped>
.line_chart_child_one_container {
  width: 100%;
  height: 100%;
}
</style>

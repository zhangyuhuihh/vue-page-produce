<template>
  <div class="line_chart_child_one_container" ref="mychart"></div>
</template>

<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'LineChartChildOne',
  props: {
    uuid: {
      type: String,
      required: true
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
  computed: {
    ...mapState('partComponent', ['widgetList']),
    currentWidget() {
      return this.widgetList.find(v => v.uuid === this.uuid)
    },
    needToRefreshProperty() {
      return _.pick(this.currentWidget, ['styleFields', 'fields'])
    }
  },
  watch: {
    'currentWidget.dragSize': {
      // todo 防抖和节流
      handler() {
        this.myChart.resize()
      },
      deep: true
    },
    needToRefreshProperty: {
      handler(newValue, oldValue) {
        console.log('newValue: ', newValue)
        let fakeData = JSON.parse(newValue.fields.isFakeData.formModel.fakeData)
        this.option.xAxis.data = fakeData.map(v => v.xAxis)
        this.option.series[0].data = fakeData.map(v => v.yAxis)
        // this.option.series[0].lineStyle.color =
        //   newValue.styleFields.lineColor.formModel
        // this.option.series[0].lineStyle.width =
        //   newValue.styleFields.lineWidth.formModel
        this.option.series[0].itemStyle.color =
          newValue.styleFields.seriesItemColor.formModel
        this.option.xAxis.axisLabel.fontSize =
          newValue.styleFields.axisLabelFontSize.formModel
        this.option.yAxis.axisLabel.fontSize =
          newValue.styleFields.axisLabelFontSize.formModel
        this.option.backgroundColor =
          newValue.styleFields.backgroundColor.formModel
        this.myChart.setOption(this.option)
        // this.setEchart()
      },
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

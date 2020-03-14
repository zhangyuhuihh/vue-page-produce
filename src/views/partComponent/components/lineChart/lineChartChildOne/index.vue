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
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
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
        let fakeData = JSON.parse(newValue.fields.isFakeData.formModel.fakeData)
        this.option.xAxis.data = fakeData.map(v => v.xAxis)
        this.option.series[0].data = fakeData.map(v => v.yAxis)
        this.myChart.setOption(this.option)
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

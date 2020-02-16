<template>
  <div>
    <div :id="`echarts${uuid}`" class="echartsStyle" :style="`color:${lineChartColor}`"></div>
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import { mapState } from 'vuex'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
export default {
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState('partComponent', ['widgetList']),
    currentWidget() {
      return this.widgetList.find(v => v.uuid === this.uuid)
    },
    currentWidgetStyleFields() {
      return this.currentWidget.styleFields
    },
    lineChartColor: {
      get: function () {
        console.log(this.currentWidget.styleFields)
        // this.drawLine()
        return this.currentWidget.styleFields.color.formModel
      },
      set: function (v) {
        console.log('lineChartColor:', v)
      }
    },
    currentWidgetFields() {
      return this.currentWidget.fields
    },
    fakeData() {
      return JSON.parse(this.currentWidgetFields.isFakeData.formModel.fakeData)
    },
    dataType() {
      return this.fakeData.dataType
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      let dom = document.getElementById('echarts' + this.uuid)
      let myChart = echarts.init(dom)
      myChart.setOption({
        title: { text: 'echarts' },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['每日新增用户数量", "每日用户数量总计'],
          textStyle: {
            color: '#9e9fa4',
            fontSize: 16
          }
        },
        grid: {
          containLabel: true
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '每日用户数量总计',
            type: 'line',
            itemStyle: {
              normal: {
                color: `${this.currentWidgetStyleFields.color.formModel}`
              }
            },
            yAxisIndex: 0,
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .echartsStyle {
        width: 400px;
        height: 400px;
    }
</style>

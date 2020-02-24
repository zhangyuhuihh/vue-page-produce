<template>
  <div>
    <div
      fontSize: currentWidgetStyleFields.fontSize.formModel
      class="echartsContainer"
      :id="`echarts${uuid}`"
     >
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
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
  watch: {
    fakeData: {
      handler(newVal, oldVal) {
        this.initEcharts()
      },
      deep: true
    },
    currentWidgetStyleFields: {
      handler(newVal, oldVal) {
        this.initEcharts()
      },
      deep: true
    }
  },
  methods: {
    drawLine() {
      echarts.init(document.getElementById('echarts' + this.uuid)).setOption({
        title: { text: this.fakeData.titleName },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['每月新增用户数量', '每月用户数量总计'],
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
                color: this.currentWidgetStyleFields.color.formModel
              }
            },
            yAxisIndex: 0,
            data: this.fakeData.data
          }
        ]
      })
    },
    initEcharts() {
      echarts.init(document.getElementById('echarts' + this.uuid)).setOption({
        title: { text: this.fakeData.titleName },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['每月新增用户数量', '每月用户数量总计'],
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
                color: this.currentWidgetStyleFields.color.formModel
              }
            },
            yAxisIndex: 0,
            data: this.fakeData.data
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.echartsContainer {
  width: 500px;
  height: 500px;
}
</style>

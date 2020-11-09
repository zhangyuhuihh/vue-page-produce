<template>
  <div class="pie_chart_child_one_container" ref="mychart"></div>
</template>

<script>
import echarts from 'echarts'
import componentsMixins from '../../components_mixins'

export default {
  name: 'PieChartChildOne',
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
        backgroundColor: '#2c343c',

        // title: {
        //   text: 'Customized Pie',
        //   left: 'center',
        //   top: 20,
        //   textStyle: {
        //     color: '#ccc'
        //   }
        // },

        // tooltip: {
        //   trigger: 'item',
        //   formatter: '{a} <br/>{b} : {c} ({d}%)'
        // },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
              { value: 400, name: '搜索引擎' },
            ].sort(function(a, b) {
              return a.value - b.value
            }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)',
              },
              smooth: 0.2,
              length: 10,
              length2: 20,
            },
            itemStyle: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function(idx) {
              return Math.random() * 200
            },
          },
        ],
      },
    }
  },
  computed: {},
  watch: {
    dragSize: {
      // todo 防抖和节流
      handler() {
        console.log('123123')
        this.$nextTick(() => {
          this.myChart.resize()
        })
      },
      deep: true,
    },
    styleFields: {
      handler(newValue, oldValue) {
        this.option.series[0].radius = `${newValue.seriesRadius.formModel}%`
        this.option.series[0].itemStyle.color =
          newValue.seriesItemStyle.formModel
        this.refreshChart()
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setEchart()
    })
  },
  methods: {
    reactToFieldsChange(newData) {
      if (newData) {
        let valueToShow = JSON.parse(newData)
        this.option.series[0].data = valueToShow.sort(
          (a, b) => a.value - b.value
        )
        this.refreshChart()
      }
    },
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
    },
  },
}
</script>

<style lang="scss" scoped>
.pie_chart_child_one_container {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div
    :id="`echarts${uuid}`" class="testComponent_one" style="width:100%;height:100%;"
  >
  {{fakeData}}
  {{chartTitle}}
  {{chartLegend}}
   <!-- :style="`width:100%;height:100%;color:${histogramColor}`" -->
    <!-- <span>哈哈</span>
    <span>年龄:{{fakeData.age}}</span>
    <span>兄弟:</span> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import echarts from 'echarts'
export default {
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // histogramColor: black,
      // histogramColor：black
    }
  },
  mounted() {
    // this.setColor()
    // console.log('1111')
    var dom = document.getElementById('echarts'+this.uuid)
      var myChart = echarts.init(dom);
      // console.log('dom柱状图', myChart)
      var option = {
        title: {
            text: this.chartTitle
        },
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        // tooltip: {},
        legend: {
            data:this.chartLegend,
            // data: ['销量']
        },
        xAxis: {
            data:this.chartXAxis
        },
        yAxis: {},
        series: [{
            name: this.chartLegend[0],
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: {
              // color: 'rgba(0,0,0,0.05)'
              color: `${this.currentWidgetStyleFields.color.formModel}`

            },
        }]
      };

      myChart.setOption(option);
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
      console.log('fields', this.currentWidget.fields)
      return this.currentWidget.fields
    },
    fakeData() {
      console.log('假数据', JSON.parse(this.currentWidgetFields.isFakeData.formModel.fakeData))
      return JSON.parse(this.currentWidgetFields.isFakeData.formModel.fakeData)
    },
    chartTitle() {
      console.log('标题：', this.currentWidgetFields.title.formModel)
      // mychart.setOption(option,true)
      return this.currentWidgetFields.title.formModel
    },
    chartLegend() {
      let arr=JSON.parse(this.currentWidgetFields.isFakeData.formModel.fakeData)
      let legend=[]
      arr.map(item=>{
        legend.push(item.legend)
      })
      // arrLegend.push(this.currentWidgetFields.legend.formModel)
      console.log('legend：', legend)
      return legend
    },
    chartXAxis() {
      let arr=JSON.parse(this.currentWidgetFields.isFakeData.formModel.fakeData)
      let xAxis=[]
      arr[0].detail.map(item=>{
        xAxis.push(item.key)
      })
      // arrLegend.push(this.currentWidgetFields.legend.formModel)
      console.log('legend：', xAxis)
      return xAxis
    },

    dataType() {
      return this.fakeData.dataType
    },
    histogramColor: {
      get:function() {
        this.setColor()
        console.log('get:histogramColor:',this.currentWidget.styleFields.color.formModel)
        return this.currentWidget.styleFields.color.formModel
      },
      set:function(v) {
        console.log('set:histogramColor:', v)
      }
    },
    // histogramWidth: {
    //   // get:function() {
    //   //   // this.setColor()
    //   //   console.log('get:histogramWidth:',this.currentWidget.styleFields)
    //   //   return this.currentWidget.styleFields.color.formModel
    //   // },
    //   // set:function(v) {
    //   //   console.log('set:histogramWidth:', v)
    //   // }
    // }
  },
  methods:{
    setColor() {
      let dom = document.getElementById('echarts'+this.uuid)
      console.log('dom', dom)
      let myChart = echarts.init(dom);
      let option = {
        title: {
            text: 'ECharts 入门示例'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: {
              // color: 'rgba(0,0,0,0.05)'
              color: `${this.currentWidgetStyleFields.color.formModel}`

            },
        }]
      };
      myChart.setOption(option);
    }
  }
}
</script>

<style>
.testComponent_one {
  width: 100%;
  height: 100%;
}
</style>

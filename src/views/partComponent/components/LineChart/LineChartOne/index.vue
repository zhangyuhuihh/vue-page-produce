<template>
  <div>
    <div
      class="echartsContainer"
      :id="`echarts${uuid}`"
      :style="`color:${lineChartColor}; width: 100%; height: 100%`">
    </div>
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
    ...mapState('partComponent', ['widgetList', 'widthAndHeight']),
    currentWidget() {
      return this.widgetList.find(v => v.uuid === this.uuid)
    },
    currentWidgetStyleFields() {
      return this.currentWidget.styleFields
    },
    lineChartColor: {
      get: function () {
        // this.drawLine()
        return this.currentWidget.styleFields.color.formModel
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
    this.drawLine(this.fakeData)
  },
  methods: {
    drawLine(fakeData) {
      echarts.init(document.getElementById('echarts' + this.uuid)).setOption(fakeData)
    }
  }
}
</script>

<style lang="scss" scoped>
.echartsContainer {
  width: 500px;
  height: 400px;
}
</style>

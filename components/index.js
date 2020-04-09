import * as widgetParent from './packages/widget.js'
import * as widgetChild from './packages/components/all_class'
import TitleChildOne from './packages/title/TitleChildOne/index.vue'
import BarChartChildOne from './packages/barChart/barChartChildOne/index.vue'
import LineChartChildOne from './packages/lineChart/lineChartChildOne/index.vue'
import PieChartChildOne from './packages/pieChart/pieChartChildOne/index.vue'
import ScrollBoardChildOne from './packages/scrollBoard/ScrollBoardChildOne/index.vue'

const components = [
  TitleChildOne,
  BarChartChildOne,
  LineChartChildOne,
  PieChartChildOne,
  ScrollBoardChildOne
]

const install = function(Vue) {
  if (install.installed) return
  install.installed = true
  components.map((component) => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
  window.WIDGRTLISTCLASS = {
    widgetParent,
    widgetChild
  }
}

export default {
  install,
  ...components
}

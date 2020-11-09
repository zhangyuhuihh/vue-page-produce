import { BarChart } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
// import widgetCombineFields from '../../widget_combine_fields'
import widgeCustomizedFields from '../../widget_customized_fields'
// import validators from '../../validators'
import jsonTemplate from '../../json_template'
import { tabsTypes } from '../../configs/tabsTypes'

const interactTypes = {
  belongsTabs: {
    init() {
      return {
        belongsTab: tabsTypes.overall,
      }
    },
  },
}

const setInteractive = (type, obj) => {
  for (let key in obj) {
    obj[key].interactDescription = interactTypes[type].init()
  }
  return obj
}

class BarChartChildOne extends BarChart {
  static componentDescription = {
    name: '柱状图一',
    parent: 'BarChart',
    img: 'BarChartChildOne_icon.png',
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'barChartChildOne'

    this.setStyleFields({
      ...setInteractive('belongsTabs', {
        seriesItemColor: widgetFields.FieldColorPicker({
          label: '柱体颜色',
          formModel: '#dd6b66',
          belongsTab: tabsTypes.overall,
          // interactDescription: {
          //   type: 'belongTabs',
          //   indexKey: 'first',
          //   position: 'top',
          // },
        }),
        backgroundColor: widgetFields.FieldColorPicker({
          label: '背景',
          formModel: '#333333',
          belongsTab: tabsTypes.overall,
        }),
        axisLabelFontSize: widgetFields.FieldSlider({
          label: '文字大小',
          formModel: 12,
          min: 12,
          max: 20,
          belongsTab: tabsTypes.overall,
        }),
      }),
    })

    this.setFields({
      dataSource: widgeCustomizedFields.dataSource({
        fakeData: JSON.stringify(jsonTemplate.ForBarChartChildOne),
      }),

      // 组合型组件的demo
      // dataSource: widgetCombineFields.RadioInput({
      //   label: '数据源',
      //   formModel: {
      //     type: 'fakeData',
      //     value: JSON.stringify(jsonTemplate.ForBarChartChildOne),
      //   },
      //   selections: [
      //     {
      //       label: '模拟数据',
      //       value: 'fakeData',
      //       inputLabel: '',
      //       inputType: 'textarea',
      //       formateFn: 'textareaFormate',
      //     },
      //     {
      //       label: '接口数据',
      //       value: 'realData',
      //       inputType: '',
      //       inputLabel: '链接',
      //     },
      //   ],
      //   memorable: false,
      // }),
      // fakeData: widgetFields.FieldTextArea({
      //   formModel: JSON.stringify(jsonTemplate.ForBarChartChildOne),
      //   formateFn: 'textareaFormate',
      // }),
      // realData: widgetFields.FieldInput({
      //   label: '链接',
      // }),
    })
  }
}

export { BarChartChildOne }

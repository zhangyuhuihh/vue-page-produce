import { BarChart } from '../../widget'
import widgetFields from '../../widget_fields'
// import validators from '../../validators'
import jsonTemplate from '../../json_template'
import { tabsTypes } from '../../configs/tabsTypes'

class BarChartChildOne extends BarChart {
  static componentDescription = {
    name: '柱状图一',
    parent: 'BarChart',
    img: 'BarChartChildOne_icon.png'
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'barChartChildOne'

    this.setStyleFields({
      seriesItemColor: widgetFields.FieldColorPicker({
        label: '柱体颜色',
        formModel: '#dd6b66',
        belongsTab: tabsTypes.overall
      }),

      backgroundColor: widgetFields.FieldColorPicker({
        label: '背景',
        formModel: '#333333',
        belongsTab: tabsTypes.overall
      }),
      axisLabelFontSize: widgetFields.FieldSlider({
        label: '文字大小',
        formModel: 12,
        min: 12,
        max: 20,
        belongsTab: tabsTypes.overall
      })
    })

    this.setFields({
      isFakeData: widgetFields.FieldRadio({
        label: '数据源',
        formModel: '0',
        radios: [
          {
            label: '模拟数据',
            value: '0'
          },
          {
            label: '接口数据',
            value: '1'
          }
        ],
        // emitEvents: ['changeDataType']
        emitEvents: [
          {
            type: 'change',
            initValue: '0',
            eventName: 'changeDataType'
          }
        ]
      }),
      fakeData: widgetFields.FieldTextArea({
        formModel: JSON.stringify(jsonTemplate.ForBarChartChildOne),
        formateFn: 'textareaFormate',
        onEvents: [
          {
            type: 'isShow',
            eventValue: '0',
            eventName: 'changeDataType'
          }
        ]
      }),
      realData: widgetFields.FieldInput({
        label: '链接',
        onEvents: [
          {
            type: 'isShow',
            eventValue: '1',
            eventName: 'changeDataType'
          }
        ]
      })
    })
  }
}

export { BarChartChildOne }

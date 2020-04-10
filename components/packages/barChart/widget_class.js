import { BarChart } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
// import validators from '../../validators'
import { formateTextArea } from '../../utils/index'
import jsonTemplate from '../../json_template'

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
        formModel: '#dd6b66'
      }),

      backgroundColor: widgetFields.FieldColorPicker({
        label: '背景',
        formModel: '#333333'
      }),
      axisLabelFontSize: widgetFields.FieldSlider({
        label: '文字大小',
        formModel: 12,
        min: 12,
        max: 20
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
        formateFn: formateTextArea,
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

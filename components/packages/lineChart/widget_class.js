import { LineChart } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
// import validators from '../../validators'
// import validatorCombine from '../../validator_combine'
// import widgetFieldsCombine from '../../widget_fields_combine'
import { formateTextArea } from '../../utils/index'
import jsonTemplate from '../../json_template'

class LineChartChildOne extends LineChart {
  static componentDescription = {
    name: '折线图一',
    parent: 'LineChart',
    img: 'LineChartChildOne_icon.png'
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'lineChartChildOne'

    this.setStyleFields({
      lineColor: widgetFields.FieldColorPicker({
        label: '折线颜色',
        formModel: '#dd6b66',
        memorable: true
      }),
      lineWidth: widgetFields.FieldSlider({
        label: '折线宽度',
        formModel: 2,
        min: 1,
        max: 10
      }),
      itemColor: widgetFields.FieldColorPicker({
        label: '拐点颜色',
        formModel: '#dd6b66'
      }),
      axisLabelFontSize: widgetFields.FieldSlider({
        label: '文字大小',
        formModel: 12,
        min: 12,
        max: 20
      }),
      backgroundColor: widgetFields.FieldColorPicker({
        label: '背景',
        formModel: '#333333'
      })
    })

    // 复合表单怎么处理是个头大的问题啊
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
        formModel: JSON.stringify(jsonTemplate.ForLineChartChildOne),
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
      // isFakeData: widgetFieldsCombine.FieldsDataSource({
      //   validator: [validatorCombine.validateFieldDataSource()],
      //   fakeData: JSON.stringify(jsonTemplate.ForLineChartChildOne),
      //   radios: [
      //     {
      //       label: '使用模拟数据',
      //       value: 'fake'
      //     },
      //     {
      //       label: '使用接口数据',
      //       value: 'real'
      //     }
      //   ]
      // })
    })
  }
}

export { LineChartChildOne }

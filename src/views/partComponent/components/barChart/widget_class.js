import { BarChart } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
// import validators from '../../validators'
import validatorCombine from '../../validator_combine'
import widgetFieldsCombine from '../../widget_fields_combine'
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

    this.setStyleFields(constructorData, {
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

    this.setFields(constructorData, {
      isFakeData: widgetFieldsCombine.FieldsDataSource({
        validator: [validatorCombine.validateFieldDataSource()],
        fakeData: JSON.stringify(jsonTemplate.ForBarChartChildOne),
        radios: [
          {
            label: '使用模拟数据',
            value: 'fake'
          },
          {
            label: '使用接口数据',
            value: 'real'
          }
        ]
      })
    })
  }
}

export { BarChartChildOne }

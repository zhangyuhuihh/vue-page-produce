import { PieChart } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
// import validators from '../../validators'
import validatorCombine from '../../validator_combine'
import widgetFieldsCombine from '../../widget_fields_combine'
import jsonTemplate from '../../json_template'

class PieChartChildOne extends PieChart {
  static componentDescription = {
    name: '饼图一',
    parent: 'PieChart',
    img: 'PieChartChildOne_icon.png'
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'pieChartChildOne'

    this.setStyleFields(constructorData, {
      seriesItemStyle: widgetFields.FieldColorPicker({
        label: '扇面主色',
        formModel: '#c23531'
      }),
      seriesRadius: widgetFields.FieldSlider({
        label: '扇形面大小',
        formModel: 55,
        min: 30,
        max: 100
      })
      // lineWidth: widgetFields.FieldSlider({
      //   label: '折线宽度',
      //   formModel: 2,
      //   min: 1,
      //   max: 10
      // }),
      // itemColor: widgetFields.FieldColorPicker({
      //   label: '拐点颜色',
      //   formModel: '#dd6b66'
      // }),
      // axisLabelFontSize: widgetFields.FieldSlider({
      //   label: '文字大小',
      //   formModel: 12,
      //   min: 12,
      //   max: 20
      // }),
      // backgroundColor: widgetFields.FieldColorPicker({
      //   label: '背景',
      //   formModel: '#333333'
      // })
    })

    this.setFields(constructorData, {
      isFakeData: widgetFieldsCombine.FieldsDataSource({
        validator: [validatorCombine.validateFieldDataSource()],
        fakeData: JSON.stringify(jsonTemplate.ForPieChartChildOne),
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

export { PieChartChildOne }

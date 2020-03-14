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
    this.componentKey = 'ScrollBoardChildOne'

    this.setStyleFields(constructorData, {
      headerBGC: widgetFields.FieldColorPicker({
        label: '表头背景色',
        formModel: '#00BAFF'
      }),
      oddRowBGC: widgetFields.FieldColorPicker({
        label: '奇数行背景色',
        formModel: '#003B51'
      }),
      evenRowBGC: widgetFields.FieldColorPicker({
        label: '偶数行背景色',
        formModel: '#0A2732'
      }),
      headerColor: widgetFields.FieldColorPicker({
        label: '表头文字颜色',
        formModel: '#FFF'
      }),
      bodyColor: widgetFields.FieldColorPicker({
        label: '主体文字颜色',
        formModel: '#FFF'
      }),
      headerFontSize: widgetFields.FieldSlider({
        label: '表头字号',
        formModel: 16,
        max: 50,
        min: 10
      }),
      bodyFontSize: widgetFields.FieldSlider({
        label: '主体字号',
        formModel: 14,
        max: 50,
        min: 10
      }),
      index: widgetFields.FieldSwitch({
        label: '显示行号',
        formModel: false
      }),
      rowNum: widgetFields.FieldSlider({
        label: '显示表行数',
        formModel: 5,
        max: 20,
        min: 1
      })
    })

    this.setFields(constructorData, {
      isFakeData: widgetFieldsCombine.FieldsDataSource({
        validator: [validatorCombine.validateFieldDataSource()],
        fakeData: JSON.stringify(jsonTemplate.ForScrollBoard),
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

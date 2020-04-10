import { ScrollBoard } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
// import validators from '../../validators'
import { formateTextArea } from '../../utils/index'
import jsonTemplate from '../../json_template'

class ScrollBoardChildOne extends ScrollBoard {
  static componentDescription = {
    name: '轮播表一',
    parent: 'ScrollBoard',
    img: 'ScrollboardChildOne_icon.png'
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'ScrollBoardChildOne'

    this.setStyleFields({
      headerBGC: widgetFields.FieldColorPicker({
        label: '表头背景色',
        formModel: '#32444B'
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
    // ForScrollBoard

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
        formModel: JSON.stringify(jsonTemplate.ForScrollBoard),
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

export { ScrollBoardChildOne }

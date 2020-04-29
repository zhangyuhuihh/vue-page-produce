import { ScrollBoard } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
// import validators from '../../validators'
import { tabsTypes } from '../../configs/tabsTypes'
import { setCommonDataFields } from '../../configs/commonConfig'

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
        formModel: '#32444B',
        belongsTab: tabsTypes.overall
      }),
      oddRowBGC: widgetFields.FieldColorPicker({
        label: '奇数行背景色',
        formModel: '#003B51',
        belongsTab: tabsTypes.overall
      }),
      evenRowBGC: widgetFields.FieldColorPicker({
        label: '偶数行背景色',
        formModel: '#0A2732',
        belongsTab: tabsTypes.overall
      }),
      headerColor: widgetFields.FieldColorPicker({
        label: '表头文字颜色',
        formModel: '#FFF',
        belongsTab: tabsTypes.overall
      }),
      bodyColor: widgetFields.FieldColorPicker({
        label: '主体文字颜色',
        formModel: '#FFF',
        belongsTab: tabsTypes.overall
      }),
      headerFontSize: widgetFields.FieldSlider({
        label: '表头字号',
        formModel: 16,
        max: 50,
        min: 10,
        belongsTab: tabsTypes.overall
      }),
      bodyFontSize: widgetFields.FieldSlider({
        label: '主体字号',
        formModel: 14,
        max: 50,
        min: 10,
        belongsTab: tabsTypes.overall
      }),
      index: widgetFields.FieldSwitch({
        label: '显示行号',
        formModel: false,
        belongsTab: tabsTypes.overall
      }),
      rowNum: widgetFields.FieldSlider({
        label: '显示表行数',
        formModel: 5,
        max: 20,
        min: 1,
        belongsTab: tabsTypes.overall
      })
    })
    // ForScrollBoard

    this.setFields(setCommonDataFields())
  }
}

export { ScrollBoardChildOne }

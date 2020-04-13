import { PieChart } from '../../widget'
import widgetFields from '../../widget_fields'
// import validators from '../../validators'
import jsonTemplate from '../../json_template'
import { tabsTypes } from '../../configs/tabsTypes'

class PieChartChildOne extends PieChart {
  static componentDescription = {
    name: '饼图一',
    parent: 'PieChart',
    img: 'PieChartChildOne_icon.png'
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'pieChartChildOne'

    this.setStyleFields({
      seriesItemStyle: widgetFields.FieldColorPicker({
        label: '扇面主色',
        formModel: '#c23531',
        belongsTab: tabsTypes.overall
      }),
      seriesRadius: widgetFields.FieldSlider({
        label: '扇形面大小',
        formModel: 55,
        min: 30,
        max: 100,
        belongsTab: tabsTypes.overall
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
        formModel: JSON.stringify(jsonTemplate.ForPieChartChildOne),
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

export { PieChartChildOne }

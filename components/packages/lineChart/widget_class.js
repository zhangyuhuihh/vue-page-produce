import { LineChart } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
// import validators from '../../validators'
// import validatorCombine from '../../validator_combine'
import jsonTemplate from '../../json_template'
import widgeCustomizedFields from '../../widget_customized_fields'
// import { tabsTypes } from '../../configs/tabsTypes'
import tabsTypes from './tabTypes'

class LineChartChildOne extends LineChart {
  static componentDescription = {
    name: '折线图一',
    parent: 'LineChart',
    img: 'LineChartChildOne_icon.png',
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'lineChartChildOne'

    this.setStyleFields({
      distanceTop: widgetFields.FieldInputNumber({
        label: '顶部',
        formModel: 6,
        max: 20,
        min: 1,
        belongsTab: tabsTypes.distance,
        extraLabel: '%',
      }),
      distanceBottom: widgetFields.FieldInputNumber({
        label: '底部',
        formModel: 6,
        max: 20,
        min: 1,
        belongsTab: tabsTypes.distance,
        extraLabel: '%',
      }),
      distanceLeft: widgetFields.FieldInputNumber({
        label: '左侧',
        formModel: 3,
        max: 20,
        min: 1,
        belongsTab: tabsTypes.distance,
        extraLabel: '%',
      }),
      distanceRight: widgetFields.FieldInputNumber({
        label: '右侧',
        formModel: 3,
        max: 20,
        min: 1,
        belongsTab: tabsTypes.distance,
        extraLabel: '%',
      }),
      lineColor: widgetFields.FieldColorPicker({
        label: '折线颜色',
        formModel: '#dd6b66',
        memorable: true,
        belongsTab: tabsTypes.linestyle,
      }),
      itemColor: widgetFields.FieldColorPicker({
        label: '拐点颜色',
        formModel: '#dd6b66',
        memorable: true,
        belongsTab: tabsTypes.linestyle,
      }),
      lineWidth: widgetFields.FieldInputNumber({
        label: '折线宽度',
        formModel: 2,
        min: 1,
        max: 10,
        belongsTab: tabsTypes.linestyle,
        extraLabel: 'px',
      }),
      smooth: widgetFields.FieldSwitch({
        label: '开启曲线平滑',
        formModel: true,
        belongsTab: tabsTypes.linestyle,
      }),
      lineType: widgetFields.FieldSelect({
        label: '折线类型',
        formModel: 'solid',
        options: [
          {
            label: '实线',
            value: 'solid',
          },
          {
            label: '虚线',
            value: 'dashed',
          },
          {
            label: '点线',
            value: 'dotted',
          },
        ],
        belongsTab: tabsTypes.linestyle,
      }),
      pointShape: widgetFields.FieldSelect({
        label: '数据点形状',
        formModel: 'circle',
        options: [
          {
            label: '圆形',
            value: 'circle',
          },
          {
            label: '矩形',
            value: 'rect',
          },
          {
            label: '圆角矩形',
            value: 'roundRect',
          },
          {
            label: '三角形',
            value: 'triangle',
          },
        ],
        belongsTab: tabsTypes.datapoint,
      }),
      pointSize: widgetFields.FieldInputNumber({
        label: '数据点大小',
        formModel: 4,
        min: 1,
        max: 10,
        belongsTab: tabsTypes.datapoint,
        extraLabel: 'px',
      }),
      // axisLabelFontSize: widgetFields.FieldSlider({
      //   label: '文字大小',
      //   formModel: 12,
      //   min: 12,
      //   max: 20,
      //   belongsTab: tabsTypes.overall
      // }),
      // backgroundColor: widgetFields.FieldColorPicker({
      //   label: '背景',
      //   formModel: '#333333',
      //   belongsTab: tabsTypes.overall
      // })
    })

    this.setFields({
      dataSource: widgeCustomizedFields.dataSource({
        fakeData: JSON.stringify(jsonTemplate.ForLineChartChildOne),
      }),
    })
  }
}

export { LineChartChildOne }

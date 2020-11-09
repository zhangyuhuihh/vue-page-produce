import { Title } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
import validators from '../../validators'
// import jsonTemplate from '../../json_template'
import tabsTypes from './tabsTypes'

class TitleChildOne extends Title {
  static componentDescription = {
    name: '子标题1',
    parent: 'Title',
    img: 'TitleChildOne_icon.png',
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'TitleChildOne'

    this.setFields({
      titleText: widgetFields.FieldInput({
        label: '标题',
        formModel: '子标题一',
        validator: [validators.requireInput('请输入标题文字')],
      }),
    })

    this.setStyleFields({
      font: widgetFields.FieldSelect({
        label: '字体',
        formModel: 'SimSun',
        belongsTab: tabsTypes.text,
        options: [
          {
            label: '宋体',
            value: 'SimSun',
          },
          {
            label: '黑体',
            value: 'SimHei',
          },
          {
            label: '微软雅黑',
            value: 'Microsoft YaHei',
          },
          {
            label: '微软正黑体',
            value: 'Microsoft JhengHei',
          },
          {
            label: '新宋体',
            value: 'NSimSun',
          },
          {
            label: '仿宋',
            value: 'FangSong',
          },
          {
            label: '楷体',
            value: 'KaiTi',
          },
        ],
      }),
      color: widgetFields.FieldColorPicker({
        label: '字体颜色',
        formModel: '#fff',
        belongsTab: tabsTypes.text,
      }),
      fontSize: widgetFields.FieldInputNumber({
        label: '字体大小',
        formModel: 20,
        extraLabel: 'px',
        min: 10,
        max: 45,
        belongsTab: tabsTypes.text,
      }),
      fontWeight: widgetFields.FieldSelect({
        label: '字体粗细',
        belongsTab: tabsTypes.text,
        formModel: '400',
        options: [
          {
            label: '细',
            value: '400',
          },
          {
            label: '粗',
            value: '700',
          },
        ],
      }),
      align: widgetFields.FieldSelect({
        label: '对齐方式',
        belongsTab: tabsTypes.othertxt,
        formModel: 'center',
        options: [
          {
            label: '左对齐',
            value: 'flex-start',
          },
          {
            label: '居中对齐',
            value: 'center',
          },
          {
            label: '右对齐',
            value: 'flex-end',
          },
        ],
      }),
      textsort: widgetFields.FieldSelect({
        label: '文字排序方式',
        belongsTab: tabsTypes.othertxt,
        formModel: 'horizontal-tb',
        options: [
          {
            label: '水平',
            value: 'horizontal-tb',
          },
          {
            label: '垂直',
            value: 'vertical-rl',
          },
        ],
      }),
      letterspacing: widgetFields.FieldInputNumber({
        label: '文字间隔',
        formModel: 2,
        extraLabel: 'px',
        min: 2,
        max: 10,
        belongsTab: tabsTypes.othertxt,
      }),
    })
  }
}

// class TitleChildTwo extends Title {
//   static componentDescription = {
//     name: '子标题2',
//     parent: 'Title',
//     img: 'TitleChildOne_icon.jpg'
//   }
//   constructor(constructorData) {
//     super(constructorData)

//     this.componentKey = 'TitleChildTwo'

//     this.setFields(constructorData, {
//       url: widgetFields.FieldInput({
//         label: '链接',
//         validator: [validators.requireInput('请输入链接')]
//       }),
//       ip: widgetFields.FieldInput({
//         label: '地址',
//         validator: [validators.requireInput('请输入地址')]
//       }),
//       isFakeData: widgetFieldsCombine.FieldsDataSource({
//         validator: [validatorCombine.validateFieldDataSource()],
//         fakeData: JSON.stringify(jsonTemplate.ForTestComponentThree),
//         radios: [
//           {
//             label: '使用接口数据',
//             value: 'real'
//           },
//           {
//             label: '使用模拟数据',
//             value: 'fake'
//           }
//         ]
//       })
//     })

//     this.setStyleFields(constructorData, {
//       color: widgetFields.FieldColorPicker({
//         label: '颜色',
//         formModel: '#000'
//       }),
//       fontSize: widgetFields.FieldSelect({
//         label: '字体大小',
//         options: ['12px', '20px', '30px']
//       })
//     })
//   }
// }

export { TitleChildOne }

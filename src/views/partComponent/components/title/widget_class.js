import { Title } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
import validators from '../../validators'
// import validatorCombine from '../../validator_combine'
// import widgetFieldsCombine from '../../widget_fields_combine'
// import jsonTemplate from '../../json_template'

class TitleChildOne extends Title {
  static componentDescription = {
    name: '子标题1',
    parent: 'Title',
    img: 'TitleChildOne_icon.png'
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'TitleChildOne'

    this.setFields(constructorData, {
      titleText: widgetFields.FieldInput({
        label: '标题',
        formModel: '子标题一',
        validator: [validators.requireInput('请输入标题文字')]
      })
    })

    this.setStyleFields(constructorData, {
      color: widgetFields.FieldColorPicker({
        label: '字体颜色',
        formModel: '#000'
      }),
      fontSize: widgetFields.FieldSlider({
        label: '字体大小',
        formModel: 20,
        min: 12,
        max: 45
      }),
      fontWeight: widgetFields.FieldSelect({
        label: '字体粗细',
        options: [
          {
            label: '细',
            value: '400'
          },
          {
            label: '粗',
            value: '700'
          }
        ]
      })
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

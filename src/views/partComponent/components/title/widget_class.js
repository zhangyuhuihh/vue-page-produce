import { Title } from '../../widget'
import widgetFields from '../../widget_fields' // 单一的form
import validators from '../../validators'
import validatorCombine from '../../validator_combine'
import widgetFieldsCombine from '../../widget_fields_combine'
import jsonTemplate from '../../json_template'

class TitleChildOne extends Title {
  static componentDescription = {
    name: '子标题1',
    parent: 'Title',
    img: 'TitleChildOne_icon.jpg'
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'TitleChildOne'

    this.setFields(constructorData, {
      url: widgetFields.FieldInput({
        label: '链接',
        validator: [validators.requireInput('请输入链接')]
      })
    })

    this.setStyleFields(constructorData, {
      color: widgetFields.FieldColorPicker({
        label: '颜色',
        formModel: '#000'
      }),
      fontSize: widgetFields.FieldSelect({
        label: '字体大小',
        options: ['12px', '20px', '30px']
      })
    })
  }
}

class TitleChildTwo extends Title {
  static componentDescription = {
    name: '子标题2',
    parent: 'Title',
    img: 'TitleChildOne_icon.jpg'
  }
  constructor(constructorData) {
    super(constructorData)

    this.componentKey = 'TitleChildTwo'

    this.setFields(constructorData, {
      url: widgetFields.FieldInput({
        label: '链接',
        validator: [validators.requireInput('请输入链接')]
      }),
      ip: widgetFields.FieldInput({
        label: '地址',
        validator: [validators.requireInput('请输入地址')]
      }),
      isFakeData: widgetFieldsCombine.FieldsDataSource({
        validator: [validatorCombine.validateFieldDataSource()],
        fakeData: JSON.stringify(jsonTemplate.ForTestComponentThree),
        radios: [
          {
            label: '使用接口数据',
            value: 'real'
          },
          {
            label: '使用模拟数据',
            value: 'fake'
          }
        ]
      })
    })

    this.setStyleFields(constructorData, {
      color: widgetFields.FieldColorPicker({
        label: '颜色',
        formModel: '#000'
      }),
      fontSize: widgetFields.FieldSelect({
        label: '字体大小',
        options: ['12px', '20px', '30px']
      })
    })
  }
}

export { TitleChildOne, TitleChildTwo }

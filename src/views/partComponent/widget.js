import _ from 'lodash'
import widgetFields from './widget_fields' // 单一的form
import widgetFieldsCombine from './widget_fields_combine' // 定制化的form
import validators from './validators'
import validatorCombine from './validator_combine'
import jsonTemplate from './json_template'

/**
 * uuid: 前端唯一标识
 * dragPosition: 拖动位置信息
 * dragSize: 拖动大小信息
 * fields: 组件表单信息,
 * styleFields: 组件样式信息
 */

class Widget {
  constructor(constructorData) {
    this.uuid = constructorData.uuid
    this.setDragPosition(constructorData)
  }

  setDragPosition(constructorData) {
    switch (constructorData.type) {
      case 'add':
        this.dragPosition = {
          x: 0,
          y: 0
        }
        break
      case 'edit':
        this.dragPosition = {
          x: constructorData.dragPosition.x,
          y: constructorData.dragPosition.y
        }
    }
  }

  setDragSize(constructorData, initDragSize) {
    switch (constructorData.type) {
      case 'add':
        this.dragSize = {
          width: initDragSize.width,
          height: initDragSize.height
        }
        break
      case 'edit':
        this.dragSize = {
          width: constructorData.dragSize.width,
          height: constructorData.dragSize.height
        }
    }
  }

  setFields(constructorData, fields) {
    switch (constructorData.type) {
      case 'add':
        this.fields = { ...fields }
        break
      case 'edit':
        this.fields = _.mapValues(fields, (value, key) => {
          return constructorData[key]
        })
        break
    }
  }

  setStyleFields(constructorData, styleFields) {
    switch (constructorData.type) {
      case 'add':
        this.styleFields = { ...styleFields }
        break
      case 'edit':
        this.styleFields = _.mapValues(styleFields, (value, key) => {
          return constructorData[key]
        })
        break
    }
  }
}

class Title extends Widget {
  static componentDescription = {
    name: '标题类',
    parent: 'widget'
  }

  constructor(constructorData) {
    super(constructorData)
    this.setDragSize(constructorData, {
      width: 1920,
      height: 50
    })
  }
}

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
      color: widgetFields.FieldColorPicker(),
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
      color: widgetFields.FieldColorPicker(),
      fontSize: widgetFields.FieldSelect({
        label: '字体大小',
        options: ['12px', '20px', '30px']
      })
    })
  }
}

class ScrollBoard extends Widget {
  static componentDescription = {
    name: '轮播表类',
    parent: 'widget'
  }

  constructor(constructorData) {
    super(constructorData)
    this.setDragSize(constructorData, {
      width: 960,
      height: 780
    })
  }
}

class ScrollBoardChild extends ScrollBoard {
  static componentDescription = {
    name: '轮播表一',
    parent: 'ScrollBoard',
    img: 'scrollboard.png'
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'ScrollBoardChild'

    this.setStyleFields(constructorData, {
      color: widgetFields.FieldColorPicker()
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

// class TestComponentOne extends Widget {
//   static initSize = {
//     width: 300,
//     height: 300
//   }

//   static componentDescription = {
//     name: '测试组件1',
//     parent
//   }

//   constructor(constructorData) {
//     super(constructorData)

//     this.componentKey = 'TestComponentOne'

//     this.setDragSize(constructorData, {
//       width: TestComponentOne.initSize.width,
//       height: TestComponentOne.initSize.height
//     })

//     this.setFields(constructorData, {
//       url: widgetFields.FieldInput({
//         label: '链接',
//         validator: [validators.requireInput('请输入链接')]
//       }),
//       ip: widgetFields.FieldInput({
//         label: '地址',
//         validator: [validators.requireInput('请输入地址')]
//       }),
//       people: widgetFields.FieldRadio({
//         validator: [validators.requireInput('请选择人')],
//         radios: [
//           {
//             label: '张三',
//             value: 'zhangsan'
//           },
//           {
//             label: '李四',
//             value: 'lisi'
//           }
//         ]
//       })
//     })
//   }
// }

// class TestComponentTwo extends Widget {
//   static initSize = {
//     width: 200,
//     height: 500
//   }
//   constructor(constructorData) {
//     super(constructorData)

//     this.componentKey = 'TestComponentTwo'

//     this.setDragSize(constructorData, {
//       width: TestComponentTwo.initSize.width,
//       height: TestComponentTwo.initSize.height
//     })

//     this.setStyleFields(constructorData, {
//       color: widgetFields.FieldColorPicker(),
//       fontSize: widgetFields.FieldSelect({
//         label: '请选择字体大小',
//         options: ['12px', '20px', '30px']
//       })
//     })
//   }
// }

// class TestComponentThree extends Widget {
//   static initSize = {
//     width: 200,
//     height: 500
//   }
//   constructor(constructorData) {
//     super(constructorData)

//     this.componentKey = 'TestComponentThree'

//     this.setDragSize(constructorData, {
//       width: TestComponentThree.initSize.width,
//       height: TestComponentThree.initSize.height
//     })

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
//       color: widgetFields.FieldColorPicker(),
//       fontSize: widgetFields.FieldSelect({
//         label: '请选择字体大小',
//         options: ['12px', '20px', '30px']
//       })
//     })
//   }
// }
// TestComponentOne, TestComponentTwo, TestComponentThree,

export { Title, TitleChildOne, TitleChildTwo, ScrollBoard, ScrollBoardChild }


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

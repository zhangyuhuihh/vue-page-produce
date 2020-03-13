import _ from 'lodash'
// import widgetFields from './widget_fields' // 单一的form
// import widgetFieldsCombine from './widget_fields_combine' // 定制化的form
// import validators from './validators'
// import validatorCombine from './validator_combine'
// import jsonTemplate from './json_template'

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
          x: constructorData.initDragPosition.x,
          y: constructorData.initDragPosition.y,
          z: 9999
        }
        break
      case 'edit':
        this.dragPosition = {
          x: constructorData.dragPosition.x,
          y: constructorData.dragPosition.y,
          z: constructorData.dragPosition.z
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
      width: 300,
      height: 50
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
      height: 113
    })
  }
}

export { Title, ScrollBoard }

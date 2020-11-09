// import _ from 'lodash'
// import widgetFields from './widget_fields' // 单一的form
// import widgetFieldsCombine from './widget_fields_combine' // 定制化的form
// import validators from './validators'
// import validatorCombine from './validator_combine'
// import jsonTemplate from './json_template'

/**
 * uuid: 前端唯一标识
 * dragPosition: 拖动位置信息
 * dragSize: 拖动大小信息
 * dragSitutation: 组件当前拖动状态
 * fields: 组件表单信息,
 * styleFields: 组件样式信息
 */

class Widget {
  constructor(constructorData) {
    this.uuid = constructorData.uuid
    this.setDragPositionFields(constructorData)
    this.setDragSitutation(constructorData)
  }

  setDragSitutation() {
    this.dragSitutation = {
      draggable: true,
      resizable: true
    }
  }

  setFields(fields) {
    this.fields = { ...fields }
  }

  setStyleFields(styleFields) {
    this.styleFields = { ...styleFields }
  }

  setDragSizeFields(initDragSize) {
    this.dragSize = {
      width: initDragSize.width,
      height: initDragSize.height
    }
  }

  setDragPositionFields(constructorData) {
    this.dragPosition = {
      x: constructorData.initDragPosition.x,
      y: constructorData.initDragPosition.y,
      z: 2000
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
    this.setDragSizeFields({
      width: 210,
      height: 120
    })
  }
}

class ScrollBoard extends Widget {
  static componentDescription = {
    name: '表格类',
    parent: 'widget'
  }

  constructor(constructorData) {
    super(constructorData)
    this.setDragSizeFields({
      width: 500,
      height: 220
    })
  }
}

class LineChart extends Widget {
  static componentDescription = {
    name: '折线图类',
    parent: 'widget'
  }

  constructor(constructorData) {
    super(constructorData)
    this.setDragSizeFields({
      width: 400,
      height: 300
    })
  }
}

class PieChart extends Widget {
  static componentDescription = {
    name: '饼图类',
    parent: 'widget'
  }

  constructor(constructorData) {
    super(constructorData)
    this.setDragSizeFields({
      width: 350,
      height: 350
    })
  }
}

class BarChart extends Widget {
  static componentDescription = {
    name: '柱状图类',
    parent: 'widget'
  }

  constructor(constructorData) {
    super(constructorData)
    this.setDragSizeFields({
      width: 400,
      height: 300
    })
  }
}
export { Title, ScrollBoard, LineChart, PieChart, BarChart }

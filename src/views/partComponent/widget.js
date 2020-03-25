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
 * dragSitutation: 组件当前拖动状态
 * fields: 组件表单信息,
 * styleFields: 组件样式信息
 */

class Widget {
  constructor(constructorData) {
    this.uuid = constructorData.uuid
    this.setDragPosition(constructorData)
    this.setDragSitutation(constructorData)
  }

  setDragPosition(constructorData) {
    switch (constructorData.type) {
      case 'add':
        this.dragPosition = {
          x: constructorData.initDragPosition.x,
          y: constructorData.initDragPosition.y,
          z: 2000
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

  setDragSitutation(constructorData) {
    switch (constructorData.type) {
      case 'add':
        this.dragSitutation = {
          draggable: true,
          resizable: true
        }
        break
      case 'edit':
        this.dragSize = {
          draggable: constructorData.dragSitutation.draggable,
          resizable: constructorData.dragSitutation.resizable
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
      width: 200,
      height: 50
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
    this.setDragSize(constructorData, {
      width: 250,
      height: 113
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
    this.setDragSize(constructorData, {
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
    this.setDragSize(constructorData, {
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
    this.setDragSize(constructorData, {
      width: 400,
      height: 300
    })
  }
}
export { Title, ScrollBoard, LineChart, PieChart, BarChart }

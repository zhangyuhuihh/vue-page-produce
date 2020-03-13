import _ from 'lodash'

const ADD_WIDGET = 'ADD_WIDGET'
const UPDATE_WIDGET_POS_XY = 'UPDATE_WIDGET_POS_XY'
const UPDATE_WIDGET_POX_Z = 'UPDATE_WIDGET_POX_Z'
const UPDATE_WIDGET_SIZE = 'UPDATE_WIDGET_SIZE'
const REMOVE_WIDGET = 'REMOVE_WIDGET'
const SET_ACTIVEDWIDGET = 'SET_ACTIVEDWIDGET'
const FIELDS_CHANGE = 'FIELDS_CHANGE'
const UPDATE_WIDGET_ERROR = 'UPDATE_WIDGET_ERROR'

function getErrorMsg(validators = [], formModel) {
  let res = validators.map(fn => fn(formModel))
  if (res.every(v => v === 'pass')) {
    return ''
  } else {
    return res.filter(v => v !== 'pass').join(', ')
  }
}

export default {
  namespaced: true,
  state: {
    widgetList: [],
    activedWidget: {},
    bigScreenRatio: {
      width: 1920,
      height: 1080
    },
    pageBgColor: '#999999',
    pageBgImgUrl: '',
    magnification: 60
  },
  getters: {
    editorAreaSize: state => {
      return {
        // width: state.bigScreenRatio.width * state.magnification / 100,
        // height: state.bigScreenRatio.height * state.magnification / 100
        width: state.bigScreenRatio.width,
        height: state.bigScreenRatio.height
      }
    },

    requestDataList: (state, getters) => {
      const { width, height } = getters.editorAreaSize
      return state.widgetList.map(item => {
        return {
          ...item,
          requestDataPosition: {
            x: item.dragPosition.x / width,
            y: item.dragPosition.y / height
          },
          requestDataSize: {
            width: item.dragSize.width / width,
            height: item.dragSize.height / height
          }
        }
      })
    }
  },
  mutations: {
    [ADD_WIDGET]: (state, oneWidget) => {
      state.widgetList.push(oneWidget)
    },

    [UPDATE_WIDGET_POS_XY]: (state, newDragPosMsg) => {
      const widget = state.widgetList.find(v => v.uuid === newDragPosMsg.uuid)
      widget.dragPosition.x = newDragPosMsg.x
      widget.dragPosition.y = newDragPosMsg.y
    },

    [UPDATE_WIDGET_POX_Z]: (state, arr) => {
      state.widgetList = arr.map(v => {
        let obj = _.cloneDeep(state.widgetList.find(el => el.uuid === v.uuid))
        obj.dragPosition.z = v.z
        return obj
      })
    },

    [UPDATE_WIDGET_SIZE]: (state, newDragSizeMsg) => {
      const widget = state.widgetList.find(v => v.uuid === newDragSizeMsg.uuid)
      widget.dragSize.width = newDragSizeMsg.width
      widget.dragSize.height = newDragSizeMsg.height
    },

    [REMOVE_WIDGET]: (state, oneWidget) => {
      state.widgetList = state.widgetList.filter(v => v.uuid === oneWidget.uuid)
    },

    [SET_ACTIVEDWIDGET]: (state, activeWidget) => {
      state.activedWidget = activeWidget
    },

    [FIELDS_CHANGE]: (state, { uuid, fieldType, fieldKey, fieldValue }) => {
      const widget = state.widgetList.find(v => v.uuid === uuid)
      widget[fieldType][fieldKey].formModel = fieldValue
      widget[fieldType][fieldKey].errorMsg = getErrorMsg(
        widget[fieldType][fieldKey].validator,
        widget[fieldType][fieldKey].formModel
      )
    },

    [UPDATE_WIDGET_ERROR]: (state, { arr, uuid }) => {
      const widget = state.widgetList.find(v => v.uuid === uuid)
      for (let key in widget.fields) {
        const o = arr.find(v => v.key === key)
        widget.fields[key].errorMsg = o.errMsg
      }
    },

    setPageBgColor: (state, newPageBgColor) => {
      state.pageBgColor = newPageBgColor
    },

    setPageBgImgUrl: (state, newPageBgImgUrl) => {
      state.pageBgImgUrl = newPageBgImgUrl
    },

    setBigScreenRatioWidth: (state, width) => {
      state.bigScreenRatio.width = width
    },

    setBigScreenRatioHeight: (state, height) => {
      state.bigScreenRatio.height = height
    },

    setMagnification: (state, newMagnification) => {
      state.magnification = newMagnification
    }
  },
  actions: {
    addWidget: ({ commit }, oneWidget) => {
      commit('ADD_WIDGET', oneWidget)
    },

    removeWidget: ({ commit }, oneWdiget) => {
      commit('REMOVE_WIDGET', oneWdiget)
    },

    setActivedWidget: ({ commit, state }, activeUUid) => {
      const activeWdiget = state.widgetList.find(v => v.uuid === activeUUid)
      commit('SET_ACTIVEDWIDGET', activeWdiget)
    },

    updateWidgetDragPos({ commit }, newDragPosMsg) {
      commit('UPDATE_WIDGET_POS_XY', newDragPosMsg)
    },

    updateWidgetZIndex({ commit }, newZIndexArr) {
      commit('UPDATE_WIDGET_POX_Z', newZIndexArr)
    },

    updateWidgetDragSize({ commit }, newDragSizeMsg) {
      commit('UPDATE_WIDGET_SIZE', newDragSizeMsg)
    },

    fieldsChange({ commit }, { uuid, fieldType, fieldKey, fieldValue }) {
      commit('FIELDS_CHANGE', { uuid, fieldType, fieldKey, fieldValue })
    },

    validateAllFields({ commit, state }, uuid) {
      return new Promise((resolve, reject) => {
        const fields = state.widgetList.find(v => v.uuid === uuid).fields

        const arr = []

        for (let key in fields) {
          const { validator } = fields[key]
          let res = validator.map(fn => fn(fields[key].formModel))
          arr.push({
            key,
            isValid: res.every(v => v === 'pass'),
            errMsg: res.filter(v => v !== 'pass').join(',')
          })
        }

        const isValid = arr.every(v => v.isValid)

        if (isValid) {
          resolve()
        } else {
          commit('UPDATE_WIDGET_ERROR', { arr, uuid })
          reject(Error)
        }
      })
    }
  }
}

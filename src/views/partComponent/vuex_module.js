import _ from 'lodash'
import vuexDraggable from './vuexs/vuex_draggable'

const ADD_WIDGET = 'ADD_WIDGET'
const BACK_FORWARD_TO_STATE = 'BACK_FORWARD_TO_STATE'
const MEMORY_FOR_BACK_FORWARD = 'MEMORY_FOR_BACK_FORWARD'
const UPDATE_WIDGET_POS_XY = 'UPDATE_WIDGET_POS_XY'
const UPDATE_WIDGET_POX_Z = 'UPDATE_WIDGET_POX_Z'
const UPDATE_WIGET_POX_Z_SINGLE = 'UPDATE_WIGET_POX_Z_SINGLE'
const UPDATE_WIDGET_SITUTATION = 'UPDATE_WIDGET_SITUTATION'
const UPDATE_WIDGET_SIZE = 'UPDATE_WIDGET_SIZE'
const REMOVE_WIDGET = 'REMOVE_WIDGET'
const SET_ACTIVEDWIDGET_UUID = 'SET_ACTIVEDWIDGET_UUID'
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
    activedWidgetUUID: '',
    bigScreenRatio: {
      width: 1920,
      height: 1080
    },
    pageBgColor: '#07122A',
    pageBgImgUrl: '',
    magnification: 50,
    cacheStateCount: 0
  },
  getters: {
    activedWidget: state => {
      let obj =
        state.widgetList.find(v => v.uuid === state.activedWidgetUUID) || {}
      return obj
    },
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

    [BACK_FORWARD_TO_STATE]: (state, newState) => {
      state.widgetList = [...newState.widgetList]
    },

    [MEMORY_FOR_BACK_FORWARD]: (state) => {
      state.cacheStateCount++
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

    [UPDATE_WIGET_POX_Z_SINGLE]: (state, { z, uuid }) => {
      const widget = state.widgetList.find(v => v.uuid === uuid)
      widget.dragPosition.z = z
    },

    [UPDATE_WIDGET_SITUTATION]: (state, newDragSitutation) => {
      const widget = state.widgetList.find(
        v => v.uuid === newDragSitutation.uuid
      )
      widget.dragSitutation = newDragSitutation.dragSitutation
    },

    [UPDATE_WIDGET_SIZE]: (state, newDragSizeMsg) => {
      const widget = state.widgetList.find(v => v.uuid === newDragSizeMsg.uuid)
      widget.dragSize.width = newDragSizeMsg.width
      widget.dragSize.height = newDragSizeMsg.height
    },

    [REMOVE_WIDGET]: (state, oneWidgetUUId) => {
      state.widgetList = state.widgetList.filter(v => v.uuid !== oneWidgetUUId)
    },

    [SET_ACTIVEDWIDGET_UUID]: (state, activeWidgetUUid) => {
      state.activedWidgetUUID = activeWidgetUUid
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

    backForwardToState: ({ commit }, newState) => {
      commit('BACK_FORWARD_TO_STATE', newState)
    },

    setMemoryForBackForward: ({ commit }) => {
      commit('MEMORY_FOR_BACK_FORWARD')
    },

    removeWidget: ({ commit, dispatch }, oneWdigetuuid) => {
      dispatch('removeActivedWidget', oneWdigetuuid)
      commit('REMOVE_WIDGET', oneWdigetuuid)
    },

    setActivedWidget: ({ commit }, activeUUid) => {
      commit('SET_ACTIVEDWIDGET_UUID', activeUUid)
    },

    removeActivedWidget: ({ commit, state }, deActiveUUid) => {
      if (state.activedWidgetUUID === deActiveUUid) {
        commit('SET_ACTIVEDWIDGET_UUID', '')
      }
    },

    updateWidgetDragPos({ commit }, newDragPosMsg) {
      commit('UPDATE_WIDGET_POS_XY', newDragPosMsg)
    },

    updateWidgetZIndex({ commit }, newZIndexArr) {
      commit('UPDATE_WIDGET_POX_Z', newZIndexArr)
    },

    updateWidgetZIndexSingle({ commit }, { uuid, z }) {
      commit('UPDATE_WIGET_POX_Z_SINGLE', { uuid, z })
    },

    updateWidgetSitutation({ commit }, newDragSitutation) {
      commit('UPDATE_WIDGET_SITUTATION', newDragSitutation)
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
  },
  modules: {
    vuexDraggable
  }
}

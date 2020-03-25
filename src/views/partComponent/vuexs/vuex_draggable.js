export default {
  namespaced: true,
  state: {
    draggableList: []
  },
  mutations: {
    setDraggableList: (state, list) => {
      state.draggableList = list
    }
  }
}

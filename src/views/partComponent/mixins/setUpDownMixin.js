import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('partComponent', ['widgetList', 'activedWidgetUUID']),

    // 反方向进行z值排序
    draggableList: {
      get() {
        let newList = [...this.widgetList]
        newList.reverse()
        return newList
      },
      set(value) {
        let newValue = [...value]
        newValue.reverse()
        this.updateWidgetZIndex(newValue)
      },
    },
  },

  methods: {
    ...mapActions('partComponent', ['updateWidgetZIndex']),

    setTop() {
      const id = this.activedWidgetUUID
      let arr = []
      for (let i = 0; i < this.draggableList.length; i++) {
        let element = this.draggableList[i]
        if (element.uuid === id) {
          arr.unshift({ ...element })
        } else {
          arr.push({ ...element })
        }
      }
      arr.reverse()
      this.updateWidgetZIndex(arr)
    },

    setBottom() {
      const id = this.activedWidgetUUID
      let arr = []
      let last
      for (let i = 0; i < this.draggableList.length; i++) {
        let element = this.draggableList[i]
        if (element.uuid === id) {
          last = { ...element }
        } else {
          arr.push({ ...element })
        }
      }
      let newArr = arr.concat([last])
      newArr.reverse()
      this.updateWidgetZIndex(newArr)
    },

    setUpOneStep() {
      const id = this.activedWidgetUUID
      let arr = [...this.draggableList]
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].uuid === id) {
          if (i > 0) {
            let temp = arr[i - 1]
            arr[i - 1] = arr[i]
            arr[i] = temp
            break
          }
        }
      }
      arr.reverse()
      this.updateWidgetZIndex(arr)
    },

    setDownOneStep() {
      const id = this.activedWidgetUUID
      let arr = [...this.draggableList]
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].uuid === id) {
          if (i < arr.length - 1) {
            let temp = arr[i + 1]
            arr[i + 1] = arr[i]
            arr[i] = temp
            break
          }
        }
      }
      arr.reverse()
      this.updateWidgetZIndex(arr)
    },
  },
}

const mixins = {
  data() {
    return {
      cacheOnEvents: []
    }
  },
  computed: {
    emitEvents() {
      return this.currentBindWidget.emitEvents || []
    },
    onEvents() {
      return this.currentBindWidget.onEvents || []
    }
  },
  mounted() {
    this.cacheOnEvents = this.onEvents
  },
  // 因为是先置空activeWidgetUUid,导致属性全部清零，然后
  // 才改变的key，触发beforeDestroy,所以此时的数据全部为空,导致无法清空事件
  // 所以改用缓存
  beforeDestroy() {
    this.cacheOnEvents.forEach((v) => {
      if (v) {
        this.$EventBus.$off(v.eventName)
      }
    })
  }
}

export default mixins

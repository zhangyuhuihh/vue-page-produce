const mixins = {
  props: {
    uuid: {
      type: String,
      required: true,
    },
    styleFields: {
      type: Object,
      required: true,
    },
    fields: {
      type: Object,
      required: true,
    },
    realDataToShow: {
      type: String,
    },
  },
  watch: {
    // 编辑时数据的操作展示逻辑
    fields: {
      handler(newValue) {
        this.reactToFieldsChange(newValue.dataSource.formModel.valueToShow)
      },
      immediate: true,
      deep: true,
    },

    // 单独放映对应的可视化时候的数据
    realDataToShow: {
      handler(newValue) {
        this.reactToFieldsChange(newValue)
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {},
}

export default mixins

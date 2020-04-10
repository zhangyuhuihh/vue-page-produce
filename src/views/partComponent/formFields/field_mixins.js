import { mapState, mapActions } from 'vuex'
const mixins = {
  props: {
    fieldKey: {
      type: String,
      required: true
    },
    fieldType: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('partComponent', ['widgetList', 'activedWidgetUUID']),
    uuid() {
      return this.activedWidgetUUID
    },
    currentBindWidget() {
      const widget = this.widgetList.find(item => item.uuid === this.uuid)
      if (!widget) {
        return {}
      }
      return widget[this.fieldType][this.fieldKey] || {}
    },
    modelData() {
      return this.currentBindWidget.formModel || ''
    },
    labelData() {
      return this.currentBindWidget.label || ''
    },
    errorMsg() {
      return this.currentBindWidget.errorMsg || ''
    },
    memorable() {
      return this.currentBindWidget.memorable || false
    }
  },
  methods: {
    ...mapActions('partComponent', ['fieldsChange', 'setMemoryForBackForward']),
    handleFieldModelChange(v) {
      this.fieldsChange({
        uuid: this.uuid,
        fieldType: this.fieldType,
        fieldKey: this.fieldKey,
        fieldValue: v
      })
      if (this.memorable) {
        this.setMemoryForBackForward()
      }
    }
  }
}

export default mixins

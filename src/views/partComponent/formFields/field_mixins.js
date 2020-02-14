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
    ...mapState('partComponent', ['widgetList', 'activedWidget']),
    uuid() {
      return this.activedWidget.uuid
    },
    currentBindWidget() {
      return this.widgetList.find(item => item.uuid === this.uuid)[this.fieldType][this.fieldKey]
    },
    modelData() {
      return this.currentBindWidget.formModel || ''
    },
    labelData() {
      return this.currentBindWidget.label || ''
    },
    errorMsg() {
      return this.currentBindWidget.errorMsg
    }
  },
  methods: {
    ...mapActions('partComponent', ['fieldsChange']),
    handleFieldModelChange(v) {
      this.fieldsChange({
        uuid: this.uuid,
        fieldType: this.fieldType,
        fieldKey: this.fieldKey,
        fieldValue: v
      })
    }
  }
}

export default mixins

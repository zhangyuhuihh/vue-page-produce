import { mapState, mapGetters, mapActions } from 'vuex'
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
    ...mapState('partComponent', ['widgetList']),
    ...mapGetters('partComponent', ['activedWidget']),
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
    },
    memorable() {
      return this.currentBindWidget.memorable
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

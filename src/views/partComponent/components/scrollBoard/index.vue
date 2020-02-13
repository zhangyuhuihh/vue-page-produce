<template>
  <div class="scroll-borad-container">
    哈哈哈哈
    {{currentWidgetStyleFields}}
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("partComponent", ["widgetList"]),
    currentWidget() {
      return this.widgetList.find(v => v.uuid === this.uuid)
    },
    currentWidgetStyleFields() {
      return this.currentWidget.styleFields
    },
    currentWidgetFields() {
      return this.currentWidget.fields
    },
    fakeData() {
      return JSON.parse(this.currentWidgetFields.isFakeData.formModel.fakeData)
    }
  }
};
</script>

<style scoped>
.scroll-borad-container {
  font-size: 40px;
}
</style>>
<template>
  <div
    class="testComponent_one"
    :style="{
    color: currentWidgetStyleFields.color.formModel,
    fontSize: currentWidgetStyleFields.fontSize.formModel
  }"
  >
    <span>哈哈</span>
    <!-- <span>url: {{currentWidgetFields.isFakeData.formModel.url}}</span> -->
    <span>年龄:{{fakeData.age}}</span>
    <span>兄弟:</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('partComponent', ['widgetList']),
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
    },
    dataType() {
      return this.fakeData.dataType
    }
  }
}
</script>

<style>
.testComponent_one {
  width: 50px;
  height: 50px;
}
</style>

<template>
  <div
    class="title_child_one_container"
    :style="{
    color: currentWidgetStyleFields.color.formModel,
    fontSize: currentWidgetStyleFields.fontSize.formModel + 'px',
    fontWeight:currentWidgetStyleFields.fontWeight.formModel,
    textAlign: 'center'
  }"
  >
    <div>
      {{titleText ? titleText : '标题'}}
    </div>
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
    titleText() {
      return this.currentWidget.fields.titleText.formModel
    }
  }
}
</script>

<style>
.title_child_one_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 50px;
  height: 50px; */
}
</style>

<template>
  <div class="scroll-borad-container">
    <ScrollBoard :config="mergedConfig" />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import ScrollBoard from './main'
export default {
  components: {
    ScrollBoard
  },
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
    headerBGC() {
      return { headerBGC: this.currentWidgetStyleFields.headerBGC.formModel }
    },
    oddRowBGC() {
      return { oddRowBGC: this.currentWidgetStyleFields.oddRowBGC.formModel }
    },
    evenRowBGC() {
      return { evenRowBGC: this.currentWidgetStyleFields.evenRowBGC.formModel }
    },
    headerColor() {
      return {
        headerColor: this.currentWidgetStyleFields.headerColor.formModel
      }
    },
    bodyColor() {
      return { bodyColor: this.currentWidgetStyleFields.bodyColor.formModel }
    },
    index() {
      return { index: this.currentWidgetStyleFields.index.formModel }
    },
    mergedConfig() {
      const {
        fakeData,
        headerBGC,
        oddRowBGC,
        evenRowBGC,
        headerColor,
        bodyColor,
        index
      } = this
      return _.merge(
        {},
        fakeData,
        headerBGC,
        oddRowBGC,
        evenRowBGC,
        headerColor,
        bodyColor,
        index
      )
    }
  }
}
</script>

<style scoped>
.scroll-borad-container {
  font-size: 40px;
}
</style>

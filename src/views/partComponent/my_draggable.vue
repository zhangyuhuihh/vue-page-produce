<template>
  <div
    ref="rightBox"
    id="rightBox"
    class="right_container"
    :style="{
            width: editorAreaSize.width + 'px',
            height: editorAreaSize.height + 'px'
        }"
  >
    <template v-for="item in widgetList">
      <vue-draggable-resizable
        :key="item.uuid"
        :parent="true"
        :x="item.dragPosition.x"
        :y="item.dragPosition.y"
        :w="item.dragSize.width"
        :h="item.dragSize.height"
        :minWidth="20"
        :minHeight="20"
        @dragstop="onDragStop"
        @resizestop="onResizeStop"
        @activated="onActivated(item)"
      >
        <component :is="item.componentKey" :uuid="item.uuid"></component>
      </vue-draggable-resizable>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VueDraggableResizable from './draggable/vue-draggable-resizable'
import _ from 'lodash'
import TestComponentOne from './testComponents/testComponentOne'
import TestComponentTwo from './testComponents/testComponentTwo'
import TestComponentThree from './testComponents/testComponentThree'
export default {
  name: 'myDraggable',
  components: {
    VueDraggableResizable,
    TestComponentOne,
    TestComponentTwo,
    TestComponentThree
  },
  props: {},
  data() {
    return {
      activeUUid: ''
    }
  },
  computed: {
    ...mapState('partComponent', ['widgetList']),
    ...mapGetters('partComponent', ['editorAreaSize', 'requestDataList'])
  },

  created() {},
  methods: {
    ...mapActions('partComponent', [
      'setActivedWidget',
      'updateWidgetDragPos',
      'updateWidgetDragSize'
    ]),

    onDragStop(x, y) {
      this.updateWidgetDragPos({
        x: x,
        y: y,
        uuid: this.activeUUid
      })
    },

    onResizeStop(x, y, width, height) {
      this.updateWidgetDragPos({
        x: x,
        y: y,
        uuid: this.activeUUid
      })
      this.updateWidgetDragSize({
        width: width,
        height: height,
        uuid: this.activeUUid
      })
    },

    onActivated(params) {
      this.activeUUid = params.uuid
      const actWidget = this.widgetList.find(v => v.uuid === params.uuid)
      console.log('actWidget: ', actWidget)
      this.setActivedWidget(_.cloneDeep(actWidget))
    }
  }
}
</script>

<style lang="scss" scoped>
.right_container {
  cursor: pointer;
  background-color: #0a304d;
  position: relative;
}
</style>

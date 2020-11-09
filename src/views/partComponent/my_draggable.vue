<template>
  <div
    ref="editMainBox"
    id="editMainBox"
    class="editMainBox_container"
    :style="{
      width: editorAreaSize.width + 'px',
      height: editorAreaSize.height + 'px',
      backgroundImage: `url(${pageBgImgUrl})`,
      backgroundColor: pageBgColor
    }"
  >
    <template v-for="item in widgetList">
      <vue-draggable-resizable
        :key="item.uuid"
        :parent="true"
        :draggable="item.dragSitutation.draggable"
        :resizable="item.dragSitutation.resizable"
        :active="item.uuid === activedWidget.uuid"
        :x="item.dragPosition.x"
        :y="item.dragPosition.y"
        :z="item.dragPosition.z"
        :w="item.dragSize.width"
        :h="item.dragSize.height"
        :minWidth="20"
        :minHeight="20"
        @resizing="onResizing"
        @dragging="onDragging"
        @dragstop="onDragStop"
        @resizestop="onResizeStop"
        @activated="onActivated(item)"
        @deactivated="onDeActivated(item)"
      >
        <div :id="item.uuid" style="width: 100%; height: 100%">
          <!-- 这边的padding,决定了widthHeightPadding的大小 -->
          <!-- 使用id标识当前块的位置，传递给上层 -->
          <component
            @contextmenu.prevent.native="openMenu($event, item)"
            :is="item.componentKey"
            v-bind="item"
          ></component>
        </div>
      </vue-draggable-resizable>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import VueDraggableResizable from './draggable/vue-draggable-resizable'
// import _ from 'lodash'
export default {
  name: 'myDraggable',
  components: {
    VueDraggableResizable
  },
  props: {},
  data() {
    return {
      activeUUid: '',
      widthHeightPadding: 10
    }
  },
  computed: {
    ...mapState('partComponent', [
      'widgetList',
      'pageBgColor',
      'pageBgImgUrl',
      'magnification'
    ]),
    ...mapGetters('partComponent', [
      'activedWidget',
      'editorAreaSize',
      'requestDataList'
    ])
  },
  methods: {
    ...mapActions('partComponent', [
      'setActivedWidget',
      'updateWidgetDragPos',
      'updateWidgetDragSize',
      'removeActivedWidget',
      'setMemoryForBackForward'
    ]),

    onDragStop(x, y) {
      this.updateWidgetDragPos({
        x: x,
        y: y,
        uuid: this.activeUUid
      })
      this.setMemoryForBackForward()
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
      this.setMemoryForBackForward()
    },

    onResizing(x, y, width, height) {
      this.updateWidgetDragSize({
        width: width,
        height: height,
        uuid: this.activeUUid
      })
    },

    onDragging(x, y) {
      this.updateWidgetDragPos({
        x: x,
        y: y,
        uuid: this.activeUUid
      })
    },

    onActivated(params) {
      this.activeUUid = params.uuid
      this.setActivedWidget(this.activeUUid)
    },

    openMenu(e, item) {
      let rightMenu = {}
      rightMenu['isShow'] = true
      this.$nextTick(() => {
        let mousePosX = e.clientX - 300 // 鼠标位置减去左边的距离
        let mousePosY = e.clientY - 40 // 鼠标位置减去右边的距离

        rightMenu['left'] = mousePosX
        rightMenu['top'] = mousePosY
        this.$emit('openRightMouseMenu', rightMenu, item.uuid)
      })
    },

    onDeActivated(params) {
      // 失去焦点时清空activeWidget
      this.removeActivedWidget(params.uuid)
    }
  }
}
</script>

<style lang="scss" scoped>
.editMainBox_container {
  cursor: pointer;
  position: relative;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.3);
}
</style>

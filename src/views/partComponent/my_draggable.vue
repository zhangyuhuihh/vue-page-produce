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
        :w="item.dragSize.width + widthHeightPadding"
        :h="item.dragSize.height + widthHeightPadding"
        :minWidth="20"
        :minHeight="20"
        @dragstop="onDragStop"
        @resizestop="onResizeStop"
        @activated="onActivated(item)"
        @deactivated="onDeActivated(item)"
      >
        <div style="width: 100%; height: 100%; padding: 5px">
          <!-- 这边的padding,决定了widthHeightPadding的大小 -->
          <component
            @contextmenu.prevent.native="openMenu($event, item)"
            :is="item.componentKey"
            :uuid="item.uuid"
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

import TestComponentOne from './components/testComponents/testComponentOne'
import TestComponentTwo from './components/testComponents/testComponentTwo'
import TestComponentThree from './components/testComponents/testComponentThree'
import TitleChildOne from './components/title/TitleChildOne/index'
import TitleChildTwo from './components/title/TitleChildTwo/index'
import ScrollBoardChildOne from './components/scrollBoard/ScrollBoardChildOne'
import LineChartChildOne from './components/lineChart/lineChartChildOne/index'
import PieChartChildOne from './components/pieChart/pieChartChildOne/index'
import BarChartChildOne from './components/barChart/barChartChildOne/index'
export default {
  name: 'myDraggable',
  components: {
    VueDraggableResizable,
    TestComponentOne,
    TestComponentTwo,
    TestComponentThree,
    TitleChildOne,
    TitleChildTwo,
    ScrollBoardChildOne,
    LineChartChildOne,
    PieChartChildOne,
    BarChartChildOne
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
    ]),
    disTanceMagnificition() {
      return this.magnification / 100
    }
  },

  created() {},
  methods: {
    ...mapActions('partComponent', [
      'setActivedWidget',
      'updateWidgetDragPos',
      'updateWidgetDragSize',
      'removeActivedWidget'
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
        width: width - this.widthHeightPadding,
        height: height - this.widthHeightPadding,
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

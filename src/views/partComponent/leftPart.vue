<template>
  <div class="left_part_container">
    <div>
      <el-collapse>
        <template v-for="(item, key) in allCollapseParent">
          <el-collapse-item
            :title="item.componentDescription.name"
            :name="item.componentDescription.name"
            :key="item.componentDescription.name"
          >
            <div class="block_container">
              <template v-for="item2 in allCollapseChild[key]">
                <div
                  class="cell_container"
                  :id="item2.componentDescription.name"
                  :key="item2.componentDescription.name"
                  @mousedown.stop.prevent="(e) => elementDown(e, item2)"
                >
                  <div class="img_container">
                    <img
                      :src="require(`./images/${item2.componentDescription.img}`)"
                      style="width:100%;height:100%"
                    />
                  </div>
                  <div>{{item2.componentDescription.name}}</div>
                </div>
              </template>
            </div>
          </el-collapse-item>
        </template>
      </el-collapse>
    </div>
    <div>
      <Layer></Layer>
    </div>
    <fake-drag-dom
      :visible="isVisible"
      :img="fakeDomImgUrl"
      :top="fakedragtop"
      :left="fakedragleft"
      :width="fakedragWidth"
      :height="fakedragHeight"
    ></fake-drag-dom>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as widgetParent from './widget.js'
import * as widgetChild from './components/all_class'
import { ulid } from 'ulid' // 生成uuid
import _ from 'lodash'
import Layer from './layer'
import FakeDragDom from './construction/Fake_drag_dom'
import { addEvent, removeEvent, pauseEvent } from '@/util/events_fn.js'

const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  }
}

let startLeftPos = ''
let startTopPos = ''

let startMousePosX = ''
let startMousePosY = ''

let eventsFor = events.mouse

export default {
  components: {
    Layer,
    FakeDragDom
  },
  data() {
    return {
      allCollapseParent: null,
      allCollapseChild: null,
      isVisible: false,
      currentMoveEl: null,
      fakeDomImgUrl: '',
      fakedragtop: 0,
      fakedragleft: 0,
      fakedragWidth: 100,
      fakedragHeight: 80,
      mouseClickPosition: { mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0 }
    }
  },
  computed: {
    ...mapState('partComponent', ['magnification', 'bigScreenRatio']),
    dragCenter() {
      return [this.fakedragWidth / 2, this.fakedragHeight / 2]
    },

    disTanceMagnificition() {
      return this.magnification / 100
    }
  },
  mounted() {
    this.allCollapseParent = _.pickBy(widgetParent, (value, key) => {
      return value.componentDescription.parent === 'widget'
    })
    this.allCollapseChild = _.groupBy(widgetChild, value => {
      return value.componentDescription.parent
    })
  },
  methods: {
    ...mapActions('partComponent', ['addWidget', 'setActivedWidget']),

    elementDown(e, item) {
      pauseEvent(e)
      this.isVisible = true
      this.currentMoveEl = item
      this.fakeDomImgUrl = item.componentDescription.img

      startMousePosX = e.touches ? e.touches[0].pageX : e.pageX
      startMousePosY = e.touches ? e.touches[0].pageY : e.pageY

      startLeftPos = startMousePosX
      startTopPos = startMousePosY

      this.fakedragleft = startMousePosX - this.dragCenter[0]
      this.fakedragtop = startMousePosY - this.dragCenter[1]

      addEvent(document.documentElement, eventsFor.move, this.move)
      addEvent(document.documentElement, eventsFor.stop, this.handleUp)
    },

    move(e) {
      pauseEvent(e)
      this.fakedragleft =
        startLeftPos +
        ((e.touches ? e.touches[0].pageX : e.pageX) - startMousePosX) -
        this.dragCenter[0]
      this.fakedragtop =
        startTopPos +
        ((e.touches ? e.touches[0].pageY : e.pageY) - startMousePosY) -
        this.dragCenter[1]
    },

    handleUp(e) {
      this.isVisible = false
      this.fakedragleft = 0
      this.fakedragtop = 0
      this.calculateElInitPos(e)
      removeEvent(document.documentElement, eventsFor.move, this.move)
      removeEvent(document.documentElement, eventsFor.stop, this.handleUp)
    },

    calculateElInitPos(e) {
      let editMainBoxDom = document.getElementById('editMainBox')
      let domDistance = editMainBoxDom.getBoundingClientRect()

      let EditAreaX = parseInt(domDistance.left)
      let EditAreaY = parseInt(domDistance.top)

      let EditAreaRightX = parseInt(domDistance.right)
      let EditAreaBottomY = parseInt(domDistance.bottom)

      // 经过测验 dom.left = e.clientX
      let elPosX = (e.clientX - EditAreaX) / this.disTanceMagnificition
      let elPosY = (e.clientY - EditAreaY) / this.disTanceMagnificition

      let El = this.currentMoveEl

      let oneWidget = new El({
        uuid: ulid(),
        type: 'add',
        initDragPosition: {
          x: elPosX,
          y: elPosY
        }
      })

      let isInArea = this.judgeIsInEditArea(
        e.clientX,
        EditAreaX,
        e.clientY,
        EditAreaY
      )
      // 拖到指定编辑区域再进行数据添加
      if (isInArea) {
        let widgetWidth = oneWidget.dragSize.width
        let widgetHeight = oneWidget.dragSize.height
        // 当鼠标位置加上元素位置超出编辑区域的时候，进行位置修正
        if (
          (EditAreaRightX - e.clientX) / this.disTanceMagnificition <
          widgetWidth
        ) {
          oneWidget.dragPosition.x = this.bigScreenRatio.width - widgetWidth - 2
        }
        if (
          (EditAreaBottomY - e.clientY) / this.disTanceMagnificition <
          widgetHeight
        ) {
          oneWidget.dragPosition.y =
            this.bigScreenRatio.height - widgetHeight - 2
        }
        this.addWidget(oneWidget)
        this.setActivedWidget(oneWidget.uuid)
      }
    },

    judgeIsInEditArea(clientX, EditAreaX, clientY, EditAreaY) {
      return (
        clientX - EditAreaX > 0 &&
        (clientX - EditAreaX) / this.disTanceMagnificition <
          this.bigScreenRatio.width &&
        clientY - EditAreaY > 0 &&
        (clientY - EditAreaY) / this.disTanceMagnificition <
          this.bigScreenRatio.height
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.left_part_container {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0px 5px 12px #777777;
  position: relative;
  z-index: 99;
  .block_container {
    display: flex;
    flex-wrap: wrap;
    .cell_container {
      width: 70px;
      cursor: pointer;
      height: 80px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .img_container {
        width: 50px;
        height: 50px;
      }
    }
  }

  // display: flex;
  // flex-wrap: wrap;
}
</style>

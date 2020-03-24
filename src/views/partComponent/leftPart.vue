<template>
  <div class="left_part_container">
    <div class="left_part_top_choose">
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
                    <img :src="require(`./images/${item2.componentDescription.img}`)" />
                  </div>
                  <div>{{item2.componentDescription.name}}</div>
                </div>
              </template>
            </div>
          </el-collapse-item>
        </template>
      </el-collapse>
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
  // width: 100%;
  height: 100%;
  .left_part_top_choose {
    height: calc(100% - 50px);
    padding-left: 10px;
    padding-right: 10px;
    // background-color: #20212C;
    // box-shadow: 0px 5px 12px #777777;
    position: relative;
    z-index: 99;
    margin-right: -20px;
    overflow-y: scroll;
    .block_container {
      display: flex;
      flex-wrap: wrap;
      padding-top: 20px;
      color: rgb(182, 184, 204);
      .cell_container {
        width: 100%;
        cursor: pointer;
        height: 135px;
        display: flex;
        align-items: center;
        flex-direction: column;
        .img_container {
          width: 150px;
          padding: 6px;
          height: 110px;
          img {
            border-radius: 5px;
            width: 100%;
            height: 100%;
          }
        }
      }
      .img_container :hover {
        border: 1px solid #335ae9;
      }
    }
  }

  .bottom_layer {
    height: 50px;
    width: 200px;
    left: 0px;
    position: absolute;
    bottom: 0;
    text-align: center;
    line-height: 50px;
    color: rgb(182, 184, 204);
    border-top: 2px solid rgb(182, 184, 204);
    cursor: pointer;
    .bottom_layer_contaniner {
      position: absolute;
      bottom: 0px;
      left: 206px;
      width: 200px;
      height: calc(100vh - 52px);
      background-color: #2c2e3f;
      z-index: 99;
      overflow-y: auto;
      border-radius: 5px;
    }
  }

  /deep/ .el-collapse-item__header {
    // width: 139px;
    background-color: #2c2e3f;
    color: rgb(182, 184, 204);
    border-bottom: 2px solid #20212c;
  }

  /deep/ .el-collapse {
    border-top: none;
    border-bottom: none;
  }

  /deep/ .el-collapse-item__wrap {
    border-bottom: none;
    background-color: #20212b;
  }

  // display: flex;
  // flex-wrap: wrap;
}
</style>

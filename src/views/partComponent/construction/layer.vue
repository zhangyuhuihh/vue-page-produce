<template>
  <div class="draggable_container">
    <div class="draggable_lay_top">
      <el-tooltip popper-class="top_pop_class" effect="dark" content="置顶" placement="top">
        <div class="lay_icon_cell tool_tip_hover">
          <i @click="setTop" class="el-icon-upload2" style="opacity: 0.5" />
        </div>
      </el-tooltip>
      <el-tooltip popper-class="top_pop_class" effect="dark" content="置底" placement="top">
        <div class="lay_icon_cell tool_tip_hover">
          <i @click="setBottom" class="el-icon-download" style="opacity: 0.5" />
        </div>
      </el-tooltip>
      <el-tooltip popper-class="top_pop_class" effect="dark" content="上移一层" placement="top">
        <div class="lay_icon_cell tool_tip_hover">
          <i @click="setUpOneStep" class="el-icon-top" style="opacity: 0.5" />
        </div>
      </el-tooltip>
      <el-tooltip popper-class="top_pop_class" effect="dark" content="下移一层" placement="top">
        <div class="lay_icon_cell tool_tip_hover">
          <i @click="setDownOneStep" class="el-icon-bottom" style="opacity: 0.5" />
        </div>
      </el-tooltip>
    </div>
    <div class="draggable_lay_middle">
      <draggable v-model="draggableList">
        <transition-group name="flip-list">
          <div
            @click="setActivedWidget(element.uuid)"
            v-for="element in draggableList"
            :key="element.uuid"
          >
            <div
              class="lay_cell"
              :style="{
                backgroundColor: element.uuid === activedWidget.uuid ? '#2483FF' : ''
              }"
            >{{element.componentKey + '_' + element.uuid.substr(element.uuid.length - 4, 4)}}</div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <div class="draggable_lay_bottom">
      <el-tooltip popper-class="top_pop_class" effect="dark" content="删除" placement="bottom">
        <div class="lay_icon_cell tool_tip_hover">
          <i @click="handleRemove" class="el-icon-delete" />
        </div>
      </el-tooltip>
      <!-- <el-tooltip popper-class="top_pop_class" effect="dark" content="隐藏" placement="bottom">
        <div class="lay_icon_cell tool_tip_hover">
          <i class="el-icon-download" />
        </div>
      </el-tooltip>-->
      <el-tooltip popper-class="top_pop_class" effect="dark" content="上锁" placement="bottom">
        <div class="lay_icon_cell tool_tip_hover">
          <i v-if="isLocked" @click="doLock('unlock')" class="el-icon-lock" />
          <i v-else @click="doLock('lock')" class="el-icon-unlock" />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import _ from 'lodash'
export default {
  components: {
    draggable
  },
  data() {
    return {
      draggableList: []
    }
  },
  computed: {
    ...mapState('partComponent', ['widgetList', 'activedWidgetUUID']),
    ...mapGetters('partComponent', ['activedWidget']),
    isLocked() {
      if (!_.isEmpty(this.activedWidget)) {
        const { draggable, resizable } = this.activedWidget.dragSitutation
        return !(draggable && resizable)
      }
      return false
    }
  },
  watch: {
    draggableList(newValue, olaValue) {
      let arr = newValue.map((v, index) => {
        return {
          uuid: v.uuid,
          z: 1990 - index
        }
      })
      this.updateWidgetZIndex(arr)
    },
    widgetList: {
      handler: function(newValue, oldValue) {
        if (newValue.length !== this.draggableList.length) {
          const arr = newValue.map(v => {
            return {
              uuid: v.uuid,
              componentKey: v.componentKey,
              z: v.dragPosition.z
            }
          })
          this.draggableList = arr.sort((a, b) => {
            // 如果a.z === b.z，那么说明这两条数据是直接加进去的，所以要换位置
            if (a.z === b.z) {
              return -1
            } else {
              return b.z - a.z
            }
          })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions('partComponent', [
      'updateWidgetZIndex',
      'setActivedWidget',
      'removeWidget',
      'updateWidgetSitutation'
    ]),

    setTop() {
      const id = this.activedWidgetUUID
      let arr = []
      for (let i = 0; i < this.draggableList.length; i++) {
        let element = this.draggableList[i]
        if (element.uuid === id) {
          arr.unshift({ ...element })
        } else {
          arr.push({ ...element })
        }
      }
      this.draggableList = arr
    },

    setBottom() {
      const id = this.activedWidgetUUID
      let arr = []
      let last
      for (let i = 0; i < this.draggableList.length; i++) {
        let element = this.draggableList[i]
        if (element.uuid === id) {
          last = { ...element }
        } else {
          arr.push({ ...element })
        }
      }
      this.draggableList = arr.concat([last])
    },

    setUpOneStep() {
      const id = this.activedWidgetUUID
      let arr = [...this.draggableList]
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].uuid === id) {
          if (i > 0) {
            let temp = arr[i - 1]
            arr[i - 1] = arr[i]
            arr[i] = temp
            break
          }
        }
      }
      this.draggableList = arr
    },

    setDownOneStep() {
      const id = this.activedWidgetUUID
      let arr = [...this.draggableList]
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].uuid === id) {
          if (i < arr.length - 1) {
            let temp = arr[i + 1]
            arr[i + 1] = arr[i]
            arr[i] = temp
            break
          }
        }
      }
      this.draggableList = arr
    },

    handleRemove() {
      this.removeWidget(this.activedWidgetUUID)
    },

    doLock(v) {
      if (v === 'lock') {
        this.updateWidgetSitutation({
          uuid: this.activedWidgetUUID,
          dragSitutation: {
            draggable: false,
            resizable: false
          }
        })
      }
      if (v === 'unlock') {
        this.updateWidgetSitutation({
          uuid: this.activedWidgetUUID,
          dragSitutation: {
            draggable: true,
            resizable: true
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.draggable_container {
  .draggable_lay_top {
    width: 100%;
    height: 30px;
    border-bottom: 2px solid #0e0f14;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #ffffff;
  }
  .draggable_lay_middle {
    margin-top: 10px;
    color: #ffffff;
    opacity: 0.9;
    .lay_cell {
      font-size: 14px;
      padding-left: 20px;
      height: 50px;
      line-height: 50px;
    }
  }
  .draggable_lay_bottom {
    width: 100%;
    height: 30px;
    color: #ffffff;
    position: absolute;
    bottom: 0;
    border-top: 2px solid #0e0f14;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .lay_icon_cell {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>>

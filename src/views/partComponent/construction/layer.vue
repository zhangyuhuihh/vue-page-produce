<template>
  <div class="draggable_container">
    <div class="draggable_lay_top">
      <span><i class="el-icon-upload2" /></span>
      <span><i class="el-icon-download" /></span>
      <span><i class="el-icon-top" /></span>
      <span><i class="el-icon-bottom" /></span>
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
      <span><i class="el-icon-delete" /></span>
      <span><i class="el-icon-download" /></span>
      <span><i class="el-icon-lock" /></span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    ...mapState('partComponent', ['widgetList', 'activedWidget'])
  },
  watch: {
    draggableList(newValue, olaValue) {
      let arr = newValue.map((v, index) => {
        return {
          uuid: v.uuid,
          z: 999 - index
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

          if (newValue.length > this.draggableList.length) {
            let arr2 = arr.slice(0, arr.length - 1) // 不包括end
            this.draggableList = arr2
            this.draggableList.unshift(_.last(newValue))
            return
          }
          this.draggableList = arr
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('partComponent', ['updateWidgetZIndex', 'setActivedWidget'])
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
    opacity: 0.5;
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
    border-top: 2px solid #0E0F14;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>>

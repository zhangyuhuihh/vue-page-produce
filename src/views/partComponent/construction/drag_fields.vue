<template>
  <div class="drag_field_container">
    <div class="drag_field_block">
      <span>宽：</span>
      <el-input-number
        :value="width"
        @input="handleWidthInput"
        @change="handleChange"
        controls-position="right"
        size="small"
        :min="20"
        :max="maxWidth"
      ></el-input-number>
    </div>
    <div class="drag_field_block">
      <span>高：</span>
      <el-input-number
        :value="height"
        @input="handleHeightInput"
        @change="handleChange"
        controls-position="right"
        size="small"
        :min="20"
        :max="maxHeight"
      ></el-input-number>
    </div>
    <div class="drag_field_block">
      <span>X ：</span>
      <el-input-number
        :value="x"
        @input="handleXInput"
        @change="handleChange"
        controls-position="right"
        size="small"
        :min="0"
        :max="maxX"
      ></el-input-number>
    </div>
    <div class="drag_field_block">
      <span>Y ：</span>
      <el-input-number
        :value="y"
        @input="handleYInput"
        @change="handleChange"
        controls-position="right"
        size="small"
        :min="0"
        :max="maxY"
      ></el-input-number>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('partComponent', ['bigScreenRatio', 'activedWidgetUUID']),
    ...mapGetters('partComponent', ['activedWidget']),
    uuid() {
      return this.activedWidgetUUID
    },
    width() {
      if (!_.isEmpty(this.activedWidget)) {
        return parseInt(this.activedWidget.dragSize.width)
      }
      return 0
    },
    height() {
      if (!_.isEmpty(this.activedWidget)) {
        return parseInt(this.activedWidget.dragSize.height)
      }
      return 0
    },
    x() {
      if (!_.isEmpty(this.activedWidget)) {
        return parseInt(this.activedWidget.dragPosition.x)
      }
      return 0
    },
    y() {
      if (!_.isEmpty(this.activedWidget)) {
        return parseInt(this.activedWidget.dragPosition.y)
      }
      return 0
    },
    maxWidth() {
      return parseInt(this.bigScreenRatio.width - this.x)
    },
    maxHeight() {
      return parseInt(this.bigScreenRatio.height - this.y)
    },
    maxX() {
      return parseInt(this.bigScreenRatio.width - this.width)
    },
    maxY() {
      return parseInt(this.bigScreenRatio.height - this.height)
    }
  },
  methods: {
    ...mapActions('partComponent', [
      'updateWidgetDragPos',
      'updateWidgetDragSize',
      'setMemoryForBackForward'
    ]),

    handleWidthInput(v) {
      this.updateWidgetDragSize({
        uuid: this.uuid,
        width: v,
        height: this.height
      })
    },

    handleHeightInput(v) {
      this.updateWidgetDragSize({
        uuid: this.uuid,
        width: this.width,
        height: v
      })
    },

    handleXInput(v) {
      this.updateWidgetDragPos({
        x: v,
        y: this.y,
        uuid: this.uuid
      })
    },

    handleYInput(v) {
      this.updateWidgetDragPos({
        x: this.x,
        y: v,
        uuid: this.uuid
      })
    },

    handleChange() {
      // change事件，在:value改变的时候是不会触发的
      // 这个的监听事件是用来单独记录后退前进的状态
      this.setMemoryForBackForward()
    }
  }
}
</script>

<style lang="scss" scoped>
.drag_field_container {
  .drag_field_block {
    margin-top: 10px;
  }
}
</style>

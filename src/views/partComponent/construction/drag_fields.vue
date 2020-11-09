<template>
  <div class="drag_field_container">
    <div class="drag_field_size">
      <div class="field_size_txt">尺寸</div>
      <div class="field_size_wrapper">
        <span class="field_size_wrapper_label_w">宽</span>
        <el-input-number
          :value="width"
          @input="handleWidthInput"
          @change="handleChange"
          controls-position="right"
          size="small"
          :min="20"
          :max="maxWidth"
        ></el-input-number>
        <span class="field_size_wrapper_label_h">高</span>
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
    </div>
    <div class="drag_field_size">
      <div class="field_size_txt">位置</div>
      <div class="field_size_wrapper ">
        <span class="field_size_wrapper_label_w">X</span>
        <el-input-number
          :value="x"
          @input="handleXInput"
          @change="handleChange"
          controls-position="right"
          size="small"
          :min="0"
          :max="maxX"
        ></el-input-number>
        <span class="field_size_wrapper_label_h">Y</span>
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
  .field_size_wrapper {
    position: relative;
    margin-top: 10px;
    /deep/ .el-input .el-input--small {
      width: 115px;
    }
    /deep/ .el-input-number--small {
      position: relative;
      margin-right: 8px;
    }
    /deep/ .el-input--small .el-input__inner {
      border-radius: 0;
      color: #fff;
      background: rgba(14, 15, 20, 1);
      border: none;
      height: 24px;
      line-height: 24px;
      text-align: left;
    }
    /deep/ .el-input-number__decrease {
      color: #fff;
      bottom: 3.5px;
      opacity: 0.5;
      width: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 11px;
      background: rgba(14, 15, 20, 1);
      border: 1px solid rgba(40, 48, 59, 1);
    }
    /deep/ .el-input-number__increase {
      color: #fff;
      opacity: 0.5;
      top: 3.5px;
      width: 16px;
      height: 11px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(14, 15, 20, 1);
      border: 1px solid rgba(40, 48, 59, 1);
    }
    .field_size_wrapper_label_w {
      position: absolute;
      left: 85px;
      top: 4px;
      z-index: 999;
    }
    .field_size_wrapper_label_h {
      position: absolute;
      left: 224px;
      top: 4px;
      z-index: 999;
    }
  }
}
</style>

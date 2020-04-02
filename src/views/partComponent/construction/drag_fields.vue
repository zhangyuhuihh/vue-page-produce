<template>
  <div>
    <div>
      <span>宽：</span>
      <el-input-number
        :value="width"
        @input="handleWidthInput"
        @change="handleChange"
        controls-position="right"
        size="small"
        :min="20"
        :max="1920"
      ></el-input-number>
    </div>
    <div>
      <span>高：</span>
      <el-input-number
        :value="height"
        @input="handleHeightInput"
        @change="handleChange"
        controls-position="right"
        size="small"
        :min="20"
        :max="1920"
      ></el-input-number>
    </div>
    <div>
      <span>X：</span>
      <el-input-number
        :value="x"
        @input="handleXInput"
        @change="handleChange"
        controls-position="right"
        size="small"
        :min="0"
        :max="1920"
      ></el-input-number>
    </div>
    <div>
      <span>Y：</span>
      <el-input-number
        :value="y"
        @input="handleYInput"
        @change="handleChange"
        controls-position="right"
        size="small"
        :min="0"
        :max="1920"
      ></el-input-number>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data() {
    return {
      // width: 0,
      // height: 0
    }
  },
  computed: {
    ...mapState('partComponent', ['bigScreenRatio', 'activedWidgetUUID']),
    ...mapGetters('partComponent', ['activedWidget']),
    uuid() {
      return this.activedWidgetUUID
    },
    width() {
      if (!_.isEmpty(this.activedWidget)) {
        return this.activedWidget.dragSize.width
      }
      return 0
    },
    height() {
      if (!_.isEmpty(this.activedWidget)) {
        return this.activedWidget.dragSize.height
      }
      return 0
    },
    x() {
      if (!_.isEmpty(this.activedWidget)) {
        return this.activedWidget.dragPosition.x
      }
      return 0
    },
    y() {
      if (!_.isEmpty(this.activedWidget)) {
        return this.activedWidget.dragPosition.y
      }
      return 0
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
      // 这个的监听事件是用来
      this.setMemoryForBackForward()
    }
  }
}
</script>

<style>
</style>

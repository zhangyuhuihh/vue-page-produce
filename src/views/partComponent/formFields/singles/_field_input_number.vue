<template>
  <div class="field_input_number">
    <span>{{ labelData }}</span>
    <div class="input_number_content">
      <span class="number_content_txt">{{ extraLabel }}</span>
      <el-input-number
        :value="modelData"
        @input="handleFieldModelChange"
        controls-position="right"
        size="small"
        :min="min"
        :max="max"
      ></el-input-number>
    </div>

    <div class="error_msg_cell">{{ errorMsg }}</div>
  </div>
</template>

<script>
import fieldMixins from '../field_mixins'
import { mapState } from 'vuex'
export default {
  mixins: [fieldMixins],
  computed: {
    ...mapState('partComponent', ['widgetList']),
    min() {
      return this.currentBindWidget.min
    },
    max() {
      return this.currentBindWidget.max
    },
    extraLabel() {
      return this.currentBindWidget.extraLabel
    }
  }
}
</script>

<style lang="scss" scoped>
.field_input_number {
  position: relative;
  margin-top: 10px;
  .input_number_content {
    display: inline-block;
    margin-left: 20px;
    position: relative;
    /deep/ .el-input .el-input--small {
      width: 125px;
    }
    /deep/ .el-input-number--small {
      margin-right: 10px;
      position: relative;
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
    .number_content_txt {
      position: absolute;
      right: 35px;
      top: 3px;
      z-index: 999;
    }
  }
}
</style>

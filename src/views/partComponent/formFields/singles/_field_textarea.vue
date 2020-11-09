<template>
  <div class="field_textarea_container" v-if="isShow">
    <span>{{ labelData }}</span>
    <el-input
      :value="formateFn(modelData)"
      @input="handleFieldModelChange"
      type="textarea"
      autosize
      class="input_width"
    ></el-input>
    <div class="error_msg_cell">{{ errorMsg }}</div>
  </div>
</template>

<script>
import fieldMixins from '../field_mixins'
import * as formateFns from '../../utils'
export default {
  mixins: [fieldMixins],
  data() {
    return {
      isShow: true,
    }
  },
  computed: {
    formateFn() {
      return formateFns[this.currentBindWidget.formateFn] || ((v) => v)
    },
  },
}
</script>

<style lang="scss" scoped>
.field_textarea_container {
  /deep/ .el-textarea__inner {
    color: #b6b8cc;
    font-weight: bold;
    background-color: #181a1f;
    border: 1px solid hsla(0, 0%, 100%, 0.2);
  }
}
</style>

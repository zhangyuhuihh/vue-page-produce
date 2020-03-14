<template>
  <div class="field_input_container">
    <span>{{labelData}}</span>
    <el-input :value="modelData" @input="handleFieldModelChange" class="input_width"></el-input>
    <div class="error_msg_cell">{{errorMsg}}</div>
  </div>
</template>

<script>
import fieldMixins from './field_mixins'
export default {
  mixins: [fieldMixins]
}
</script>

<style lang="scss" scoped>
.field_input_container {
  height: 60px;
  margin-bottom: 20px;
  position: relative;
  .input_width {
    width: 200px;
    margin-left: 10px;
  }
  .error_msg_cell {
    position: absolute;
    font-size: 12px;
    bottom: 0px;
    left: 41px;
    color: red;
  }
  /deep/ .el-input__inner {
    color: #b6b8cc;
    background-color: #181a1f;
    border: 1px solid hsla(0, 0%, 100%, 0.2);
  }
}
</style>

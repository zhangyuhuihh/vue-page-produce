<template>
  <div class="field_select_container">
    <span>{{labelData}}</span>
    <div class="select_cell">
      <el-select :value="modelData" @input="handleFieldModelChange" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import fieldMixins from './field_mixins'
export default {
  mixins: [fieldMixins],
  computed: {
    options() {
      return this.currentBindWidget.options
    }
  }
}
</script>

<style lang="scss" scoped>
.field_select_container {
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  .select_cell {
    width: 180px;
    margin-left: 10px;
  }
  /deep/ .el-input__inner {
    color: #b6b8cc;
    background-color: #181a1f;
    border: 1px solid hsla(0, 0%, 100%, 0.2);
  }
}
</style>

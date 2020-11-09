<template>
  <div class="field_select_container">
    <span class="label">{{ labelData }}</span>
    <div class="select_cell">
      <el-select
        popper-class="select_wrapper"
        :value="modelData"
        @input="handleFieldModelChange"
        placeholder="请选择"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import fieldMixins from '../field_mixins'
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
  .label {
    color: $color-white-9;
  }
  .select_cell {
    width: 180px;
    margin-left: 10px;
  }
  /deep/ .el-input__inner {
    width: 112px;
    height: 24px;
    color: #b6b8cc;
    background: rgba(14, 15, 20, 1);
    border: none;
  }
  /deep/ .el-input__suffix {
    // top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
<style lang="scss">
.select_wrapper {
  border: 1px solid rgba(40, 48, 59, 1);
  background: rgba(14, 15, 20, 1);

  .el-select-dropdown__list {
    background: rgba(14, 15, 20, 1);
  }
  .el-select-dropdown__item.selected {
    color: #2b5182;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: #2b5182;
    color: #fff;
  }
  .popper__arrow {
    display: none;
  }
}
</style>

<template>
  <div class="color_picker_container">
    <span class="label">{{ labelData }}</span>
    <div class="color_cell">
      <el-color-picker
        :value="modelData"
        @active-change="handleFieldModelChange"
      ></el-color-picker>
    </div>
  </div>
</template>

<script>
import fieldMixins from '../field_mixins'
export default {
  mixins: [fieldMixins]
}
</script>

<style lang="scss" scoped>
.color_picker_container {
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  .label {
    color: $color-white-9;
  }
  .color_cell {
    margin-left: 10px;
  }
}
</style>

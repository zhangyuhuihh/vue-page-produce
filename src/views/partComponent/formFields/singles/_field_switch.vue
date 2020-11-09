<template>
  <div class="picker_container">
    <span class="lable">{{ labelData }}</span>
    <el-switch :value="value" @change="handleFieldModelChange"> </el-switch>
    <div>{{ errorMsg }}</div>
  </div>
</template>

<script>
import fieldMixins from '../field_mixins'
export default {
  mixins: [fieldMixins],
  computed: {
    value() {
      return this.currentBindWidget.formModel
    }
  }
}
</script>

<style lang="scss" scoped>
.picker_container {
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  .lable {
    margin-right: 10px;
    color: $color-white-9;
  }
}
</style>

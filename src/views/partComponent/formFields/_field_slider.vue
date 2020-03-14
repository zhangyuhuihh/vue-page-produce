<template>
  <div class="picker_container">
    <span class="lable">{{ labelData }}</span>
    <el-input-number
      :value="num"
      @change="handleFieldModelChange"
      :min="min"
      :max="max"
      size="small"
    ></el-input-number>
  </div>
</template>

<script>
import fieldMixins from './field_mixins'

export default {
  name: 'FieldSlider',
  mixins: [fieldMixins],
  computed: {
    num() {
      return Number(this.currentBindWidget.formModel)
    },
    min() {
      return Number(this.currentBindWidget.min)
    },
    max() {
      return Number(this.currentBindWidget.max)
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
  }
}
</style>

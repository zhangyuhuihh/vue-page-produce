<template>
  <div class="field_radio_container">
    <span>{{ labelData }}</span>
    <el-radio-group :value="modelData" @input="handleFieldModelChange">
      <el-radio :key="item.value" v-for="item in radios" :label="item.value">{{
        item.label
      }}</el-radio>
    </el-radio-group>
    <div>{{ errorMsg }}</div>
  </div>
</template>

<script>
import fieldMixins from '../field_mixins'
export default {
  mixins: [fieldMixins],
  computed: {
    radios() {
      return this.currentBindWidget.radios
    },
  },
}
</script>
<style lang="scss" scoped>
.field_radio_container {
  height: 20px;
  margin-bottom: 10px;
}
</style>

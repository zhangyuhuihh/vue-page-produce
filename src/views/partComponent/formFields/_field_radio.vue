<template>
  <div>
    <span>{{labelData}}</span>
    <el-radio-group :value="modelData" @input="handleFieldModelChange">
      <el-radio :key="item.value" v-for="item in radios" :label="item.value">{{item.label}}</el-radio>
    </el-radio-group>
    <div>{{errorMsg}}</div>
  </div>
</template>

<script>
import fieldMixins from './field_mixins'
export default {
  mixins: [fieldMixins],
  computed: {
    radios() {
      return this.currentBindWidget.radios
    }
  }
}
</script>

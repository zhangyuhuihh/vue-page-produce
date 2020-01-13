<template>
  <div>
    <span>{{labelData}}</span>
    <el-select :value="modelData" @input="handleFieldModelChange" placeholder="请选择">
      <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
    </el-select>
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

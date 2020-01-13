<template>
  <div>
    <span>选择颜色</span>
    <el-color-picker :value="modelData" @active-change="handleFieldModelChange"></el-color-picker>
  </div>
</template>

<script>
import fieldMixins from './field_mixins'
export default {
  mixins: [fieldMixins]
}
</script>

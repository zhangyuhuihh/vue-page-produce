<template>
  <div class="field_select_container">
    <span>{{labelData}}</span>
    <div class="select_cell">
      <el-select :value="modelData" @input="handleFieldModelChange" placeholder="请选择">
        <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
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
    margin-left: 10px
  }
}
</style>

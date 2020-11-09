<template>
  <div class="field_radio_container">
    <span>{{ labelData }}</span>
    <el-radio-group :value="modelData.type" @input="handleTypeFieldModelChange">
      <el-radio
        :key="item.value"
        v-for="item in selections"
        :label="item.value"
        >{{ item.label }}</el-radio
      >
    </el-radio-group>
    <template v-for="(item, index) in selections">
      <el-input
        :key="item.value"
        v-show="modelData.type === item.value"
        :type="item.inputType"
        v-model="currentInputData[index].inputData"
        @change="doInputChange"
        class="input_width"
      ></el-input>
    </template>
    <div>{{ errorMsg }}</div>
  </div>
</template>

<script>
import fieldMixins from '../field_mixins'
export default {
  mixins: [fieldMixins],
  data() {
    return {
      currentInputData: {},
    }
  },
  created() {
    console.log('modelData: ', this.modelData)
    this.currentInputData = this.selections.map((item) => {
      if (item.value === this.modelData.type) {
        return {
          key: item.value,
          inputData: this.modelData.value,
        }
      }
      return {
        key: item.value,
        inputData: '',
      }
    })
  },
  computed: {
    selections() {
      return this.currentBindWidget.selections
    },
  },
  mounted() {},
  methods: {
    handleTypeFieldModelChange(v) {
      this.fieldsChange({
        uuid: this.uuid,
        fieldType: this.fieldType,
        fieldKey: this.fieldKey,
        fieldValue: {
          type: v,
          value: this.currentInputData.find((it) => it.key === v).inputData,
        },
      })
      if (this.memorable) {
        this.setMemoryForBackForward()
      }
    },

    doInputChange(v) {
      this.fieldsChange({
        uuid: this.uuid,
        fieldType: this.fieldType,
        fieldKey: this.fieldKey,
        fieldValue: {
          type: this.modelData.type,
          value: v,
        },
      })
      if (this.memorable) {
        this.setMemoryForBackForward()
      }
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

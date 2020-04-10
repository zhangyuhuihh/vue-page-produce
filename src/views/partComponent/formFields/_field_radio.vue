<template>
  <div class="field_radio_container">
    <span>{{labelData}}</span>
    <el-radio-group :value="modelData" @input="handleFieldModelChange" @change="handleChange">
      <el-radio :key="item.value" v-for="item in radios" :label="item.value">{{item.label}}</el-radio>
    </el-radio-group>
    <div>{{errorMsg}}</div>
  </div>
</template>

<script>
import fieldMixins from './field_mixins'
import fieldEventsMixins from './field_events_mixin'
export default {
  mixins: [fieldMixins, fieldEventsMixins],
  computed: {
    radios() {
      return this.currentBindWidget.radios
    },
    emitEventsChange() {
      return this.emitEvents.find(v => v.type === 'change') || null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$EventBus.$emit(
        this.emitEventsChange.eventName,
        this.emitEventsChange.initValue
      )
    })
  },
  methods: {
    handleChange(value) {
      this.$EventBus.$emit(this.emitEventsChange.eventName, value)
    }
  }
}
</script>
<style lang="scss" scoped>
.field_radio_container {
  height: 20px;
  margin-bottom: 10px;
}
</style>

<template>
  <div class="scroll-borad-container">
    <ScrollBoard :config="mergedConfig" />
  </div>
</template>

<script>
import ScrollBoard from './main'
import componentsMixins from '../../components_mixins'

export default {
  name: 'ScrollBoardChildOne',
  mixins: [componentsMixins],
  components: {
    ScrollBoard
  },
  computed: {
    fakeData() {
      return JSON.parse(this.fields.fakeData.formModel)
    },
    headerBGC() {
      return this.styleFields.headerBGC.formModel
    },
    oddRowBGC() {
      return this.styleFields.oddRowBGC.formModel
    },
    evenRowBGC() {
      return this.styleFields.evenRowBGC.formModel
    },
    headerColor() {
      return this.styleFields.headerColor.formModel
    },
    bodyColor() {
      return this.styleFields.bodyColor.formModel
    },
    headerFontSize() {
      return this.styleFields.headerFontSize.formModel
    },
    bodyFontSize() {
      return this.styleFields.bodyFontSize.formModel
    },
    index() {
      return this.styleFields.index.formModel
    },
    rowNum() {
      return this.styleFields.rowNum.formModel
    },
    mergedConfig() {
      const {
        fakeData,
        headerBGC,
        oddRowBGC,
        evenRowBGC,
        headerColor,
        bodyColor,
        headerFontSize,
        bodyFontSize,
        index,
        rowNum
      } = this

      return {
        ...fakeData,
        headerBGC,
        oddRowBGC,
        evenRowBGC,
        headerColor,
        bodyColor,
        headerFontSize,
        bodyFontSize,
        index,
        rowNum
      }
    }
  }
}
</script>

<style scoped>
.scroll-borad-container {
  font-size: 40px;
}
</style>

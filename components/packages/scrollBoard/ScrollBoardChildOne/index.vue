<template>
  <div class="scroll-borad-container">
    <ScrollBoard
      :config="mergedConfig"
      :style="`width: ${currentWidth}px; height: ${currentHeight}px`"
    />
  </div>
</template>

<script>
import ScrollBoard from './main'
import componentsMixins from '../../components_mixins'
export default {
  props: ['dragSize'],
  name: 'ScrollBoardChildOne',
  mixins: [componentsMixins],
  components: {
    ScrollBoard,
  },
  data() {
    return {
      currentWidth: 500,
      currentHeight: 220,
      fakeData: {},
    }
  },
  mounted() {
    console.log(this)
  },
  watch: {
    dragSize: {
      handler(newVal) {
        const { width, height } = newVal
        if (width && height) {
          this.currentWidth = width
          this.currentHeight = height
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    reactToFieldsChange(newData) {
      if (newData) {
        this.fakeData = JSON.parse(newData)
      }
    },
  },
  computed: {
    /**
     * 数据
     * */
    // fakeData() {
    //   if (this.realDataToShow) {
    //     return JSON.parse(this.realDataToShow)
    //   } else {
    //     return JSON.parse(this.fields.dataSource.formModel.valueToShow)
    //   }
    // },
    /**
     * 全局样式
     * */
    rowNum() {
      return this.styleFields.rowNum.formModel
    },
    columnTextAlign() {
      return this.styleFields.columnTextAlign.formModel
    },
    // rowHeight() {
    //   return this.styleFields.rowHeight.formModel
    // },
    // colWidth() {
    //   return this.styleFields.colWidth.formModel
    // },
    bodyFontSize() {
      return this.styleFields.bodyFontSize.formModel
    },
    bodyColor() {
      return this.styleFields.bodyColor.formModel
    },
    bodyFontFamily() {
      return this.styleFields.bodyFontFamily.formModel
    },
    isCarousel() {
      return this.styleFields.isCarousel.formModel
    },
    singleCarousel() {
      return this.styleFields.singleCarousel.formModel
    },
    waitTime() {
      return this.styleFields.waitTime.formModel
    },
    carousel() {
      return this.styleFields.carousel.formModel
    },
    /**
     * 表头样式
     * */
    headerHeight() {
      return this.styleFields.headerHeight.formModel
    },
    headerBGC() {
      return this.styleFields.headerBGC.formModel
    },
    headerTextAlign() {
      return this.styleFields.headerTextAlign.formModel
    },
    headerColor() {
      return this.styleFields.headerColor.formModel
    },
    headerFontSize() {
      return this.styleFields.headerFontSize.formModel
    },
    headerFontFamily() {
      return this.styleFields.headerFontFamily.formModel
    },
    /**
     * 行配置样式
     * */
    oddRowBGC() {
      return this.styleFields.oddRowBGC.formModel
    },
    evenRowBGC() {
      return this.styleFields.evenRowBGC.formModel
    },
    /**
     * 序列号样式
     * */
    index() {
      return this.styleFields.index.formModel
    },
    indexBGC() {
      return this.styleFields.indexBGC.formModel
    },
    indexColWidth() {
      return this.styleFields.indexColWidth.formModel
    },
    indexWidth() {
      return this.styleFields.indexWidth.formModel
    },
    indexHeight() {
      return this.styleFields.indexHeight.formModel
    },
    indexPadding() {
      return this.styleFields.indexPadding.formModel
    },
    indexFontSize() {
      return this.styleFields.indexFontSize.formModel
    },
    indexColor() {
      return this.styleFields.indexColor.formModel
    },
    indexBDRadius() {
      return this.styleFields.indexBDRadius.formModel
    },
    indexHeader() {
      return this.styleFields.indexHeader.formModel
    },
    /**
     * 自定义列样式
     * */
    mergedConfig() {
      const {
        fakeData,

        rowNum,
        columnTextAlign,
        // rowHeight,
        // colWidth,
        bodyFontSize,
        bodyColor,
        bodyFontFamily,
        isCarousel,
        singleCarousel,
        waitTime,
        carousel,

        headerHeight,
        headerBGC,
        headerTextAlign,
        headerColor,
        headerFontSize,
        headerFontFamily,

        oddRowBGC,
        evenRowBGC,

        index,
        indexBGC,
        indexColWidth,
        indexWidth,
        indexHeight,
        indexPadding,
        indexFontSize,
        indexColor,
        indexBDRadius,
        indexHeader,
      } = this

      return {
        ...fakeData,
        rowNum,
        columnTextAlign,
        // rowHeight,
        // colWidth,
        bodyFontSize,
        bodyColor,
        bodyFontFamily,
        isCarousel,
        singleCarousel,
        waitTime,
        carousel,

        headerHeight,
        headerBGC,
        headerTextAlign,
        headerColor,
        headerFontSize,
        headerFontFamily,

        oddRowBGC,
        evenRowBGC,

        index,
        indexBGC,
        indexColWidth,
        indexWidth,
        indexHeight,
        indexPadding,
        indexFontSize,
        indexColor,
        indexBDRadius,
        indexHeader,
      }
    },
  },
}
</script>

<style scoped>
.scroll-borad-container {
  font-size: 40px;
}
</style>

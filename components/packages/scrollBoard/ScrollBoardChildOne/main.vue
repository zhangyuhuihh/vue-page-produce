<template>
  <div class="dv-scroll-board" :ref="ref">
    <div
      class="header"
      v-if="header.length && mergedConfig"
      :style="
        `
          background-color: ${mergedConfig.headerBGC};
        `
      "
    >
      <div
        class="header-item"
        v-for="(headerItem, i) in header"
        :key="headerItem + i"
        :style="
          `
          height: ${mergedConfig.headerHeight}px;
          line-height: ${mergedConfig.headerHeight}px;
          width: ${widths[i]}px;
          color: ${mergedConfig.headerColor};
          font-size: ${mergedConfig.headerFontSize}px;
          text-align: ${mergedConfig.headerTextAlign};
          font-family: ${mergedConfig.headerFontFamily};
        `
        "
        :align="aligns[i]"
        v-html="headerItem"
      />
    </div>

    <div
      v-if="mergedConfig"
      class="rows"
      :style="
        `height: ${height - (header.length ? mergedConfig.headerHeight : 0)}px;`
      "
    >
      <div
        class="row-item"
        v-for="(row, ri) in rows"
        :key="row.toString() + row.scroll"
        :style="
          `
          height: ${heights[ri]}px;
          line-height: ${heights[ri]}px;
          background-color: ${
            mergedConfig[row.rowIndex % 2 === 0 ? 'oddRowBGC' : 'evenRowBGC']
          };
        `
        "
      >
        <div
          class="ceil"
          v-for="(ceil, ci) in row.ceils"
          :key="ceil + ri + ci"
          :style="
            `
            width: ${widths[ci]}px;
            color: ${mergedConfig.bodyColor};
            font-size: ${mergedConfig.bodyFontSize}px;
            font-family: ${mergedConfig.bodyFontFamily};
          `
          "
          :align="aligns[ci]"
          v-html="ceil"
          @click="emitEvent(ri, ci, row, ceil)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import autoResize from '../../../mixins/autoSize'
import _ from 'lodash'
import defaultConfig from './default'

export default {
  name: 'DvScrollBoard',
  mixins: [autoResize],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      ref: 'scroll-board',
      // 合并后的 config
      mergedConfig: null,
      // 表头数据
      header: [],
      rowsData: [],
      // 表数据
      rows: [],
      // 表列宽度-集合
      widths: [],
      // 表行高度-集合
      heights: [],
      // 行平均高度
      avgHeight: 0,
      // 表对齐方式-集合
      aligns: [],
      animationIndex: 0,
      // 定时器
      animationHandler: null,
      updater: 0
    }
  },
  watch: {
    config() {
      const { stopAnimation, calcData } = this

      stopAnimation()

      calcData()
    }
  },
  methods: {
    afterAutoResizeMixinInit() {
      const { calcData } = this

      calcData()
    },
    onResize() {
      const { mergedConfig, calcWidths, calcHeights } = this

      if (!mergedConfig) return

      calcWidths()

      calcHeights()
    },
    calcData() {
      const { mergeConfig, calcHeaderData, calcRowsData } = this

      mergeConfig() // 合并参数

      calcHeaderData() // 计算表头

      calcRowsData() // 计算主体

      const { calcWidths, calcHeights, calcAligns } = this

      calcWidths()

      calcHeights()

      calcAligns()

      const { animation } = this

      animation(true)
    },
    mergeConfig() {
      let { config } = this

      this.mergedConfig = _.merge(
        _.cloneDeep(defaultConfig, true),
        config || {}
      )
    },
    calcHeaderData() {
      let { header, index, indexHeader } = this.mergedConfig

      if (!header.length) {
        this.header = []

        return
      }

      header = [...header]

      if (index) header.unshift(indexHeader)

      this.header = header
    },
    calcRowsData() {
      let {
        rowNum, // 表行数
        columnWidth, // 列宽度
        data, // 列数据
        index, // 是否显示行号
        indexBGC, // 行号背景色
        indexColWidth, // 行号列宽度
        indexWidth, // 行号宽度
        indexHeight, // 行号高度
        indexPadding, // 行号内边距
        indexFontSize, // 行号字号
        indexColor, // 行号字体颜色
        indexBDRadius // 行号边框圆角半径
      } = this.mergedConfig

      if (index) {
        data = data.map((row, i) => {
          row = [...row]
          const indexTag = `
            <span class="index"
              style="
                display: inline-block;
                height: ${indexHeight}px;
                line-height: ${indexHeight}px;
                width: ${indexWidth}px;
                text-align: center;
                background-color: ${indexBGC};
                padding: ${indexPadding}px;
                font-size: ${indexFontSize}px;
                color: ${indexColor};
                border-radius: ${indexBDRadius}px;
              "
            >
              ${i + 1}
            </span>
          `
          row.unshift(indexTag)
          return row
        })

        columnWidth.unshift(indexColWidth)
      }

      data = data.map((ceils, i) => ({ ceils, rowIndex: i }))

      const rowLength = data.length

      if (rowLength > rowNum && rowLength < 2 * rowNum) {
        data = [...data, ...data]
      }

      data = data.map((d, i) => ({ ...d, scroll: i }))

      this.rowsData = data
      this.rows = data
    },
    calcWidths() {
      const { width, mergedConfig, rowsData } = this

      const { columnWidth, header } = mergedConfig

      const usedWidth = columnWidth.reduce((all, w) => all + w, 0)

      let columnNum = 0
      if (rowsData[0]) {
        columnNum = rowsData[0].ceils.length
      } else if (header.length) {
        columnNum = header.length
      }

      const avgWidth = (width - usedWidth) / (columnNum - columnWidth.length)

      const widths = new Array(columnNum).fill(avgWidth)

      this.widths = _.merge(widths, columnWidth)
    },
    calcHeights(onresize = false) {
      const { height, mergedConfig, header } = this

      const { headerHeight, rowNum, data } = mergedConfig

      let allHeight = height

      if (header.length) allHeight -= headerHeight

      const avgHeight = allHeight / rowNum

      this.avgHeight = avgHeight

      if (!onresize) this.heights = new Array(data.length).fill(avgHeight)
    },
    calcAligns() {
      const { header, mergedConfig } = this

      const columnNum = header.length

      let aligns = new Array(columnNum).fill(
        mergedConfig.columnTextAlign || 'left'
      )

      const { align } = mergedConfig

      this.aligns = _.merge(aligns, align)
    },
    async animation(start = false) {
      let {
        avgHeight,
        animationIndex,
        mergedConfig,
        rowsData,
        animation,
        updater
      } = this

      const {
        waitTime,
        carousel,
        rowNum,
        isCarousel,
        singleCarousel
      } = mergedConfig

      const rowLength = rowsData.length

      if (!isCarousel) return

      if (rowNum >= rowLength && singleCarousel) return

      if (start) {
        await new Promise(resolve => setTimeout(resolve, waitTime))
        if (updater !== this.updater) return
      }

      const animationNum = carousel === 'single' ? 1 : rowNum

      let rows = rowsData.slice(animationIndex)
      rows.push(...rowsData.slice(0, animationIndex))

      this.rows = rows
      this.heights = new Array(rowLength).fill(avgHeight)

      await new Promise(resolve => setTimeout(resolve, 300))
      if (updater !== this.updater) return

      this.heights.splice(0, animationNum, ...new Array(animationNum).fill(0))

      animationIndex += animationNum

      const back = animationIndex - rowLength
      if (back >= 0) animationIndex = back

      this.animationIndex = animationIndex
      this.animationHandler = setTimeout(animation, waitTime - 300)
    },
    stopAnimation() {
      const { animationHandler, updater } = this
      this.updater = (updater + 1) % 999999
      if (!animationHandler) return
      clearTimeout(animationHandler)
    },
    emitEvent(ri, ci, row, ceil) {
      const { ceils, rowIndex } = row
      this.$emit('click', {
        row: ceils,
        ceil,
        rowIndex,
        columnIndex: ci
      })
    }
  },
  destroyed() {
    const { stopAnimation } = this
    stopAnimation()
  }
}
</script>

<style lang="scss" scoped>
.dv-scroll-board {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  .text {
    padding: 0 10px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header {
    display: flex;
    flex-direction: row;
    font-size: 16px;
    .header-item {
      padding: 0 10px;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: all 0.3s;
    }
  }
  .rows {
    overflow: hidden;
    .row-item {
      display: flex;
      font-size: 14px;
      transition: all 0.3s;
    }
    .ceil {
      padding: 0 10px;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .index {
      border-radius: 3px;
      padding: 0px 3px;
    }
  }
}
</style>

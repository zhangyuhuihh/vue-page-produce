<template>
  <div class="dv-scroll-board" :ref="ref">
    <div
      class="header"
      v-if="header.length && mergedConfig"
      :style="`background-color: ${mergedConfig.headerBGC}`"
    >
      <div
        class="header-item"
        v-for="(headerItem, i) in header"
        :key="headerItem + i"
        :style="`
          height: ${mergedConfig.headerHeight}px;
          line-height: ${mergedConfig.headerHeight}px;
          width: ${widths[i]}px;
        `"
        :align="aligns[i]"
        v-html="headerItem"
      ></div>
    </div>

    <div
      v-if="mergedConfig"
      class="rows"
      :style="`height: ${height - (header.length ? mergedConfig.headerHeight : 0)}px;`"
    >
      <div
        class="row-item"
        v-for="(row, ri) in rows"
        :key="row.toString() + row.scroll"
        :style="`
          height: ${heights[ri]}px;
          line-height: ${heights[ri]}px;
          background-color: ${mergedConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
        `"
      >
        <div
          class="cell"
          v-for="(cell, ci) in row.cells"
          :key="ceil + ri + ci"
          :style="`width: ${widths[ci]}px;`"
          :align="aligns[ci]"
          v-html="ceil"
          @click="emitEvent(ri, ci, row, ceil)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      ref: "scroll-borad",
      defaultConfig: {
        header: [],
        data: [],
        rowNum: 5,
        headerBGC: "#00BAFF",
        oddRowBGC: "#003B51",
        evenRowBGC: "#0A2732",
        waitTime: 2000,
        headerHeight: 35,
        columnWidth: [],
        align: [],
        index: false,
        indexHeader: "#",
        carousel: "single"
      },
      mergedConfig: null,
      header: [],
      rowsData: [],
      rows: [],
      widths: [],
      heights: [],
      avgHeight: [],
      aligns: [],
      animationIndex: 0,
      animationHeader: "",
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
    calcData() {
      const { mergeConfig, calcHeaderData, calcRowsData } = this

      mergeConfig()
      calcHeaderData()
      calcRowsData()

      const { calcWidths, calcHeights, calcAligns } = this

      calcWidths()
      calcHeights()
      calcAligns()

      const { animation } = this

      animation()
    },
    mergeConfig() {
      const { config, defaultConfig } = this
      console.log(config, defaultConfig)
    },
    calcHeaderData() {
      const { header, index, indexHeader } = this.mergedConfig
    },
    calcRowsData() {

    },
    calcWidths() {

    },
    calcHeights() {

    },
    calcAligns() {

    },
    animation() {

    },
    emitEvent(ri, ci, row, ceil) {},
    stopAnimation() {}
  },

  destroyed() {}
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
    font-size: 15px;
    .header-item {
      // .text;
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
      // .text;
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
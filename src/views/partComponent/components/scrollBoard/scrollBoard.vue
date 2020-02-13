<template>
  <div class="scroll-borad" :ref="ref">
    <div
      class="header"
      v-if="header.length && mergedConfig"
      :style="`background-color: ${mergedConfig.headerBGC}`"
    >
      <div
        class="header-item"
        v-for="(headerItem, i) in header"
        :key="i"
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
        :key="ri"
        :style="`
          height: ${heights[ri]}px;
          line-height: ${heights[ri]}px;
          background-color: ${mergedConfig[row.rowIndex % 2 === 0 ? 'evenRowBGC' : 'oddRowBGC']};
        `"
      >
        <div
          class="cell"
          v-for="(cell, ci) in row.cells"
          :key="ci"
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
  props: {},
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
    };
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

    emitEvent(ri, ci, row, ceil) {},
    stopAnimation() {}
  },

  destroyed() {}
};
</script>
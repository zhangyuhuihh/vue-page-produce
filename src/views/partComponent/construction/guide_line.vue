<template>
  <div v-if="isShow">
    <!-- 上1横线 -->
    <div
      :style="{
        ...commonHorStyle,
        transform: `translateY(${topOne}px)`,
      }"
    ></div>
    <!-- 上2横线 -->
    <div
      :style="{
        ...commonHorStyle,
        transform: `translateY(${topTwo}px)`,
      }"
    ></div>
    <!-- 左1竖线 -->
    <div
      :style="{
        ...commonVerStyle,
        transform: `translateX(${leftOne}px)`,
      }"
    >
      <!-- 坐标点标记区域 -->
      <div
        :style="{
          position: 'absolute',
          color: '#2483FF',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          right: '10px',
          transform: `translateY(${topOne - 20}px)`,
        }"
      >
        {{
          `(x:${activedWidget.dragPosition.x}, y:${
            activedWidget.dragPosition.y
          })`
        }}
      </div>
      <!-- 宽标记区域 -->
      <div
        :style="{
          position: 'absolute',
          color: '#2483FF',
          fontSize: '12px',
          textAlign: 'center',
          width: `${leftTwo - leftOne}px`,
          transform: `translateY(${topOne - 20}px)`,
        }"
      >
        {{ `w:${activedWidget.dragSize.width}` }}
      </div>
      <!-- 高标记区域 -->
      <div
        :style="{
          position: 'absolute',
          color: '#2483FF',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          right: '10px',
          height: `${topTwo - topOne}px`,
          transform: `translateY(${topOne}px)`,
        }"
      >
        {{ `h:${activedWidget.dragSize.height}` }}
      </div>
    </div>
    <!-- 左2竖线 -->
    <div
      :style="{
        ...commonVerStyle,
        transform: `translateX(${leftTwo}px)`,
      }"
    ></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data() {
    return {
      actDom: null,

      topOne: 0,
      topTwo: 0,
      leftOne: 0,
      leftTwo: 0,

      commonHorStyle: {
        width: '100vw',
        height: '0px',
        borderTop: '1.5px dashed #2483FF',
        position: 'absolute',
      },

      commonVerStyle: {
        width: '0px',
        height: '100vh',
        borderLeft: '1.5px dashed #2483FF',
        position: 'absolute',
      },
    }
  },
  computed: {
    ...mapState('partComponent', ['activedWidgetUUID', 'magnification']),
    ...mapGetters('partComponent', ['activedWidget']),
    isShow() {
      return this.activedWidgetUUID
    },
  },
  watch: {
    activedWidgetUUID(newValue) {
      if (newValue) {
        this.actDom = document.getElementById(newValue)
      }
    },
    'activedWidget.dragPosition.x'() {
      this.$nextTick(() => {
        this.refreshLine()
      })
    },
    'activedWidget.dragPosition.y'() {
      this.$nextTick(() => {
        this.refreshLine()
      })
    },
    magnification() {
      this.refreshLine()
    },
    'activedWidget.dragSize': {
      handler() {
        this.$nextTick(() => {
          this.refreshLine()
        })
      },
      deep: true,
    },
  },
  mounted() {
    window.onresize = () => {
      this.refreshLine()
    }

    this.$PlantformEventBus.$on('doRefreshLine', () => {
      this.refreshLine()
    })
  },
  methods: {
    refreshLine() {
      if (this.actDom) {
        const { top, left, bottom, right } = this.actDom.getBoundingClientRect()
        this.topOne = parseInt(top - 40)
        this.topTwo = parseInt(bottom - 40)
        this.leftOne = parseInt(left - 300)
        this.leftTwo = parseInt(right - 300)
      }
    },
  },

  beforeDestroy() {
    this.$PlantformEventBus.$off('doRefreshLine')
  },
}
</script>

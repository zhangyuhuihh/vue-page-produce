<template>
  <div v-if="isShow">
    <div
      :style="{
          ...commonHorStyle,
          transform: `translateY(${topOne}px)`
        }"
    ></div>
    <div
      :style="[
         commonHorStyle,
          {transform: `translateY(${topTwo}px)`}
        ]"
    ></div>
    <div
      :style="{
          ...commonVerStyle,
          transform: `translateX(${leftOne}px)`
        }"
    ></div>
    <div
      :style="{
          ...commonVerStyle,
          transform: `translateX(${leftTwo}px)`
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
        borderTop: '1px dashed #2483FF',
        position: 'absolute'
      },

      commonVerStyle: {
        width: '0px',
        height: '100vh',
        borderLeft: '1px dashed #2483FF',
        position: 'absolute'
      }
    }
  },
  computed: {
    ...mapState('partComponent', ['activedWidgetUUID', 'magnification']),
    ...mapGetters('partComponent', ['activedWidget']),
    isShow() {
      return this.activedWidgetUUID
    }
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
      deep: true
    }
  },
  mounted() {
    window.onresize = () => {
      this.refreshLine()
    }
  },
  methods: {
    refreshLine() {
      if (this.actDom) {
        const { top, left, bottom, right } = this.actDom.getBoundingClientRect()
        this.topOne = top - 40
        this.topTwo = bottom - 40
        this.leftOne = left - 300
        this.leftTwo = right - 300
      }
    }
  }
}
</script>

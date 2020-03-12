<template>
  <div
    v-show="visible"
    class="fake_drag_dom"
    :style="{top: top + 'px', left: left + 'px', width: width + 'px', height: height + 'px'}"
  ></div>
</template>

<script>
export default {
  name: 'FakeDragDom',
  props: {
    top: {
      type: Number,
      default: 0
    },
    left: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 80
    },
    visible: {
      type: Boolean,
      dafault: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        this.show()
      } else {
        this.close()
      }
    }
  },
  methods: {
    show() {
      document.body.appendChild(this.$el)
    },

    close() {
      document.body.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
.fake_drag_dom {
  position: absolute;
  background-color: red;
  z-index: 9999;
}
</style>

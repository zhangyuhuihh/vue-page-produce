<template>
  <div
    v-show="visible"
    class="fake_drag_dom"
    :style="{
      position: 'absolute',
      zIndex: '99999',
      top: top + 'px',
      left: left + 'px',
      width: width + 'px',
      height: height + 'px',
      backgroundImage: imgUrl,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat'
      }"
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
    },
    img: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },

  computed: {
    imgUrl() {
      return this.img ? `url(${require('../images/' + this.img)})` : ''
    }
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
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
.fake_drag_dom {
  border-radius: 5px;
  opacity: 0.5;
  // position: absolute;
  // background-image: url('../images/TitleChildOne_icon.jpg');
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
  // z-index: 9999;
}
</style>

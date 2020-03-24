<template>
  <div
    v-show="isShow"
    :style="{
    left: left + 'px',
    top: top + 'px',
    width: width + 'px',
    height: height + 'px'
  }"
    class="contextmenu"
  >
    <div @click="handleClick" style="width:100%; height: 100%">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightMouseMenu',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number
    },
    width: {
      type: Number,
      default: 170
    },
    height: {
      type: Number,
      default: 170
    }
  },

  watch: {
    isShow(value) {
      if (value) {
        document.body.addEventListener('mousedown', this.closeMenu2, true)
      } else {
        document.body.removeEventListener('mousedown', this.closeMenu2)
      }
    }
  },

  methods: {
    closeMenu() {
      this.$emit('update:isShow', false)
    },
    closeMenu2(e) {
      if (!this.$el.contains(e.target)) {
        this.$emit('update:isShow', false)
      }
    },
    handleClick() {
      this.$emit('update:isShow', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  // padding: 5px 0;
  // border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  // box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

}
</style>

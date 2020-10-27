<template>
  <div class="root_container">
    <div class="top_container">
      <top-part></top-part>
    </div>
    <div class="main_container">
      <div class="left_container">
        <left-part></left-part>
      </div>
      <div class="middle_container">
        <middle-part></middle-part>
      </div>
      <div
        class="right_container"
        :style="{
          transition: 'all .3s ease',
          right: `${right}px`,
        }"
      >
        <right-part></right-part>
      </div>
      <div
        @click="handleShowRightPart"
        class="right_show_btn"
        :style="{
          transition: 'all .3s ease',
          right: `${right + 303}px`,
          top: 'calc((100% - 70px) / 2)',
        }"
      >
        <i :class="iconClass" style="color: #409EFF"></i>
      </div>
    </div>
  </div>
</template>

<script>
import topPart from './topPart'
import leftPart from './leftPart'
import middlePart from './middlePart'
import rightPart from './rightPart'

export default {
  components: {
    topPart,
    leftPart,
    middlePart,
    rightPart,
  },
  data() {
    return {
      right: -290,
    }
  },
  computed: {
    iconClass() {
      return this.right === 0 ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'
    },
  },
  methods: {
    handleShowRightPart() {
      this.right = this.right === 0 ? -290 : 0
    },
  },
}
</script>

<style lang="scss" scoped>
.root_container {
  .top_container {
    width: 100%;
    height: 40px;
    background-color: #181c22;
    border-bottom: 2px solid #000;
  }
  .main_container {
    display: flex;
    width: 100%;
    height: calc(100vh - 40px);
    overflow: hidden;
    position: relative;
    .left_container {
      overflow: hidden;
      width: 300px;
      background-color: #181c22;
    }
    .middle_container {
      flex: 1;
      position: relative;
    }
    .right_container {
      position: absolute;
      bottom: 40px;
      top: 20px;
      background-color: #181c22;
      width: 300px;
    }
    .right_show_btn {
      cursor: pointer;
      position: absolute;
      z-index: 2000;
      width: 20px;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      background-color: #181c22;
    }
  }
}
</style>

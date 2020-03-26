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
      <!-- id为了让点击编辑区域其他点不失焦 -->
      <div class="right_container" id="right_container">
        <right-part></right-part>
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
    rightPart
  }
}
</script>

<style lang="scss" scoped>
.root_container {
  .top_container {
    width: 100%;
    height: 40px;
    background-color: #181C22;
    border-bottom: 2px solid #000
  }
  .main_container {
    display: flex;
    width: 100%;
    height: calc(100vh - 40px);

    .left_container {
      overflow: hidden;
      width: 300px;
      background-color: #181C22;
    }
    .middle_container {
      flex: 1;
      position: relative;
    }
    .right_container {
      width: 300px;
    }
  }
}
</style>

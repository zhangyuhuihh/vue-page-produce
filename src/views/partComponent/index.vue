<template>
  <div class="main_container">
    <div class="left_container">
      <left-part></left-part>
    </div>
    <div class="middle_container">
      <middle-part></middle-part>
    </div>
    <div class="right_container">
      <right-part></right-part>
    </div>
  </div>
</template>

<script>
import leftPart from './leftPart'
import middlePart from './middlePart'
import rightPart from './rightPart'

export default {
  components: {
    leftPart,
    middlePart,
    rightPart
  }
}
</script>

<style lang="scss" scoped>
.main_container {
  display: flex;
  width: 100%;
  height: 100%;
  .left_container {
    flex: 1;
    background-color: red;
  }
  .middle_container {
    flex: 7;
    position: relative;
    // background-color: blue;
    background-image: linear-gradient(
        45deg,
        #f5f5f5 25%,
        transparent 0,
        transparent 75%,
        #f5f5f5 0
      ),
      linear-gradient(
        45deg,
        #f5f5f5 25%,
        transparent 0,
        transparent 75%,
        #f5f5f5 0
      );
    background-position: 0 0, 13px 13px;
    background-size: 26px 26px;
  }
  .right_container {
    flex: 2;
    background-color: yellow;
  }
}
</style>

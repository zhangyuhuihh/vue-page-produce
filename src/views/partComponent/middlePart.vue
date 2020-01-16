<template>
  <div class="main-edit-part">
    <div style="margin-bottom:20px">
      <span>大屏幕分辨率：</span>
      <el-input
        :value="bigScreenRatioWidth"
        @input="updateBigScreenRatioWidth"
        size="small"
        placeholder="长"
        style="width:90px"
      ></el-input>
      <span>X</span>
      <el-input
        :value="bigScreenRatioHeight"
        @input="updateBigScreenRatioHeight"
        size="small"
        placeholder="宽"
        style="width:90px"
      ></el-input>
    </div>
    <edit-area></edit-area>
    <div class="slider_container">
      <div>{{magnification}}%</div>
      <div class="slider_block">
        <el-slider
          :value="magnification"
          @input="handleSliderChange"
          :max="100"
          :min="0"
          :show-tooltip="false"
        ></el-slider>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import EditArea from './edit_area'

export default {
  components: {
    EditArea
  },
  computed: {
    ...mapState('partComponent', {
      bigScreenRatioWidth: state => state.bigScreenRatio.width,
      bigScreenRatioHeight: state => state.bigScreenRatio.height,
      magnification: 'magnification'
    })
  },

  methods: {
    ...mapMutations('partComponent', [
      'setBigScreenRatioWidth',
      'setBigScreenRatioHeight',
      'setMagnification'
    ]),

    updateBigScreenRatioWidth(v) {
      this.setBigScreenRatioWidth(v)
    },

    updateBigScreenRatioHeight(v) {
      this.setBigScreenRatioHeight(v)
    },

    handleSliderChange(v) {
      this.setMagnification(v)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-edit-part {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  width: 100%;
  height: 100%;
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
  .slider_container {
    position: absolute;
    bottom: 50px;
    right: 10px;
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    .slider_block {
      margin-left: 20px;
      width: 150px;
    }
  }
}
</style>

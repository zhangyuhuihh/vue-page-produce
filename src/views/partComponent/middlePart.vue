<template>
  <div class="main-edit-part">
    <div class="page-set--container">
      <page-set></page-set>
    </div>
    <edit-area></edit-area>
    <div class="slider_container">
      <div style="color: #b6b8cc">{{magnification}}%</div>
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
import PageSet from './page_set'

export default {
  components: {
    PageSet,
    EditArea
  },
  computed: {
    ...mapState('partComponent', {
      magnification: 'magnification'
    })
  },

  methods: {
    ...mapMutations('partComponent', [
      'setMagnification'
    ]),

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
  background-color: #0f1014;
  // background-image: linear-gradient(
  //     45deg,
  //     #f5f5f5 25%,
  //     transparent 0,
  //     transparent 75%,
  //     #f5f5f5 0
  //   ),
  //   linear-gradient(
  //     45deg,
  //     #f5f5f5 25%,
  //     transparent 0,
  //     transparent 75%,
  //     #f5f5f5 0
  //   );
  // background-position: 0 0, 13px 13px;
  // background-size: 26px 26px;
  .page-set--container {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10
  }
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

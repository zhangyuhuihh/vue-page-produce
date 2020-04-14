<template>
  <div class="main-edit-part">
    <div class="top_ruler_container">
      <horizontal-ruler></horizontal-ruler>
    </div>
    <div class="ruler_lock_container"></div>
    <div class="left_ruler_container">
      <vertical-ruler></vertical-ruler>
    </div>
    <edit-area @openRightMouseMenu="openRightMouseMenu"></edit-area>
    <div class="slider_container">
      <div class="slider_block">
        <el-slider
          :value="magnification"
          @change="handleSliderChange"
          @input="handleSliderInputChange"
          show-input
        ></el-slider>
        <span class="slider_extra">%</span>
      </div>
    </div>
    <right-mouse-menu
      :uuid="rightMouseUUid"
      :isShow.sync="rightMenu.isShow"
      :left="rightMenu.left"
      :top="rightMenu.top"
    ></right-mouse-menu>
    <guide-line></guide-line>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import RightMouseMenu from './construction/Right_mouse_menu'
import HorizontalRuler from './construction/horizontal_ruler'
import VerticalRuler from './construction/vertical_ruler'
import GuideLine from './construction/guide_line'
import EditArea from './edit_area'

export default {
  components: {
    EditArea,
    RightMouseMenu,
    HorizontalRuler,
    VerticalRuler,
    GuideLine
  },
  data() {
    return {
      rightMenu: {
        isShow: false,
        left: 0,
        right: 0
      },
      rightMouseUUid: ''
    }
  },
  computed: {
    ...mapState('partComponent', {
      magnification: 'magnification'
    })
  },

  methods: {
    ...mapMutations('partComponent', ['setMagnification']),

    handleSliderChange(v) {
      this.setMagnification(v)
    },
    handleSliderInputChange(v) {
      this.setMagnification(v)
    },
    openRightMouseMenu(obj, uuid) {
      this.rightMenu = { ...obj }
      this.rightMouseUUid = uuid
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
  background-color: #2a2e33;
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
  .top_ruler_container {
    position: absolute;
    left: 20px;
    top: 0;
    right: 0;
    height: 60px;
    z-index: 8;
    overflow: hidden;
  }
  .ruler_lock_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: #0e0f14;
  }
  .left_ruler_container {
    position: absolute;
    left: 0;
    top: 20px;
    bottom: 0;
    // height: 500px;
    width: 60px;
    z-index: 8;
    overflow: hidden;
  }
  .slider_container {
    position: absolute;
    bottom: 0px;
    height: 40px;
    width: 100%;
    z-index: 11;
    background-color: #181c22;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .slider_block {
      margin-right: 40px;
      width: 300px;
      position: relative;
      /deep/ .el-slider__runway {
        background: linear-gradient(
          to right,
          rgb(0, 251, 255),
          rgb(0, 176, 255),
          rgb(38, 42, 53)
        );
        height: 3px;
      }
      /deep/ .el-slider__button {
        width: 12px;
        height: 12px;
      }
      /deep/ .el-slider__bar {
        height: 3px;
      }
      /deep/ .el-slider__button-wrapper {
        top: -17px;
      }
      /deep/ .el-input-number__decrease {
        border: none;
        color: #fff;
        background: none;
      }
      /deep/ .el-input-number__increase {
        border: none;
        color: #fff;
        background: none;
      }
      /deep/.el-input--small .el-input__inner {
        background: #181c22;
        border: 1px solid #181c22;
        color: #fff;
      }
      .slider_extra {
        color: #fff;
        position: absolute;
        right: 35px;
        top: 12px;
        font-size: 12px;
      }
    }
  }
}
</style>

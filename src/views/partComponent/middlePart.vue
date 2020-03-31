<template>
  <div class="main-edit-part">
    <div class="top_ruler_container">
      <horizontal-ruler></horizontal-ruler>
    </div>
    <div class="ruler_lock_container">

    </div>
    <div class="left_ruler_container">
      <vertical-ruler></vertical-ruler>
    </div>
    <edit-area @openRightMouseMenu="openRightMouseMenu"></edit-area>
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
    <right-mouse-menu
      :uuid="rightMouseUUid"
      :isShow.sync="rightMenu.isShow"
      :left="rightMenu.left"
      :top="rightMenu.top"
    ></right-mouse-menu>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import RightMouseMenu from './construction/Right_mouse_menu'
import HorizontalRuler from './construction/horizontal_ruler'
import VerticalRuler from './construction/vertical_ruler'
import EditArea from './edit_area'

export default {
  components: {
    EditArea,
    RightMouseMenu,
    HorizontalRuler,
    VerticalRuler
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
      margin-left: 20px;
      width: 100px;
    }
  }
}
</style>

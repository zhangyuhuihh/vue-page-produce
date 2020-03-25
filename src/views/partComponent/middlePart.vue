<template>
  <div class="main-edit-part">
    <!-- <div class="page-set--container">
      <page-set></page-set>
    </div>-->
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
import EditArea from './edit_area'
// import PageSet from './page_set'

export default {
  components: {
    // PageSet,
    EditArea,
    RightMouseMenu
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
  .page-set--container {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
  }
  .slider_container {
    position: absolute;
    bottom: 0px;
    height: 40px;
    width: 100%;
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

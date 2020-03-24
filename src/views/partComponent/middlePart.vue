<template>
  <div class="main-edit-part">
    <div class="page-set--container">
      <page-set></page-set>
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
    <right-mouse-menu :isShow.sync="rightMenu.isShow" :left="rightMenu.left" :top="rightMenu.top">
      <ul class="right_menu_slot">
        <li><i class="el-icon-upload2" /><span>置顶</span></li>
        <li><i class="el-icon-download" /><span>置底</span></li>
        <li><i class="el-icon-top" /><span>上移一层</span></li>
        <li><i class="el-icon-bottom" /><span>下移一层</span></li>
        <li @click="handleRemove"><i class="el-icon-delete" /><span>删除组件</span></li>
      </ul>
    </right-mouse-menu>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import RightMouseMenu from './construction/Right_mouse_menu'
import EditArea from './edit_area'
import PageSet from './page_set'

export default {
  components: {
    PageSet,
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
    ...mapActions('partComponent', ['removeWidget']),

    handleSliderChange(v) {
      this.setMagnification(v)
    },

    openRightMouseMenu(obj, uuid) {
      this.rightMenu = { ...obj }
      this.rightMouseUUid = uuid
    },

    handleRemove() {
      this.removeWidget(this.rightMouseUUid)
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
.right_menu_slot {
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 14px;
  margin: 0;
  color: #ffffff;
  opacity: 0.9;
  background: #303640;
  list-style-type: none;
  li {
    margin: 0;
    cursor: pointer;
    height: 20px;
    margin-bottom: 13px;
    span {
      margin-left: 10px;
    }
  }
}
</style>

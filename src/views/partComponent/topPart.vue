<template>
  <div class="topbar_container">
    <div class="left_place">
      <el-avatar
        size="small"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div class="right_block_one">
      <el-tooltip popper-class="top_pop_class" effect="dark" content="图层" placement="bottom">
        <div @click="openLayer" class="coin_icon_c tool_tip_hover">
          <i class="el-icon-coin"></i>
        </div>
      </el-tooltip>
      <!-- <el-button @click="handleSave" type="primary" size="small">保存预览</el-button> -->
      <div v-if="isShowLayer" class="top_layer_contaniner">
        <div class="top_layer_title">
          <span>图层</span>
          <span @click="isShowLayer = false">
            <i class="el-icon-close"></i>
          </span>
        </div>
        <Layer></Layer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Layer from './construction/layer'
export default {
  components: {
    Layer
  },
  data() {
    return {
      isShowLayer: false
    }
  },
  computed: {
    ...mapGetters('partComponent', ['activedWidget'])
  },
  methods: {
    ...mapActions('partComponent', ['validateAllFields']),
    handleSave() {
      // todo 验证
      // this.validateAllFields(this.activedWidget.uuid).then(res => {
      //   console.log('hahaha')
      // })
      console.log()
      let routeData = this.$router.resolve({
        name: 'partComponentPreview'
        // params: {
        //   id: 1
        // }
      })
      let allData = JSON.stringify(this.$store.state.partComponent)
      sessionStorage.setItem('allData', allData)
      window.open(routeData.href, '_blank')
    },

    openLayer() {
      this.isShowLayer = !this.isShowLayer
    }
  }
}
</script>

<style lang="scss" scoped>
.topbar_container {
  position: relative;
  .left_place {
    float: left;
    display: flex;
    height: 40px;
    width: 100px;
    justify-content: center;
    align-items: center;
  }
  .right_block_one {
    position: absolute;
    right: 300px;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    .top_layer_contaniner {
      position: absolute;
      z-index: 10;
      background-color: #181c22;
      width: 300px;
      height: 530px;
      right: 0;
      top: 40px;
      .top_layer_title {
        padding: 0 10px;
        width: 100%;
        height: 30px;
        background-color: #303640;
        color: #ffffff;
        opacity: 0.5;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
    .coin_icon_c {
      color: #ffffff;
      text-align: center;
      width: 40px;
      height: 22px;
      line-height: 22px;
      background: rgba(48, 54, 64, 1);
      border: 1px solid rgba(58, 70, 89, 1);
    }
  }
}
</style>

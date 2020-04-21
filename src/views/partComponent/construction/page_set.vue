<template>
  <div class="page_set_container">
    <div class="ps_title">页面设置</div>
    <div class="ps_main">
      <div class="page_screen">
        <span>屏幕大小</span>
        <div class="screen_container">
          <div class="container_width">
            <span style="color:#fff">{{ bigScreenRatioWidth }}</span>
            <span>宽</span>
          </div>
          <div class="container_height">
            <span>{{ bigScreenRatioHeight }}</span>
            <span>高</span>
          </div>
        </div>
      </div>
      <div class="line_cell">
        <span>背景颜色</span>
        <div class="line_colorpicker">
          <span @click="handleTextClick" class="line_colorpicker_txt">{{
            pageBgColor
          }}</span>
          <el-color-picker
            ref="test"
            :value="pageBgColor"
            @input="handleBgColorChange"
          ></el-color-picker>
        </div>
      </div>
      <div class="line_bg">
        <span class="bg_txt">背景图片</span>
        <div class="bg_content">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="suibianxie"
            :limit="1"
            :show-file-list="false"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="handleUpLoadChange"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">{{
              imageName
            }}</el-button>
          </el-upload>
        </div>
        <div class="bg_wrapper">
          <div
            :style="{
              backgroundImage: `url(${pageBgImgUrl})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }"
            class="wrapper_center"
          ></div>
        </div>
      </div>
      <div class="line_restart">
        <div class="restart_txt">重置</div>
        <div @click="handlereset" class="restart_wrapper">恢复默认背景</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
// import _ from 'lodash'

export default {
  data() {
    return {
      fileList: [],
      imageUrl: '',
      imageName: '默认背景(点击上传)'
    }
  },
  computed: {
    ...mapState('partComponent', {
      bigScreenRatioWidth: state => state.bigScreenRatio.width,
      bigScreenRatioHeight: state => state.bigScreenRatio.height,
      pageBgColor: 'pageBgColor',
      pageBgImgUrl: 'pageBgImgUrl'
    })
  },

  methods: {
    ...mapMutations('partComponent', [
      'setBigScreenRatioWidth',
      'setBigScreenRatioHeight',
      'setPageBgColor',
      'setPageBgImgUrl'
    ]),

    updateBigScreenRatioWidth(v) {
      this.setBigScreenRatioWidth(v)
    },

    updateBigScreenRatioHeight(v) {
      this.setBigScreenRatioHeight(v)
    },
    handleTextClick() {
      this.$refs.test.showPicker = true // 更改picker组件内置显示与否的属性
    },
    handleBgColorChange(v) {
      this.setPageBgColor(v)
    },
    handlereset() {
      this.setPageBgColor('#07122A')
      this.setPageBgImgUrl('')
    },
    handlePageBgImgurlChange(v) {
      this.setPageBgImgUrl(v)
    },
    // handleAvatarSuccess(res, file) {
    //   this.imageUrl = URL.createObjectURL(file.raw)
    // },
    // beforeAvatarUpload(file) {
    //   const isJPG = file.type === 'image/jpeg'
    //   const isLt2M = file.size / 1024 / 1024 < 2

    //   if (!isJPG) {
    //     this.$message.error('上传头像图片只能是 JPG 格式!')
    //   }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!')
    //   }
    //   return isJPG && isLt2M
    // },
    // 当上传图片后，调用onchange方法，获取图片本地路径
    handleUpLoadChange(file, fileList) {
      var event = window.event
      var file2 = event.target.files[0]
      var reader = new FileReader()
      // 转base64
      reader.onload = e => {
        const imgUrl = e.target.result
        this.setPageBgImgUrl(imgUrl)
        this.imageName = file.name
        // _this.imageUrl = e.target.result // 将图片路径赋值给src
      }
      reader.readAsDataURL(file2)
    },

    handlePreview(file) {},

    handleRemove(file, fileList) {
      this.setPageBgImgUrl('')
    }
  }
}
</script>

<style lang="scss" scoped>
.page_set_container {
  .ps_title {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #303640;
    color: #ffffff;
    opacity: 0.5;
    font-size: 14px;
    padding-left: 10px;
  }
  .ps_main {
    padding: 10px;
    font-size: 12px;
    color: #ffffff;
    opacity: 0.5;
    .page_screen {
      .screen_container {
        display: flex;
        margin-top: 15px;
        .container_width {
          width: 135px;
          height: 24px;
          background: rgba(14, 15, 20, 1);
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-right: 20px;
        }
        .container_height {
          width: 135px;
          height: 24px;
          background: rgba(14, 15, 20, 1);
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      }
    }
  }
  .line_cell {
    margin-top: 20px;
    .line_colorpicker {
      margin-top: 20px;
      position: relative;
      /deep/ .el-color-picker__trigger {
        width: 176px;
        height: 24px;
        padding: 0;
        border: 1px solid #28303b;
      }
      /deep/ .el-color-picker__color {
        border: none;
      }
      /deep/ .el-color-picker__icon {
        display: none;
      }
      .line_colorpicker_txt {
        position: absolute;
        top: 6px;
        left: 45px;
        z-index: 22;
        color: #fff;
        cursor: pointer;
      }
    }
  }
  .line_bg {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .bg_txt {
      align-self: flex-start;
      margin-top: 8px;
    }
    .bg_content {
      margin-top: 10px;
      /deep/ .el-upload {
        width: 100%;
        height: 24px;
      }
      /deep/ .el-button {
        width: 100%;
        background: rgba(14, 15, 20, 1);
        border: 1px solid rgba(40, 48, 59, 1);
      }
    }
    .bg_wrapper {
      margin-top: 15px;
      width: 280px;
      height: 140px;
      background: rgba(14, 15, 20, 1);
      border: 1px solid rgba(40, 48, 59, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      .wrapper_center {
        width: 172px;
        height: 111px;
        background: rgba(7, 18, 42, 1);
      }
    }
  }
  .line_restart {
    margin-top: 20px;
    .restart_wrapper {
      width: 132px;
      height: 24px;
      background: rgba(14, 15, 20, 1);
      border: 1px solid rgba(36, 131, 255, 1);
      line-height: 24px;
      text-align: center;
      margin-top: 10px;
      font-size: 14px;
      color: #2483ff;
      cursor: pointer;
    }
  }
}
</style>

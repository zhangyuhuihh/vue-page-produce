<template>
  <div>
    <el-popover
      @show="dialogVisible = true"
      @hide="dialogVisible = false"
      placement="left-start"
      width="300"
      trigger="click"
    >
      <div>
        <span>屏幕大小</span>
        <el-input
          :value="bigScreenRatioWidth"
          @input="updateBigScreenRatioWidth"
          size="small"
          placeholder="长"
          style="width:80px;margin-left:10px"
        ></el-input>
        <el-input
          :value="bigScreenRatioHeight"
          @input="updateBigScreenRatioHeight"
          size="small"
          placeholder="宽"
          style="width:80px;margin-left:10px"
        ></el-input>
      </div>
      <div class="line_cell" v-if="dialogVisible">
        <span>背景颜色</span>
        <div style="margin-left: 10px">
          <el-color-picker :value="pageBgColor" @input="handleBgColorChange"></el-color-picker>
        </div>
      </div>
      <div class="line_cell">
        <span style="align-self: flex-start;margin-top:8px">背景图片</span>
        <div style="margin-left: 10px">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="suibianxie"
            :limit="1"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="handleUpLoadChange"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >上传到服务器</el-button>-->
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </div>
      <div slot="reference">
        <el-tooltip class="item" effect="dark" content="页面设置" placement="right">
          <div @click="handleSetting" style="cursor: pointer">
            <i class="el-icon-s-tools"></i>
          </div>
        </el-tooltip>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      imageUrl: ''
    }
  },
  computed: {
    ...mapState('partComponent', {
      bigScreenRatioWidth: state => state.bigScreenRatio.width,
      bigScreenRatioHeight: state => state.bigScreenRatio.height,
      pageBgColor: 'pageBgColor'
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

    handleBgColorChange(v) {
      this.setPageBgColor(v)
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
      reader.onload = (e) => {
        const imgUrl = e.target.result
        this.setPageBgImgUrl(imgUrl)
        // _this.imageUrl = e.target.result // 将图片路径赋值给src
      }
      reader.readAsDataURL(file2)
    },

    handlePreview(file) {},

    handleRemove(file, fileList) {
      this.setPageBgImgUrl('')
    },

    handleSetting() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.line_cell {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
</style>

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
          <el-color-picker v-model="bgColor"></el-color-picker>
        </div>
      </div>
      <div class="line_cell" v-if="dialogVisible">
        <span style="align-self: flex-start;margin-top:8px">背景图片</span>
        <div style="margin-left: 10px">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
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
      bgColor: '',
      fileList: []
    }
  },
  computed: {
    ...mapState('partComponent', {
      bigScreenRatioWidth: state => state.bigScreenRatio.width,
      bigScreenRatioHeight: state => state.bigScreenRatio.height
    })
  },

  methods: {
    ...mapMutations('partComponent', [
      'setBigScreenRatioWidth',
      'setBigScreenRatioHeight'
    ]),

    updateBigScreenRatioWidth(v) {
      this.setBigScreenRatioWidth(v)
    },

    updateBigScreenRatioHeight(v) {
      this.setBigScreenRatioHeight(v)
    },

    handlePreview(file) {},

    handleRemove(file, fileList) {},

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

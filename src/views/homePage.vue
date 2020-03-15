<template>
  <div class="homePage_container">
    <div class="input_area">
      <div style="font-size: 20px;">请输入屏幕尺寸</div>
      <div style="margin-top: 25px;margin-left: -20px;">
        <span>长</span> *
        <span>宽</span>
        <el-input
          v-model="bigScreenRatioWidth"
          size="small"
          placeholder="长"
          style="width:80px;margin-left:10px"
        ></el-input>
        <el-input
          v-model="bigScreenRatioHeight"
          size="small"
          placeholder="宽"
          style="width:80px;margin-left:10px"
        ></el-input>
      </div>
      <div style="padding-top: 5px; color: red;height: 25px; padding-left: 25px">{{errorMsg}}</div>
      <div style="margin-top: 10px">
        <el-button @click="handleAddNewScreen" type="primary">新建屏幕</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      bigScreenRatioWidth: 1920,
      bigScreenRatioHeight: 1080,
      errorMsg: ''
    }
  },
  methods: {
    ...mapMutations('partComponent', ['setBigScreenRatioWidth', 'setBigScreenRatioHeight']),
    handleAddNewScreen() {
      let reg = /[0-9]/
      if (
        reg.test(this.bigScreenRatioWidth) &&
        reg.test(this.bigScreenRatioHeight) &&
        this.bigScreenRatioHeight > 0 &&
        this.bigScreenRatioWidth > 0
      ) {
        this.setBigScreenRatioWidth(this.bigScreenRatioWidth)
        this.setBigScreenRatioHeight(this.bigScreenRatioHeight)
        this.$router.replace({
          path: '/partComponent'
        })
        this.errorMsg = ''
      } else {
        this.errorMsg = '请输入正确的数字长宽'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.homePage_container {
  width: 100%;
  height: 100%;
  background-image: url('../images/index_bg.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #b6b8cc;
  .input_area {
    width: 300px;
    height: 200px;
    background-color: #0a0a12;
    margin-right: 15%;
    border-radius: 10px;
    opacity: 0.9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 5px 12px #000000;
    border: 1px solid #777777;
  }
}
</style>

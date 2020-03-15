<template>
  <div class="topbar_container">
    <div class="left_place">
      <el-avatar
        size="small"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      ></el-avatar>
    </div>
    <div class="right_place">
      <!-- <el-button-group> -->
      <!-- <el-button type="info" icon="el-icon-monitor" size="small"></el-button>
        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
          <el-button type="info" icon="el-icon-edit" size="small"></el-button>
      </el-tooltip>-->
      <!-- <el-tooltip class="item" effect="dark" content="保存" placement="bottom">
          <el-button @click="handleSave" type="info" icon="el-icon-document-add" size="small"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
          <el-button type="info" icon="el-icon-delete" size="small"></el-button>
      </el-tooltip>-->
      <el-button @click="handleRemove" :disabled="!isCanRemove" type="primary" size="small">删除选中组件</el-button>
      <el-button @click="handleSave" type="primary" size="small">保存预览</el-button>
      <!-- </el-button-group> -->
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState('partComponent', ['activedWidget']),
    isCanRemove() {
      return Boolean(this.activedWidget.uuid)
    }
  },
  methods: {
    ...mapActions('partComponent', ['validateAllFields', 'removeWidget']),
    handleSave() {
      this.validateAllFields(this.activedWidget.uuid).then(res => {
        console.log('hahaha')
      })
    },
    handleRemove() {
      this.removeWidget(this.activedWidget)
    }
  }
}
</script>

<style lang="scss" scoped>
.topbar_container {
  .left_place {
    float: left;
    display: flex;
    height: 50px;
    width: 100px;
    justify-content: center;
    align-items: center;
  }
  .right_place {
    height: 50px;
    line-height: 50px;
    float: right;
    margin-right: 20px;
  }
}
</style>

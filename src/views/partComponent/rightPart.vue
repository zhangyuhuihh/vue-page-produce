<template>
  <div class="right_container">
    <div v-show="!isShowActiveWidgetPro">
      <page-set></page-set>
    </div>
    <div v-show="isShowActiveWidgetPro">
      <el-tabs v-model="actTab" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="样式" name="first">
          <div class="field_collapse_container">
            <el-collapse>
              <el-collapse-item>
                <span slot="title">基础样式</span>
                <div style="margin-bottom: 10px">
                  <!-- 宽高位置表单区域 -->
                  <drag-fields></drag-fields>
                </div>
              </el-collapse-item>
              <template v-for="(ele, name) in activedWidgetsGroups">
                <el-collapse-item :key="name" :name="name">
                  <span slot="title">{{name}}</span>
                  <template v-for="item in ele">
                    <!-- 这里的key绑定的是'color,fontSize',所以这里有可能组件是不会重新渲染的，所以key要改成activedWidget，保证每次的全部更新，避免bug -->
                    <component
                      :is="item.type"
                      :key="item.onlyKey + activedWidget.uuid"
                      :field-key="item.onlyKey"
                      :field-type="'styleFields'"
                    ></component>
                  </template>
                </el-collapse-item>
              </template>
              <!-- 样式区域 -->
            </el-collapse>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据" name="second">
          <div>
            <!--数据区域-->
            <template v-for="(item, key) in activedWidget.fields">
              <component
                :is="item.type"
                :key="key + activedWidget.uuid"
                :field-key="key"
                :field-type="'fields'"
              ></component>
            </template>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- <div style="margin-top: 50px">
      <el-button @click="handleClick" type="primary">保存</el-button>
    </div>-->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DragFields from './construction/drag_fields'
import PageSet from './construction/page_set'
import FieldInput from './formFields/_field_input'
import FieldColorPicker from './formFields/_field_color_picker'
import FieldSelect from './formFields/_field_select'
import FieldRadio from './formFields/_field_radio'
import FieldSwitch from './formFields/_field_switch'
import FieldSlider from './formFields/_field_slider'
import FieldTextArea from './formFields/_field_textarea'
import _ from 'lodash'

export default {
  components: {
    PageSet,
    DragFields,
    FieldInput,
    FieldColorPicker,
    FieldSelect,
    FieldRadio,
    FieldSwitch,
    FieldSlider,
    FieldTextArea
  },
  data() {
    return {
      actTab: 'first'
    }
  },
  computed: {
    ...mapGetters('partComponent', ['activedWidget']),
    isShowActiveWidgetPro() {
      return !_.isEmpty(this.activedWidget)
    },
    activedWidgetsGroups() {
      let obj = {}
      for (let key in this.activedWidget.styleFields) {
        obj[key] = {
          ...this.activedWidget.styleFields[key],
          onlyKey: key
        }
      }
      // 附加唯一标识
      return _.groupBy(obj, v => {
        return v.belongsTab
      })
    }
  },
  methods: {
    ...mapActions('partComponent', ['validateAllFields']),
    handleTabClick() {},
    handleClick() {
      this.validateAllFields(this.activedWidget.uuid).then(res => {
        console.log('hahaha')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.right_container {
  // padding: 10px;
  height: 100%;
  width: 100%;
  font-size: 12px;
  background-color: #181c22;
  color: #ffffff;
  // opacity: 0.5;
  box-shadow: 0px 5px 12px #000000;
  position: relative;
  z-index: 99;
  overflow-y: auto;
  /deep/ .el-tabs__item {
    width: 150px;
    text-align: center;
    border: none;
    color: #b6b8cc;
    background-color: #303640;
  }
  /deep/ .el-tabs__item.is-active {
    color: #409eff;
    background-color: #181c22;
    border: none;
  }
  /deep/ .el-tabs__nav {
    border: none;
  }
  /deep/ .el-tabs__content {
    padding: 10px;
    opacity: 0.9;
  }
  .field_collapse_container {
    /deep/ .el-collapse-item__header {
      // width: 139px;
      background-color: #181c22;
      color: rgb(182, 184, 204);
      border-bottom: 1px solid #0E0F14;
      // border-bottom: none;
    }

    /deep/ .el-collapse {
      border-top: none;
      border-bottom: none;
    }

    /deep/ .el-collapse-item__wrap {
      border-bottom: none;
      background-color: #181c22;
    }
  }
}
</style>

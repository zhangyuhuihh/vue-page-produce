<template>
  <div class="right_container">
    <div v-show="!isShowActiveWidgetPro">
      <page-set></page-set>
    </div>
    <div v-show="isShowActiveWidgetPro">
      <el-tabs v-model="actTab" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="样式" name="first">
          <div>
            <!-- 宽高位置表单区域 -->
            <div style="margin-bottom: 10px">
              <drag-fields></drag-fields>
            </div>
            <!-- 样式区域 -->
            <template v-for="(item, key) in activedWidget.styleFields">
              <!-- 这里的key绑定的是'color,fontSize',所以这里有可能组件是不会重新渲染的，所以key要改成activedWidget，保证每次的全部更新，避免bug -->
              <component
                :is="item.type"
                :key="key + activedWidget.uuid"
                :field-key="key"
                :field-type="'styleFields'"
              ></component>
            </template>
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
import FieldTextArea from './formFields/_field_textarea'
import FieldColorPicker from './formFields/_field_color_picker'
import FieldSelect from './formFields/_field_select'
import FieldRadio from './formFields/_field_radio'
import FieldSwitch from './formFields/_field_switch'
import FieldSlider from './formFields/_field_slider'
import _ from 'lodash'

export default {
  components: {
    PageSet,
    DragFields,
    FieldInput,
    FieldTextArea,
    FieldColorPicker,
    FieldSelect,
    FieldRadio,
    FieldSwitch,
    FieldSlider
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
    padding: 20px;
    opacity: 0.9;
  }
}
</style>

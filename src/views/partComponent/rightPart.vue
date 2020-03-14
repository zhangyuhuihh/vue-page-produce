<template>
  <div class="right_container">
    <el-tabs v-model="actTab" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="样式" name="first">
        <div>
          <!-- <div>样式区域</div> -->
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
          <!-- <div>数据区域</div> -->
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
    <!-- <div style="margin-top: 50px">
      <el-button @click="handleClick" type="primary">保存</el-button>
    </div>-->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FieldInput from './formFields/_field_input'
import FieldColorPicker from './formFields/_field_color_picker'
import FieldSelect from './formFields/_field_select'
import FieldRadio from './formFields/_field_radio'
import FiledSwitch from './formFields/_field_switch'
import FiledSlider from './formFields/_field_slider'
import FieldsDataSource from './formFieldsCombine/_fields_data_source'

export default {
  components: {
    FieldInput,
    FieldColorPicker,
    FieldSelect,
    FieldRadio,
    FiledSwitch,
    FiledSlider,
    FieldsDataSource
  },
  data() {
    return {
      actTab: 'first'
    }
  },
  computed: {
    ...mapState('partComponent', ['activedWidget'])
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
  background-color: #20212b;
  color: #b6b8cc;
  box-shadow: 0px 5px 12px #000000;
  position: relative;
  z-index: 99;
  overflow-y: auto;
  /deep/ .el-tabs__item {
    width: 150px;
    text-align: center;
    border: none;
    color: #b6b8cc;
    background-color: #2c2e3f;
  }
  /deep/ .el-tabs__item.is-active {
    color: #409EFF;
    background-color: #20212b;
    border: none
  }
  /deep/ .el-tabs__nav {
    border: none
  }
  /deep/ .el-tabs__content {
    padding: 20px;
  }
}
</style>

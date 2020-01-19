<template>
  <div class="right_container">
    <el-tabs type="card" @tab-click="handleTabClick">
      <el-tab-pane label="数据" name="first">
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
      <el-tab-pane label="样式" name="second">
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
    </el-tabs>

    <div style="margin-top: 50px">
      <el-button @click="handleClick" type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import FieldInput from './formFields/_field_input'
import FieldColorPicker from './formFields/_field_color_picker'
import FieldSelect from './formFields/_field_select'
import FieldRadio from './formFields/_field_radio'
import FieldsDataSource from './formFieldsCombine/_fields_data_source'

export default {
  components: {
    FieldInput,
    FieldColorPicker,
    FieldSelect,
    FieldRadio,
    FieldsDataSource
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
  padding: 10px;
  /deep/ .el-tabs__item  {
    width: 139px
  }
}
</style>

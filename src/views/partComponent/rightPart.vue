<template>
  <div class="right_container">
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

    <div style="margin-top: 50px">
      <el-button @click="handleClick" type="primary">提交</el-button>
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
    handleClick() {
      this.validateAllFields(this.activedWidget.uuid).then(res => {
        console.log('hahaha')
      })
    }
  }
}
</script>

<style>
</style>

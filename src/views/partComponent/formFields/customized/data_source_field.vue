<template>
  <div class="field_dataSource_container">
    <span>{{ labelData }}</span>
    <div style="margin-left: 10px">
      <el-radio-group v-model="radioData">
        <el-radio label="fakeData">模拟数据</el-radio>
        <el-radio label="realData">接口数据</el-radio>
      </el-radio-group>
    </div>
    <div style="margin: 10px">
      <prism-editor
        v-show="radioData === 'fakeData'"
        class="my-editor"
        :value="fakeInputData"
        @input="fakeInputData = arguments[0]"
        :highlight="highlighter"
      ></prism-editor>
      <el-input
        v-show="radioData === 'realData'"
        placeholder="请输入接口链接"
        v-model="inputUrl"
        class="input_width"
      ></el-input>
    </div>

    <div style="margin-left: 10px">
      <el-button @click="handleGetRealData" type="primary" size="mini"
        >装载数据</el-button
      >
    </div>

    <div>{{ errorMsg }}</div>
  </div>
</template>

<script>
import fieldMixins from '../field_mixins'
import { textareaFormate } from '../../utils/index'
import { transInterface } from '../../api/index'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere
// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

export default {
  mixins: [fieldMixins],
  components: {
    PrismEditor,
  },
  data() {
    return {
      radioData: '',
      fakeInputData: '',
      inputUrl: '',
      code: '',
    }
  },
  created() {
    this.radioData = this.modelData.type
    this.fakeInputData = textareaFormate(
      this.currentBindWidget.formModel.fakeValue
    )
  },
  computed: {
    selections() {
      return this.currentBindWidget.selections
    },
    modelData() {
      return this.currentBindWidget.formModel || {}
    },
  },
  mounted() {},
  methods: {
    highlighter(code) {
      return highlight(code, languages.js) // languages.<insert language> to return html with markup
    },
    handleGetRealData() {
      if (this.radioData === 'fakeData') {
        this.fieldsChange({
          uuid: this.uuid,
          fieldType: this.fieldType,
          fieldKey: this.fieldKey,
          fieldValue: {
            ...this.modelData,
            type: 'fakeData',
            valueToShow: this.fakeInputData
              .replace(/\s+/g, '')
              .replace(/[\r\n]/g, ''),
            fakeValue: this.fakeInputData
              .replace(/\s+/g, '')
              .replace(/[\r\n]/g, ''),
          },
        })
      }
      if (this.radioData === 'realData') {
        transInterface({ url: this.inputUrl }).then((res) => {
          console.log('res: ', res)
          this.fieldsChange({
            uuid: this.uuid,
            fieldType: this.fieldType,
            fieldKey: this.fieldKey,
            fieldValue: {
              ...this.modelData,
              type: 'realData',
              url: this.inputUrl,
              // todo 这里要根据url从后台转发数据过来
              // 这里这个value,在真实数据的情况下，是用来显示对应的接口数据的
              valueToShow: res,
            },
          })
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.field_dataSource_container {
  /deep/ .el-textarea__inner {
    color: #b6b8cc;
    font-weight: bold;
    background-color: #181a1f;
    border: 1px solid hsla(0, 0%, 100%, 0.2);
  }
}
</style>

<style>
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>

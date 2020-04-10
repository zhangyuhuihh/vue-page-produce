<template>
  <div class="field_data_source_container">
    <div class="field_data_source_top">
      <span>{{labelData}}</span>
      <el-radio-group
        :value="modelData.dataType"
        @input="(value) => handleFieldModelChange(value, 'dataType')"
      >
        <el-radio :key="item.value" v-for="item in radios" :label="item.value">{{item.label}}</el-radio>
      </el-radio-group>
    </div>

    <div class="field_data_source_bottom">
      <div v-if="modelData.dataType === 'real'">
        <el-input :value="modelData.url" @input="(value) => handleFieldModelChange(value, 'url')"></el-input>
      </div>
      <div v-if="modelData.dataType === 'fake'">
        <el-input
          type="textarea"
          autosize
          resize="none"
          placeholder="请输入内容"
          :value="getFormatData(modelData.fakeData)"
          @input="(value) => handleFieldModelChange(value, 'fakeData')"
        ></el-input>
      </div>
    </div>

    <div>{{errorMsg}}</div>
  </div>
</template>

<script>
import fieldCombineMixins from './field_combine_mixins'

export default {
  mixins: [fieldCombineMixins],
  computed: {
    radios() {
      return this.currentBindWidget.radios
    }
  },
  methods: {
    repeat(s, count) {
      return new Array(count + 1).join(s)
    },
    formatJson(json) {
      let i = 0
      let il = 0
      let tab = '    '
      let newJson = ''
      let indentLevel = 0
      let inString = false
      let currentChar = null
      for (i = 0, il = json.length; i < il; i += 1) {
        currentChar = json.charAt(i)
        switch (currentChar) {
          case '{':
          case '[':
            if (!inString) {
              newJson += currentChar + '\n' + this.repeat(tab, indentLevel + 1)
              indentLevel += 1
            } else {
              newJson += currentChar
            }
            break
          case '}':
          case ']':
            if (!inString) {
              indentLevel -= 1
              newJson += '\n' + this.repeat(tab, indentLevel) + currentChar
            } else {
              newJson += currentChar
            }
            break
          case ',':
            if (!inString) {
              newJson += ',\n' + this.repeat(tab, indentLevel)
            } else {
              newJson += currentChar
            }
            break
          case ':':
            if (!inString) {
              newJson += ': '
            } else {
              newJson += currentChar
            }
            break
          case ' ':
          case '\n':
          case '\t':
            if (inString) {
              newJson += currentChar
            }
            break
          case '"':
            if (i > 0 && json.charAt(i - 1) !== '\\') {
              inString = !inString
            }
            newJson += currentChar
            break
          default:
            newJson += currentChar
            break
        }
      }
      return newJson
    },
    getFormatData(json1) {
      var json = json1 + ''
      if (json.indexOf('{') === -1 && json.indexOf('[') === -1) {
        return json
      } else {
        return this.formatJson(json)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.field_data_source_container {
  .field_data_source_top {
  }
  .field_data_source_bottom {
    margin-top: 10px;
  }
}
</style>

<style lang="scss">
.field_data_source_container {
  .el-textarea__inner {
    color: #b6b8cc;
    font-weight: bold;
    background-color: #181a1f;
    border: 1px solid hsla(0, 0%, 100%, 0.2);
  }
}
</style>

<template>
  <div
    class="title_child_one_container"
    :style="{
      color: color,
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontFamily: font,
      justifyContent: align,
      writingMode: textsort,
      letterSpacing: letterspacing
    }"
  >
    <div>{{ titleText ? titleText : '标题' }}</div>
  </div>
</template>

<script>
import componentsMixins from '../../components_mixins'

export default {
  name: 'TitleChildOne',
  mixins: [componentsMixins],
  computed: {
    color() {
      return this.styleFields.color.formModel
    },
    fontSize() {
      return this.styleFields.fontSize.formModel + 'px'
    },
    fontWeight() {
      return this.styleFields.fontWeight.formModel
    },
    titleText() {
      return this.fields.titleText.formModel
    },
    font() {
      return this.styleFields.font.formModel
    },
    align() {
      console.log(this.styleFields.align.formModel)
      return this.styleFields.align.formModel
    },
    textsort() {
      return this.styleFields.textsort.formModel
    },
    letterspacing() {
      console.log(this.styleFields.letterspacing.formModel)
      return this.styleFields.letterspacing.formModel + 'px'
    }
  }
}
</script>

<style>
.title_child_one_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 50px;
  height: 50px; */
}
</style>

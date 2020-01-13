<template>
  <div>
    <template v-for="item in allComponentsKeys">
      <el-button type="primary" @click="handleAdd(item)" :key="item">+{{item}}</el-button>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as widget from './widget.js'
import { ulid } from 'ulid' // 生成uuid

export default {
  data() {
    return {
      allComponentsKeys: []
    }
  },
  created() {
    this.allComponentsKeys = Object.keys(widget)
  },
  methods: {
    ...mapActions('partComponent', ['addWidget']),
    handleAdd(item) {
      const obj = new widget[item]({
        uuid: ulid(),
        type: 'add'
      })
      this.addWidget(obj)
    }
  }
}
</script>

<style>
</style>

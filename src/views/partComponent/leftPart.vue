<template>
  <div class="left_part_container">
    <div>
      <template v-for="(item, key) in allCollapseParent">
        <div :key="item.componentDescription.name">
          <div>{{item.componentDescription.name}}</div>
          <div v-for="item2 in allCollapseChild[key]" :key="item2.componentDescription.name">
            <div @click="handleAdd(item2)">{{item2.componentDescription.name}}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as widget from './widget.js'
import { ulid } from 'ulid' // 生成uuid
import _ from 'lodash'

export default {
  data() {
    return {
      allCollapseParent: null,
      allCollapseChild: null
    }
  },
  created() {
    this.allCollapseParent = _.pickBy(widget, (value, key) => {
      return value.componentDescription.parent === 'widget'
    })
    this.allCollapseChild = _.groupBy(widget, value => {
      return value.componentDescription.parent
    })
  },
  methods: {
    ...mapActions('partComponent', ['addWidget']),
    handleAdd(Item) {
      const obj = new Item({
        uuid: ulid(),
        type: 'add'
      })
      this.addWidget(obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.left_part_container {
  display: flex;
  flex-wrap: wrap;
}
</style>

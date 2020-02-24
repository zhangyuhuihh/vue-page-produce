<template>
  <div class="left_part_container">
    <div>
      <el-collapse>
        <template v-for="(item, key) in allCollapseParent">
          <el-collapse-item
            :title="item.componentDescription.name"
            :name="item.componentDescription.name"
            :key="item.componentDescription.name"
          >
            <div class="block_container">
              <template v-for="item2 in allCollapseChild[key]">
                <div
                  class="cell_container"
                  :key="item2.componentDescription.name"
                  @click="handleAdd(item2)"
                >
                  <div class="img_container">
                    <img
                      :src="require(`./images/${item2.componentDescription.img}`)"
                      style="width:100%;height:100%"
                    />
                  </div>
                  <div>{{item2.componentDescription.name}}</div>
                </div>
              </template>
            </div>
          </el-collapse-item>
        </template>
      </el-collapse>
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
      allCollapseParent: [
        {
          name: "标题类", parent: "widget"
        }
      ],
      allCollapseParent:null,
      allCollapseChild: null
    }
  },
  mounted() {
    this.allCollapseParent = _.pickBy(widget, (value, key) => {
      return value.componentDescription.parent === 'widget'
    })
    console.log('循环的widget', this.allCollapseParent)
    this.allCollapseChild = _.groupBy(widget, value => {
      return value.componentDescription.parent
    })
    console.log('allCollapseChild', this.allCollapseChild)

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
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-shadow: 0px 5px 12px #777777;
  position: relative;
  z-index: 99;
  .block_container {
    display: flex;
    flex-wrap: wrap;
    .cell_container {
      width: 70px;
      cursor: pointer;
      height: 80px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .img_container {
        width: 50px;
        height: 50px;
      }
    }
  }

  // display: flex;
  // flex-wrap: wrap;
}
</style>

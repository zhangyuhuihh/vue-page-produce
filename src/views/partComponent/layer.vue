<template>
  <div class="draggable_container">
    <draggable v-model="draggableList">
      <transition-group name="flip-list">
        <div
          @click="setActivedWidget(element.uuid)"
          v-for="element in draggableList"
          :key="element.uuid"
        >
          <div
            :style="{fontSize: '12px',
            backgroundColor: element.uuid === activedWidget.uuid ? '#3058EB' : ''}"
          >{{element.componentKey + '_' + element.uuid.substr(element.uuid.length - 4, 4)}}</div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import draggable from 'vuedraggable'
import _ from 'lodash'
export default {
  components: {
    draggable
  },
  data() {
    return {
      draggableList: []
    }
  },
  computed: {
    ...mapState('partComponent', ['widgetList', 'activedWidget'])
  },
  watch: {
    draggableList(newValue, olaValue) {
      let arr = newValue.map((v, index) => {
        return {
          uuid: v.uuid,
          z: 999 - index
        }
      })
      this.updateWidgetZIndex(arr)
    },
    widgetList: {
      handler: function(newValue, oldValue) {
        if (newValue.length !== this.draggableList.length) {
          const arr = newValue.map(v => {
            return {
              uuid: v.uuid,
              componentKey: v.componentKey,
              z: v.dragPosition.z
            }
          })

          if (newValue.length > this.draggableList.length) {
            let arr2 = arr.slice(0, arr.length - 1) // 不包括end
            this.draggableList = arr2
            this.draggableList.unshift(_.last(newValue))
            return
          }
          this.draggableList = arr
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('partComponent', ['updateWidgetZIndex', 'setActivedWidget'])
  }
}
</script>

<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.5s;
}
</style>>

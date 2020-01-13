<template>
  <div class="edit_area" @mousedown="elementDown">
    <div
      @mousedown.stop
      class="edit_area_container"
      :style="{
        transform: `scale(${magnification / 100}, ${magnification / 100}) translate(${-left}px, ${-top}px)`,
        padding: '20px'
      }"
    >
      <my-draggable></my-draggable>
    </div>
  </div>
</template>

<script>
import myDraggable from './my_draggable'
import { mapState } from 'vuex'

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation()
  if (e.preventDefault) e.preventDefault()
  e.cancelBubble = true
  e.returnValue = false
  return false
}

const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  }
}

let startLeftPos = ''
let startTopPos = ''

let startMousePosX = ''
let startMousePosY = ''

let eventsFor = events.mouse

export default {
  components: {
    myDraggable
  },
  data() {
    return {
      top: 0,
      left: 0,
      mouseClickPosition: { mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0 }
    }
  },
  computed: {
    ...mapState('partComponent', {
      bigScreenRatioWidth: state => state.bigScreenRatio.width,
      bigScreenRatioHeight: state => state.bigScreenRatio.height,
      magnification: 'magnification'
    }),
    mouseXYMagnification() {
      return this.magnification / 100
    }
  },
  methods: {
    elementDown(e) {
      pauseEvent(e)
      startLeftPos = this.left
      startTopPos = this.top

      startMousePosX = e.touches ? e.touches[0].pageX : e.pageX
      startMousePosY = e.touches ? e.touches[0].pageY : e.pageY

      this.addEvent(document.documentElement, eventsFor.move, this.move)
      this.addEvent(document.documentElement, eventsFor.stop, this.handleUp)

      // console.log('e: ', e)
    },

    move(e) {
      // 计算优先级注意
      pauseEvent(e)
      this.left =
        startLeftPos -
        ((e.touches ? e.touches[0].pageX : e.pageX) - startMousePosX) / this.mouseXYMagnification
      this.top =
        startTopPos -
        ((e.touches ? e.touches[0].pageY : e.pageY) - startMousePosY) / this.mouseXYMagnification
    },

    handleUp(e) {
      this.removeEvent(document.documentElement, eventsFor.move, this.move)
    },

    addEvent(el, event, handler) {
      if (!el) {
        return
      }
      if (el.attachEvent) {
        el.attachEvent('on' + event, handler)
      } else if (el.addEventListener) {
        el.addEventListener(event, handler, true)
      } else {
        el['on' + event] = handler
      }
    },

    removeEvent(el, event, handler) {
      if (!el) {
        return
      }
      if (el.detachEvent) {
        el.detachEvent('on' + event, handler)
      } else if (el.removeEventListener) {
        el.removeEventListener(event, handler, true)
      } else {
        el['on' + event] = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.edit_area {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden; // 这里待调
  justify-content: center;
  align-items: center;
  .edit_area_container {
    position: relative;
    // transition: transform 0.2s linear 0s;
    transform-origin: center center;
  }
  .right_container {
    background-color: #5f5959;
    position: relative;
  }
}
</style>

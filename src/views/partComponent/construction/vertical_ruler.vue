<template>
  <div>
    <canvas id="vertical_ruler" width="20" :height="canvasHeight" />
  </div>
</template>

<script>
// 两种方式：1.刻度形状不变，改变刻度值。2.刻度形状改变，刻度值也跟着改变
import { mapState } from 'vuex'
export default {
  data() {
    return {
      canvasHeight: 0,
      context: null,

      AXIS_MARGIN: 0,
      AXIS_ORIGIN: null,

      AXIS_TOP: 0,
      AXIS_RIGHT: 0,
      // HORIZONTAL_TICK_SPACING: 10,
      VERTICAL_TICK_SPACING: 10,

      AXIS_WIDTH: 0,
      // AXIS_HEIGHT: 0,
      NUM_VERTICAL_TICKS: 0,
      // NUM_HORIZONTAL_TICKS: 0,
      TICK_WIDTH: 20,
      TICKS_LINEWIDTH: 0.5,
      TICKS_COLOR: '#85888b',
      AXIS_LINEWIDTH: 1.0,
      AXIS_COLOR: '#0E0F14',
    }
  },
  computed: {
    ...mapState('partComponent', ['magnification', 'bigScreenRatio']),
    rulermagnification() {
      return this.magnification / 100
    },
  },
  watch: {
    // 标尺的形状其实一直不变，变的只是刻度而已
    rulermagnification(newValue) {
      this.context.clearRect(0, 0, 20, this.canvasHeight)
      this.drawAxes()
    },
  },
  created() {
    this.canvasHeight = window.screen.availHeight
  },
  mounted() {
    let canvas = document.getElementById('vertical_ruler')
    this.context = canvas.getContext('2d')

    this.AXIS_MARGIN = 0
    this.AXIS_ORIGIN = {
      x: this.AXIS_MARGIN,
      y: canvas.height - this.AXIS_MARGIN,
    }

    this.AXIS_TOP = this.AXIS_MARGIN
    this.AXIS_RIGHT = canvas.width - this.AXIS_MARGIN

    this.AXIS_WIDTH = this.AXIS_RIGHT - this.AXIS_ORIGIN.x
    this.AXIS_HEIGHT = this.AXIS_ORIGIN.y - this.AXIS_TOP

    // 这里需要单位换算
    // this.HORIZONTAL_TICK_SPACING = 10
    this.VERTICAL_TICK_SPACING = 10
    this.NUM_VERTICAL_TICKS = this.AXIS_HEIGHT / this.VERTICAL_TICK_SPACING
    // this.NUM_HORIZONTAL_TICKS = this.AXIS_WIDTH / this.HORIZONTAL_TICK_SPACING

    this.$nextTick(() => {
      this.drawAxes()
    })
  },
  methods: {
    // handleClick() {
    //   this.context.clearRect(0, 0, this.canvasWidth, 20)
    //   this.HORIZONTAL_TICK_SPACING = this.HORIZONTAL_TICK_SPACING + 10
    //   this.NUM_HORIZONTAL_TICKS = this.AXIS_WIDTH / this.HORIZONTAL_TICK_SPACING
    // },
    drawAxes() {
      let {
        context,
        AXIS_COLOR,
        AXIS_LINEWIDTH,
        TICKS_LINEWIDTH,
        TICKS_COLOR,
      } = this
      context.save()
      context.strokeStyle = AXIS_COLOR
      context.lineWidth = AXIS_LINEWIDTH
      // this.drawHorizontalAxis()
      this.drawVerticalAxis()
      context.lineWidth = 0.5
      context.lineWidth = TICKS_LINEWIDTH
      context.strokeStyle = TICKS_COLOR
      this.drawVerticalAxisTicks()
      // this.drawHorizontalAxisTicks()
      context.restore()
    },
    // drawHorizontalAxis() {
    //   const { context, AXIS_ORIGIN, AXIS_MARGIN, AXIS_RIGHT } = this
    //   context.beginPath()
    //   context.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN)
    //   context.lineTo(AXIS_RIGHT, AXIS_MARGIN)
    //   context.closePath()
    //   context.stroke()
    // },
    drawVerticalAxis() {
      const { context, AXIS_ORIGIN, AXIS_MARGIN } = this
      context.beginPath()
      context.moveTo(AXIS_ORIGIN.x, AXIS_MARGIN)
      context.lineTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y)
      context.closePath()
      context.stroke()
    },
    drawVerticalAxisTicks() {
      const {
        context,
        NUM_VERTICAL_TICKS,
        // HORIZONTAL_TICK_SPACING,
        VERTICAL_TICK_SPACING,
        TICKS_COLOR,
      } = this
      const degree = this.calcDegree(this.rulermagnification)
      for (var i = 0; i < NUM_VERTICAL_TICKS; ++i) {
        context.beginPath()
        context.fillStyle = TICKS_COLOR
        if (i % 5 === 0) {
          context.moveTo(20, 0 + VERTICAL_TICK_SPACING * i)
          context.lineTo(7, 0 + VERTICAL_TICK_SPACING * i)
          context.stroke()

          context.save() // 记录状态

          context.textAlign = 'center'
          context.translate(10, 0 + VERTICAL_TICK_SPACING * i)
          context.rotate(-Math.PI / 2)
          context.fillText(parseInt(i * degree), 14, 0)

          context.restore() // 旋转之后释放状态
        } else {
          context.moveTo(20, i * VERTICAL_TICK_SPACING)
          context.lineTo(13, i * VERTICAL_TICK_SPACING)
        }
        context.stroke()
      }
    },
    // drawHorizontalAxisTicks() {
    //   const {
    //     context,
    //     NUM_HORIZONTAL_TICKS,
    //     HORIZONTAL_TICK_SPACING,
    //     // VERTICAL_TICK_SPACING,
    //     AXIS_ORIGIN
    //   } = this

    //   const degree = this.calcDegree(this.rulermagnification)
    //   for (let i = 0; i < NUM_HORIZONTAL_TICKS; ++i) {
    //     context.beginPath()
    //     if (i % 5 === 0) {
    //       context.fillStyle = '#85888b'
    //       context.moveTo(0 + HORIZONTAL_TICK_SPACING * i, 13) // 移动到横坐标(x, 13), 即canvas底部（canvas左上角(0, 0)为坐标原点，canvans的高度为20）
    //       context.lineTo(0 + HORIZONTAL_TICK_SPACING * i, 4) // 划线到 (x, 2)这个坐标 => 生成18px长的线
    //       context.textAlign = 'left'
    //       context.fillText(
    //         // 填充刻度，这里默认每50取一次刻度
    //         parseInt(i * degree),
    //         2 + HORIZONTAL_TICK_SPACING * i,
    //         11 // 刻度的位置信息，具体查阅相关api
    //       )
    //     }

    //     context.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, 20) // 正常情况下，将光标移动到(x, 20)坐标，同上
    //     context.lineTo(
    //       AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING,
    //       13 // 这里的13对应上面的i % 5 === 0 的情况，避免两根线重复
    //     )
    //     context.stroke()
    //   }
    // },

    calcDegree(v) {
      return 10 / this.rulermagnification
    },
  },
}
</script>

<style lang="scss" scoped>
#vertical_ruler {
  background: #0e0f14;
  cursor: pointer;
  // margin-left: 10px;
  // margin-top: 10px;
  // -webkit-box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  // -moz-box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  // box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
}
</style>

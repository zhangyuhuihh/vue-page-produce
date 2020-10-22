<template>
  <div class="back_forward_container">
    <el-tooltip popper-class="top_pop_class" effect="dark" content="撤销" placement="bottom">
      <div @click="handleBack" class="coin_icon_c tool_tip_hover">
        <i class="el-icon-top-left"></i>
      </div>
    </el-tooltip>
    <el-tooltip popper-class="top_pop_class" effect="dark" content="前进" placement="bottom">
      <div @click="handleForward" class="coin_icon_c tool_tip_hover">
        <i class="el-icon-top-right"></i>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

function handleBack() {
  let len = this.cacheStates.length
  if (this.backStep > -1 && this.backStep < len - 1) {
    this.backStep++
    let backStateIndex = len - this.backStep - 1
    let currentState = this.cacheStates[backStateIndex]
    this.updateState(currentState) // 更新当前的状态
  }
}

function handleForward() {
  let len = this.cacheStates.length
  if (this.backStep > 0 && this.backStep < len) {
    this.backStep--
    let backStateIndex = len - this.backStep - 1
    let currentState = this.cacheStates[backStateIndex]
    this.updateState(currentState) // 更新当前的状态
  }
}

const _handleBack = _.throttle(handleBack, 0, {
  leading: true,
  trailing: false
})
const _handleForward = _.throttle(handleForward, 0, {
  leading: true,
  trailing: false
})

export default {
  data() {
    return {
      cacheStates: [],
      isInBackStep: false,
      backStep: 0
    }
  },
  computed: {
    ...mapState('partComponent', [
      'widgetList',
      'cacheStateCount',
      'pageBgColor',
      'pageBgImgUrl'
    ])
  },
  watch: {
    cacheStateCount: {
      handler() {
        let len = this.cacheStates.length
        let currentStateIndex = len - this.backStep - 1
        this.cacheStates.splice(currentStateIndex + 1, this.backStep)
        this.UpdateCacheStates()
        this.backStep = 0
      }
    }
  },
  methods: {
    ...mapActions('partComponent', ['backForwardToState']),
    UpdateCacheStates() {
      if (this.cacheStates.length === 11) {
        // 保留5步操作,注意这里11保存的是10步
        this.cacheStates.shift()
      }
      this.cacheStates.push({
        widgetList: _.cloneDeep(this.widgetList) || [],
        pageBgColor: this.pageBgColor,
        pageBgImgUrl: this.pageBgColor
      })
    },

    handleBack() {
      _handleBack.call(this)
    },

    handleForward() {
      _handleForward.call(this)
    },

    updateState(newState) {
      // 这一步没有克隆对象，坑死爸爸
      this.backForwardToState(_.cloneDeep(newState))
    }
  }
}
</script>

<style lang="scss" scoped>
.back_forward_container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  .coin_icon_c {
    color: #ffffff;
    text-align: center;
    width: 40px;
    height: 22px;
    line-height: 22px;
    background: rgba(48, 54, 64, 1);
    border: 1px solid rgba(58, 70, 89, 1);
  }
}
</style>

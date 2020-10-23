<template>
  <div
    v-show="isShow"
    :style="{
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px',
    }"
    class="contextmenu"
  >
    <div @click="handleClick" style="width:100%; height: 100%">
      <ul class="right_menu_slot">
        <li @click="setTop">
          <i class="el-icon-upload2" />
          <span>置顶</span>
        </li>
        <li @click="setBottom">
          <i class="el-icon-download" />
          <span>置底</span>
        </li>
        <li @click="setUpOneStep">
          <i class="el-icon-top" />
          <span>上移一层</span>
        </li>
        <li @click="setDownOneStep">
          <i class="el-icon-bottom" />
          <span>下移一层</span>
        </li>
        <li @click="handleRemove">
          <i class="el-icon-delete" />
          <span>删除组件</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState, mapMutations } from 'vuex'
import setUpDownMixin from '../mixins/setUpDownMixin'
export default {
  name: 'RightMouseMenu',
  mixins: [setUpDownMixin],
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    uuid: {
      type: String,
      default: '',
    },
    left: {
      type: Number,
      default: 0,
    },
    top: {
      type: Number,
    },
    width: {
      type: Number,
      default: 170,
    },
    height: {
      type: Number,
      default: 170,
    },
  },

  watch: {
    isShow(value) {
      if (value) {
        document.body.addEventListener('mousedown', this.closeMenu2, true)
      } else {
        document.body.removeEventListener('mousedown', this.closeMenu2)
      }
    },
  },

  computed: {
    ...mapGetters('partComponent', ['activedWidget']),
  },

  methods: {
    ...mapActions('partComponent', ['removeWidget']),

    closeMenu() {
      this.$emit('update:isShow', false)
    },

    closeMenu2(e) {
      if (!this.$el.contains(e.target)) {
        this.$emit('update:isShow', false)
      }
    },

    handleRemove() {
      this.removeWidget(this.uuid)
    },

    handleClick() {
      this.$emit('update:isShow', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  // padding: 5px 0;
  // border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  // box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  .right_menu_slot {
    width: 100%;
    height: 100%;
    padding: 10px;
    font-size: 14px;
    margin: 0;
    color: #ffffff;
    opacity: 0.9;
    background: #303640;
    list-style-type: none;
    li {
      margin: 0;
      cursor: pointer;
      height: 20px;
      margin-bottom: 13px;
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>

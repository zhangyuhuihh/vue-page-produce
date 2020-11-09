<template>
  <div
    class="preview_container"
    :style="{
      width: bigScreenRatio.width + 'px',
      height: bigScreenRatio.height + 'px',
      backgroundImage: `url(${pageBgImgUrl})`,
      backgroundColor: pageBgColor,
      position: 'relative'
    }"
  >
    <template v-for="item in widgetList">
      <div
        :key="item.uuid"
        :style="{
          position: 'absolute',
          top: item.dragPosition.y + 'px',
          left: item.dragPosition.x + 'px',
          zIndex: item.dragPosition.z,
          width: item.dragSize.width + 'px',
          height: item.dragSize.height + 'px'
        }"
      >
        <component :is="item.componentKey" v-bind="item"></component>
      </div>
    </template>
    <!-- <div @click="handleClidk">点击查看数据</div> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
// import TestComponentOne from '../components/testComponents/testComponentOne'
// import TestComponentTwo from '../components/testComponents/testComponentTwo'
// import TestComponentThree from '../components/testComponents/testComponentThree'
// import TitleChildOne from '../components/title/TitleChildOne/index'
// import TitleChildTwo from '../components/title/TitleChildTwo/index'
// import ScrollBoardChildOne from '../components/scrollBoard/ScrollBoardChildOne'
// import LineChartChildOne from '../components/lineChart/lineChartChildOne/index'
// import PieChartChildOne from '../components/pieChart/pieChartChildOne/index'
// import BarChartChildOne from '../components/barChart/barChartChildOne/index'
export default {
  components: {
    // TestComponentOne,
    // TestComponentTwo,
    // TestComponentThree,
    // TitleChildOne,
    // TitleChildTwo,
    // ScrollBoardChildOne,
    // LineChartChildOne,
    // PieChartChildOne,
    // BarChartChildOne
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('partComponent', [
      'widgetList',
      'bigScreenRatio',
      'pageBgColor',
      'pageBgImgUrl'
    ])
  },
  mounted() {
    let allData = JSON.parse(sessionStorage.getItem('allData'))
    // 方式待调
    console.log(allData)
    allData.widgetList.forEach(element => {
      this.addWidget(element)
    })
    this.setPageBgColor(allData.pageBgColor)
    this.setPageBgImgUrl(allData.pageBgImgUrl)

    this.setBigScreenRatioWidth(allData.bigScreenRatio.width)
    this.setBigScreenRatioHeight(allData.bigScreenRatio.height)
    // 这里需要初始化vuex中的widget数据
    // console.log('widgetList: ', this.widgetList)
  },
  methods: {
    ...mapMutations('partComponent', [
      'setPageBgColor',
      'setPageBgImgUrl',
      'setBigScreenRatioWidth',
      'setBigScreenRatioHeight'
    ]),
    ...mapActions('partComponent', ['addWidget'])
  }
}
</script>

<style lang="scss" scoped>
.preview_container {
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>

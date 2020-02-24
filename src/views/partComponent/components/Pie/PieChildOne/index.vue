<template>
  <div :id="`echarts${uuid}`" class="testComponent_one" style="width:500px;height:500px"></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    uuid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      Dataoptions: {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: this.fakeData
          }
        ]
      }
    };
  },
  methods: {
    init() {
      var dom = document.getElementById("echarts" + this.uuid);
      var myChart = this.echarts.init(dom);
      myChart.setOption({
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: this.fakeData
          }
        ]
      });
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    fakeData: {
      handler(newVal, oldVal) {
        var dom = document.getElementById("echarts" + this.uuid);
        var myChart = this.echarts.init(dom);
        myChart.setOption({
          title: {
            text: "某站点用户访问来源",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "55%",
              data: this.fakeData
            }
          ]
        });
      },
      deep: true
    }
  },
  computed: {
    ...mapState("partComponent", ["widgetList"]),
    currentWidget() {
      return this.widgetList.find(v => v.uuid === this.uuid);
    },
    currentWidgetStyleFields() {
      return this.currentWidget.styleFields;
    },
    currentWidgetFields() {
      return this.currentWidget.fields;
    },
    fakeData() {
      return JSON.parse(this.currentWidgetFields.isFakeData.formModel.fakeData);
    },
    dataType() {
      return this.fakeData.dataType;
    }
  }
};
</script>

<style>
.testComponent_one {
  /* width: 50px;
  height: 50px; */
}
</style>

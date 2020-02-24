const linechartJson = {
  ForTestComponentThree: {
    title: { text: '统计echarts' },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['每月新增用户数量', '每月用户数量总计'],
      textStyle: {
        color: '#9e9fa4',
        fontSize: 16
      }
    },
    grid: {
      containLabel: true
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '每日用户数量总计',
        type: 'line',
        itemStyle: {
          normal: {
            color: 'red'
          }
        },
        yAxisIndex: 0,
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  }
}

export default linechartJson

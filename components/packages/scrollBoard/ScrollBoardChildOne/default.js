const defaultConfig = {
  /**
   * 数据
   * */

  /**
   * @description 表头数据
   * @type {Array<String>}
   * @default header = []
   * @example header = ['column1', 'column2', 'column3']
   */
  header: [],

  /**
   * @description 表数据
   * @type {Array<Array>}
   * @default data = []
   */
  data: [],

  /**
   * 全局样式
   * */

  /**
   * @description 表行数
   * @type {Number}
   * @default rowNum = 5
   */
  rowNum: 5,

  /**
   * @description 表行高-统一
   * @type {Number}
   * @default rowHeight = 35
   */
  rowHeight: 35,

  /**
   * @description 列对齐方式-统一
   * @type {String}
   * @default columnTextAlign = 'center'
   */
  columnTextAlign: 'center',

  /**
   * @description 列宽度-统一
   * @type {Number}
   * @default colWidth = 50
   */
  colWidth: 50,

  /**
   * @description 表字号
   * @type {Number}
   * @default bodyFontSize = 14
   */
  bodyFontSize: 14,

  /**
   * @description 表字体颜色
   * @type {String}
   * @default bodyColor = '#fff'
   */
  bodyColor: '#fff',

  /**
   * @description 表字体
   * @type {String}
   * @default bodyFontFamily = 'SimSun'
   */
  bodyFontFamily: 'SimSun',

  /**
   * @description 是否轮播
   * @type {Boolean}
   * @default isCarousel = true
   */
  isCarousel: true,

  /**
   * @description 单页不轮播
   * @type {Boolean}
   * @default singleCarousel = true
   */
  singleCarousel: true,

  /**
   * @description 轮播间隔
   * @type {Number}
   * @default waitTime = 2000
   */
  waitTime: 2000,

  /**
   * @description 轮播方式
   * @type {String}
   * @default carousel = 'single'
   * @example carousel = 'single' | 'page'
   */
  carousel: 'single',

  /**
   * @description 列宽度-自定义
   * @type {Array<Number>}
   * @default columnWidth = [100]
   */
  columnWidth: [],

  /**
   * @description 列对齐方式-自定义
   * @type {Array<String>}
   * @default align = []
   * @example align = ['left', 'center', 'right']
   */
  align: [],

  /**
   * 表头样式
   * */

  /**
   * @description 表头行高
   * @type {Number}
   * @default headerHeight = 35
   */
  headerHeight: 35,

  /**
   * @description 表头背景色
   * @type {String}
   * @default headerBGC = '#00BAFF'
   */
  headerBGC: '#00BAFF',

  /**
   * @description 表头对齐方式
   * @type {String}
   * @default headerTextAlign = 'center'
   */
  headerTextAlign: 'center',

  /**
   * @description 表头字号
   * @type {Number}
   * @default headerFontSize = 16
   */
  headerFontSize: 16,

  /**
   * @description 表头字体颜色
   * @type {String}
   * @default headerColor = '#fff'
   */
  headerColor: '#fff',

  /**
   * @description 表头字体
   * @type {String}
   * @default headerFontFamily = 'SimSun'
   */
  headerFontFamily: 'SimSun',

  /**
   * 行配置样式
   * */

  /**
   * @description 奇数行背景色
   * @type {String}
   * @default oddRowBGC = '#003B51'
   */
  oddRowBGC: '#003B51',

  /**
   * @description 偶数行背景色
   * @type {String}
   */
  evenRowBGC: '#0A2732',

  /**
   * 序列号样式
   * */

  /**
   * @description 是否显示行号
   * @type {Boolean}
   * @default index = true
   */
  index: true,

  /**
   * @description 行号背景色
   * @type {String}
   * @default indexBGC = '#00BAFF'
   */
  indexBGC: '#00BAFF',

  /**
   * @description 行号列宽度
   * @type {Number}
   * @default indexColWidth = 50
   */
  indexColWidth: 50,

  /**
   * @description 行号宽度
   * @type {Number}
   * @default indexWidth = 16
   */
  indexWidth: 16,

  /**
   * @description 行号高度
   * @type {Number}
   * @default indexHeight = 16
   */
  indexHeight: 16,

  /**
   * @description 行号内边距
   * @type {Number}
   * @default indexPadding = 0
   */
  indexPadding: 0,

  /**
   * @description 行号字号
   * @type {Number}
   * @default indexFontSize = 12
   */
  indexFontSize: 12,

  /**
   * @description 行号字体颜色
   * @type {String}
   * @default indexColor = '#fff'
   */
  indexColor: '#fff',

  /**
   * @description 行号边框圆角半径
   * @type {Number}
   * @default indexBDRadius = 8
   */
  indexBDRadius: 8,

  /**
   * @description 行号表头
   * @type {String}
   * @default indexHeader = '#'
   */
  indexHeader: '#'
}

export default defaultConfig

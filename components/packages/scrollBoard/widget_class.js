import { ScrollBoard } from '../../widget'
import widgetFields from '../../widget_fields'
import jsonTemplate from '../../json_template'
import defaultConfig from './ScrollBoardChildOne/default'
import { tabsTypes } from '../../configs/tabsTypes'
import validators from '../../validators'
import _tabsTypes from './tabsTypes'
import widgeCustomizedFields from '../../widget_customized_fields'
import { textAlignOption, fontFamilyOption, carouselOption } from './config'

class ScrollBoardChildOne extends ScrollBoard {
  static componentDescription = {
    name: '轮播表一',
    parent: 'ScrollBoard',
    img: 'ScrollboardChildOne_icon.png',
  }
  constructor(constructorData) {
    super(constructorData)
    this.componentKey = 'ScrollBoardChildOne'

    const {
      rowNum,
      // rowHeight,
      columnTextAlign,
      // colWidth,
      bodyFontSize,
      bodyColor,
      bodyFontFamily,
      isCarousel,
      singleCarousel,
      waitTime,
      carousel,

      headerHeight,
      headerBGC,
      headerTextAlign,
      headerFontSize,
      headerColor,
      headerFontFamily,

      oddRowBGC,
      evenRowBGC,

      index,
      indexBGC,
      indexHeader,
      indexColWidth,
      indexWidth,
      indexHeight,
      indexPadding,
      indexFontSize,
      indexColor,
      indexBDRadius,
    } = defaultConfig

    this.setStyleFields({
      /**
       * 全局样式
       * */
      rowNum: widgetFields.FieldInputNumber({
        label: '表格行数',
        formModel: rowNum,
        max: 20,
        min: 1,
        belongsTab: tabsTypes.overall,
        extraLabel: '行',
      }),

      columnTextAlign: widgetFields.FieldSelect({
        label: '对齐方式',
        formModel: columnTextAlign,
        options: textAlignOption,
        belongsTab: tabsTypes.overall,
      }),

      // 表格行高 和 表列宽度 暂时不好控制

      // rowHeight: widgetFields.FieldSlider({
      //   label: '表格行高',
      //   formModel: rowHeight,
      //   belongsTab: tabsTypes.overall
      // }),

      // colWidth: widgetFields.FieldSlider({
      //   label: '表列宽度',
      //   formModel: colWidth,
      //   belongsTab: tabsTypes.overall
      // }),

      bodyFontSize: widgetFields.FieldInputNumber({
        label: '字号',
        formModel: bodyFontSize,
        max: 50,
        min: 10,
        belongsTab: tabsTypes.overall,
        extraLabel: 'px',
      }),

      bodyColor: widgetFields.FieldColorPicker({
        label: '字体颜色',
        formModel: bodyColor,
        belongsTab: tabsTypes.overall,
      }),

      bodyFontFamily: widgetFields.FieldSelect({
        label: '字体',
        formModel: bodyFontFamily,
        options: fontFamilyOption,
        belongsTab: tabsTypes.overall,
      }),

      isCarousel: widgetFields.FieldSwitch({
        label: '是否轮播',
        formModel: isCarousel,
        belongsTab: tabsTypes.overall,
      }),

      singleCarousel: widgetFields.FieldSwitch({
        label: '单页不轮播',
        formModel: singleCarousel,
        belongsTab: tabsTypes.overall,
      }),

      waitTime: widgetFields.FieldInputNumber({
        label: '轮播间隔',
        formModel: waitTime,
        belongsTab: tabsTypes.overall,
        extraLabel: 'ms',
      }),

      carousel: widgetFields.FieldSelect({
        label: '轮播方式',
        formModel: carousel,
        options: carouselOption,
        belongsTab: tabsTypes.overall,
      }),

      /**
       * 表头样式
       * */
      headerHeight: widgetFields.FieldInputNumber({
        label: '表头行高',
        formModel: headerHeight,
        belongsTab: _tabsTypes.header,
        extraLabel: 'px',
      }),

      headerBGC: widgetFields.FieldColorPicker({
        label: '背景颜色',
        formModel: headerBGC,
        belongsTab: _tabsTypes.header,
      }),

      headerTextAlign: widgetFields.FieldSelect({
        label: '对齐方式',
        formModel: headerTextAlign,
        options: textAlignOption,
        belongsTab: _tabsTypes.header,
      }),

      headerFontSize: widgetFields.FieldInputNumber({
        label: '字号',
        formModel: headerFontSize,
        max: 50,
        min: 10,
        belongsTab: _tabsTypes.header,
        extraLabel: 'px',
      }),

      headerColor: widgetFields.FieldColorPicker({
        label: '字体颜色',
        formModel: headerColor,
        belongsTab: _tabsTypes.header,
      }),

      headerFontFamily: widgetFields.FieldSelect({
        label: '字体',
        formModel: headerFontFamily,
        options: fontFamilyOption,
        belongsTab: _tabsTypes.header,
      }),

      /**
       * 行配置样式
       * */
      oddRowBGC: widgetFields.FieldColorPicker({
        label: '奇数行背景色',
        formModel: oddRowBGC,
        belongsTab: _tabsTypes.row,
      }),

      evenRowBGC: widgetFields.FieldColorPicker({
        label: '偶数行背景色',
        formModel: evenRowBGC,
        belongsTab: _tabsTypes.row,
      }),

      /**
       * 序列号样式
       * */
      index: widgetFields.FieldSwitch({
        label: '显示行号',
        formModel: index,
        belongsTab: _tabsTypes.index,
      }),

      indexBGC: widgetFields.FieldColorPicker({
        label: '背景色',
        formModel: indexBGC,
        belongsTab: _tabsTypes.index,
      }),

      indexColWidth: widgetFields.FieldInputNumber({
        label: '列宽度',
        formModel: indexColWidth,
        belongsTab: _tabsTypes.index,
        extraLabel: 'px',
      }),

      indexWidth: widgetFields.FieldInputNumber({
        label: '宽度',
        formModel: indexWidth,
        belongsTab: _tabsTypes.index,
        extraLabel: 'px',
      }),

      indexHeight: widgetFields.FieldInputNumber({
        label: '高度',
        formModel: indexHeight,
        belongsTab: _tabsTypes.index,
        extraLabel: 'px',
      }),

      indexPadding: widgetFields.FieldInputNumber({
        label: '内边距',
        formModel: indexPadding,
        belongsTab: _tabsTypes.index,
        extraLabel: 'px',
      }),

      indexFontSize: widgetFields.FieldInputNumber({
        label: '字号',
        formModel: indexFontSize,
        belongsTab: _tabsTypes.index,
        extraLabel: 'px',
      }),

      indexColor: widgetFields.FieldColorPicker({
        label: '字体颜色',
        formModel: indexColor,
        belongsTab: _tabsTypes.index,
      }),

      indexBDRadius: widgetFields.FieldInputNumber({
        label: '圆角半径',
        formModel: indexBDRadius,
        belongsTab: _tabsTypes.index,
        extraLabel: 'px',
      }),

      indexHeader: widgetFields.FieldInput({
        label: '表头',
        formModel: indexHeader,
        belongsTab: _tabsTypes.index,
        validator: [validators.requireInput('请输入标题文字')],
      }),

      /**
       * 自定义列样式
       * */
    })
    this.setFields({
      dataSource: widgeCustomizedFields.dataSource({
        fakeData: JSON.stringify(jsonTemplate.ForScrollBoard),
      }),
    })
  }
}

export { ScrollBoardChildOne }

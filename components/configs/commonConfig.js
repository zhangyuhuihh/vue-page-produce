import widgetFields from '../widget_fields'
import jsonTemplate from '../json_template'

const setCommonDataFields = () => ({
  isFakeData: widgetFields.FieldRadio({
    label: '数据源',
    formModel: '0',
    radios: [
      {
        label: '模拟数据',
        value: '0'
      },
      {
        label: '接口数据',
        value: '1'
      }
    ],
    // emitEvents: ['changeDataType']
    emitEvents: [
      {
        type: 'change',
        initValue: '0',
        eventName: 'changeDataType'
      }
    ]
  }),
  fakeData: widgetFields.FieldTextArea({
    formModel: JSON.stringify(jsonTemplate.ForScrollBoard),
    formateFn: 'textareaFormate',
    onEvents: [
      {
        type: 'isShow',
        eventValue: '0',
        eventName: 'changeDataType'
      }
    ]
  }),
  realData: widgetFields.FieldInput({
    label: '链接',
    onEvents: [
      {
        type: 'isShow',
        eventValue: '1',
        eventName: 'changeDataType'
      }
    ]
  })
})

export { setCommonDataFields }

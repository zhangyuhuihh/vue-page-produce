const widgetFields = {
  FieldInput({
    label,
    validator = [() => 'pass'],
    formModel = '',
    memorable = true,
    belongsTab,
    emitEvents = [],
    onEvents = []
  }) {
    return {
      type: 'FieldInput',
      formModel,
      validator,
      label,
      errorMsg: '',
      memorable,
      emitEvents,
      onEvents,
      belongsTab
    }
  },

  FieldTextArea({
    label,
    validator = [() => 'pass'],
    formModel = '',
    memorable = true,
    belongsTab,
    emitEvents = [],
    onEvents = [],
    formateFn = ''
  }) {
    return {
      type: 'FieldTextArea',
      formModel,
      validator,
      label,
      errorMsg: '',
      memorable,
      belongsTab,
      emitEvents,
      onEvents,
      formateFn
    }
  },

  FieldSelect({
    label,
    options,
    memorable = true,
    belongsTab,
    emitEvents = [],
    onEvents = []
  }) {
    return {
      type: 'FieldSelect',
      formModel: options[0].value,
      label,
      options,
      memorable,
      belongsTab,
      emitEvents,
      onEvents
    }
  },

  FieldColorPicker({ label, formModel, memorable = true, belongsTab = '' }) {
    return {
      type: 'FieldColorPicker',
      label,
      formModel,
      memorable,
      belongsTab
    }
  },

  FieldRadio({
    radios,
    validator = [() => 'pass'],
    memorable = true,
    belongsTab,
    emitEvents = [],
    onEvents = [],
    formModel = ''
  }) {
    return {
      type: 'FieldRadio',
      formModel,
      belongsTab,
      radios,
      validator,
      errorMsg: '',
      memorable,
      emitEvents,
      onEvents
    }
  },

  FieldSwitch({ label, formModel, memorable = true, belongsTab = '' }) {
    return {
      type: 'FieldSwitch',
      label,
      formModel,
      memorable,
      belongsTab
    }
  },

  FieldSlider({ label, formModel, min, max, memorable = true, belongsTab = '' }) {
    return {
      type: 'FieldSlider',
      label,
      formModel,
      min,
      max,
      memorable,
      belongsTab
    }
  }
}

export default widgetFields

const widgetFields = {
  FieldInput({
    label,
    validator = [() => 'pass'],
    formModel = '',
    memorable = true,
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
      onEvents
    }
  },

  FieldTextArea({
    label,
    validator = [() => 'pass'],
    formModel = '',
    memorable = true,
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
      emitEvents,
      onEvents,
      formateFn
    }
  },

  FieldSelect({
    label,
    options,
    memorable = true,
    emitEvents = [],
    onEvents = []
  }) {
    return {
      type: 'FieldSelect',
      formModel: options[0].value,
      label,
      options,
      memorable,
      emitEvents,
      onEvents
    }
  },

  FieldColorPicker({ label, formModel, memorable = true }) {
    return {
      type: 'FieldColorPicker',
      label,
      formModel,
      memorable
    }
  },

  FieldRadio({
    radios,
    validator = [() => 'pass'],
    memorable = true,
    emitEvents = [],
    onEvents = [],
    formModel = ''
  }) {
    return {
      type: 'FieldRadio',
      formModel,
      radios,
      validator,
      errorMsg: '',
      memorable,
      emitEvents,
      onEvents
    }
  },

  FieldSwitch({ label, formModel, memorable = true }) {
    return {
      type: 'FieldSwitch',
      label,
      formModel,
      memorable
    }
  },

  FieldSlider({ label, formModel, min, max, memorable = true }) {
    return {
      type: 'FieldSlider',
      label,
      formModel,
      min,
      max,
      memorable
    }
  }
}

export default widgetFields

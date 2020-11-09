const widgetFields = {
  FieldInput({
    label,
    validator = [() => 'pass'],
    formModel = '',
    memorable = true,
    belongsTab,
  }) {
    return {
      type: 'FieldInput',
      formModel,
      validator,
      label,
      errorMsg: '',
      memorable,
      belongsTab,
    }
  },

  FieldTextArea({
    label,
    validator = [() => 'pass'],
    formModel = '',
    memorable = true,
    belongsTab,
    formateFn = '',
  }) {
    return {
      type: 'FieldTextArea',
      formModel,
      validator,
      label,
      errorMsg: '',
      memorable,
      belongsTab,
      formateFn,
    }
  },

  FieldSelect({ label, options, formModel, memorable = true, belongsTab }) {
    return {
      type: 'FieldSelect',
      formModel,
      label,
      options,
      memorable,
      belongsTab,
    }
  },

  FieldColorPicker({ label, formModel, memorable = true, belongsTab = '' }) {
    return {
      type: 'FieldColorPicker',
      label,
      formModel,
      memorable,
      belongsTab,
    }
  },

  FieldRadio({
    radios,
    validator = [() => 'pass'],
    memorable = true,
    belongsTab,
    formModel = '',
  }) {
    return {
      type: 'FieldRadio',
      formModel,
      belongsTab,
      radios,
      validator,
      errorMsg: '',
      memorable,
    }
  },

  FieldSwitch({ label, formModel, memorable = true, belongsTab = '' }) {
    return {
      type: 'FieldSwitch',
      label,
      formModel,
      memorable,
      belongsTab,
    }
  },

  FieldSlider({
    label,
    formModel,
    min,
    max,
    memorable = true,
    belongsTab = '',
  }) {
    return {
      type: 'FieldSlider',
      label,
      formModel,
      min,
      max,
      memorable,
      belongsTab,
    }
  },

  FieldInputNumber({
    label,
    validator = [() => 'pass'],
    formModel = '',
    memorable = true,
    belongsTab,
    extraLabel,
    min,
    max,
  }) {
    return {
      type: 'FieldInputNumber',
      formModel,
      validator,
      label,
      errorMsg: '',
      memorable,
      belongsTab,
      extraLabel,
      min,
      max,
    }
  },
}

export default widgetFields

const widgetFields = {
  FieldInput({ label, validator = [() => 'pass'], formModel = '', memorable = true }) {
    return {
      type: 'FieldInput',
      formModel,
      validator,
      label,
      errorMsg: '',
      memorable
    }
  },

  FieldSelect({ label, options, memorable = true }) {
    return {
      type: 'FieldSelect',
      formModel: options[0].value,
      label,
      options
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

  FieldRadio({ type, radios, validator = [() => 'pass'], memorable = true }) {
    return {
      type: 'FieldRadio',
      formModel: '',
      radios,
      validator,
      errorMsg: '',
      memorable
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

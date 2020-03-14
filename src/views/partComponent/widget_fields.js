const widgetFields = {
  FieldInput({ label, validator = [() => 'pass'], formModel = '' }) {
    return {
      type: 'FieldInput',
      formModel,
      validator,
      label,
      errorMsg: ''
    }
  },

  FieldSelect({ label, options }) {
    return {
      type: 'FieldSelect',
      formModel: options[0].value,
      label,
      options
    }
  },

  FieldColorPicker({ label, formModel }) {
    return {
      type: 'FieldColorPicker',
      label,
      formModel
    }
  },

  FieldRadio({ type, radios, validator = [() => 'pass'] }) {
    return {
      type: 'FieldRadio',
      formModel: '',
      radios,
      validator,
      errorMsg: ''
    }
  },

  FieldSwitch({ label, formModel }) {
    return {
      type: 'FieldSwitch',
      label,
      formModel
    }
  },

  FieldSlider({ label, formModel, min, max }) {
    return {
      type: 'FieldSlider',
      label,
      formModel,
      min,
      max
    }
  }
}

export default widgetFields

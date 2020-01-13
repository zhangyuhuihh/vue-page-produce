const widgetFields = {
  FieldInput({ label, validator = [() => 'pass'] }) {
    return {
      type: 'FieldInput',
      formModel: '',
      validator,
      label,
      errorMsg: ''
    }
  },

  FieldSelect({ label, options }) {
    return {
      type: 'FieldSelect',
      formModel: options[0],
      label,
      options
    }
  },

  FieldColorPicker() {
    return {
      type: 'FieldColorPicker',
      formModel: 'rgb(0, 0, 0)'
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
  }
}

export default widgetFields

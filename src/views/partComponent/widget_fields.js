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

  FiledSwitch({ label, formModel }) {
    return {
      type: 'FiledSwitch',
      label,
      formModel
    }
  }
}

export default widgetFields

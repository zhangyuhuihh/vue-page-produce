const widgetCombineFields = {
  RadioInput({
    label,
    validator = [() => 'pass'],
    formModel = {},
    selections = [],
    memorable = true,
  }) {
    return {
      type: 'RadioInput',
      formModel,
      selections,
      validator,
      label,
      errorMsg: '',
      memorable,
    }
  },
}

export default widgetCombineFields

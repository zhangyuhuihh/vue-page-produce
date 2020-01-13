const widgetFieldsCombine = {
  FieldsDataSource({ radios, fakeData, validator }) {
    return {
      type: 'FieldsDataSource',
      formModel: {
        dataType: radios[0].value,
        url: '',
        fakeData: fakeData
      },
      radios,
      validator,
      errorMsg: ''
    }
  }
}

export default widgetFieldsCombine

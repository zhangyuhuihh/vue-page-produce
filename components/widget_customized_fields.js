const widgeCustomizedFields = {
  dataSource({ fakeData }) {
    return {
      type: 'DataSource',
      formModel: {
        type: 'fakeData',
        valueToShow: fakeData,
        url: '',
        fakeValue: fakeData,
      },
      fakeData,
    }
  },
}

export default widgeCustomizedFields

// 返回'pass'为通过，返回msg为不通过

const validateFieldDataSource = () => {
  return formModel => {
    if (formModel.dataType === 'real') {
      return formModel.url ? 'pass' : '请输入请求链接'
    }
    if (formModel.dataType === 'fake') {
      return formModel.fakeData ? 'pass' : '请输入正确的模拟数据'
    }
    return 'noPass'
  }
}

export default { validateFieldDataSource }

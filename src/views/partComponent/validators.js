// 返回'pass'为通过，返回msg为不通过

const requireInput = msg => {
  return formModel => {
    return formModel ? 'pass' : msg
  }
}

export default { requireInput }

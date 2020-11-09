export function textareaFormate(json1) {
  var json = json1 + ''
  if (json.indexOf('{') === -1 && json.indexOf('[') === -1) {
    return json
  } else {
    return formatJson(json)
  }
}

function repeat(s, count) {
  return new Array(count + 1).join(s)
}

function formatJson(json) {
  let i = 0
  let il = 0
  let tab = '  '
  let newJson = ''
  let indentLevel = 0
  let inString = false
  let currentChar = null
  for (i = 0, il = json.length; i < il; i += 1) {
    currentChar = json.charAt(i)
    switch (currentChar) {
      case '{':
      case '[':
        if (!inString) {
          newJson += currentChar + '\n' + repeat(tab, indentLevel + 1)
          indentLevel += 1
        } else {
          newJson += currentChar
        }
        break
      case '}':
      case ']':
        if (!inString) {
          indentLevel -= 1
          newJson += '\n' + repeat(tab, indentLevel) + currentChar
        } else {
          newJson += currentChar
        }
        break
      case ',':
        if (!inString) {
          newJson += ',\n' + repeat(tab, indentLevel)
        } else {
          newJson += currentChar
        }
        break
      case ':':
        if (!inString) {
          newJson += ': '
        } else {
          newJson += currentChar
        }
        break
      case ' ':
      case '\n':
      case '\t':
        if (inString) {
          newJson += currentChar
        }
        break
      case '"':
        if (i > 0 && json.charAt(i - 1) !== '\\') {
          inString = !inString
        }
        newJson += currentChar
        break
      default:
        newJson += currentChar
        break
    }
  }
  return newJson
}

const fs = require('fs')

export function jsonToDzn(json): string {
  let dzn = ''
  for (const [key, value] of Object.entries(json)) {
    dzn += key + ' = '
    if (Array.isArray(value)) {
      if (Array.isArray(value[0])) {
        // handle matrix values
        dzn += '[|'
        for (let i = 0; i < value.length; i++) {
          for (let j = 0; j < value[i].length; j++) {
            dzn += value[i][j]
            if (j < value[i].length - 1) {
              dzn += ', '
            }
          }
          if (i < value.length - 1) {
            dzn += ' | '
          }
        }
        dzn += '|]'
      } else {
        // handle array values
        dzn += '['
        for (let i = 0; i < value.length; i++) {
          dzn += value[i]
          if (i < value.length - 1) {
            dzn += ', '
          }
        }
        dzn += ']'
      }
    } else {
      // handle scalar values
      dzn += value
    }
    dzn += ';\n'
  }
  return dzn
}

export function clearFile(filePath): void {
  fs.truncate(filePath, 0, function (err) {
    if (err) throw err
  })
}

export function writeStringToFile(filePath, string): void {
  fs.writeFile(filePath, string, function (err) {
    if (err) throw err
  })
}

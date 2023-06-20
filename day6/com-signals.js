const getDataStreamBuffer = function (stream = '') {
  // const marker = []
  let markerPos = 0
  let startingPos = 0
  const bufferLength = 4
  const charMap = new Map()

  // while (markerPos < bufferLength - 1) {
  //   // marker[markerPos] = stream.charAt(markerPos)
  //   const currentChar = stream.charAt(markerPos)
  //   if (charMap.get(currentChar) >= 0) {
  //     startingPos = charMap.get(currentChar) + 1
  //   }
  //   charMap.set(currentChar, markerPos)
  //   markerPos++
  // }

  while (markerPos - startingPos < bufferLength && markerPos < stream.length) {
    const currentChar = stream.charAt(markerPos)
    if (charMap.get(currentChar) >= 0) {
      startingPos = charMap.get(currentChar) + 1
      // charMap.set(currentChar, markerPos)
    } else if (markerPos >= bufferLength - 1 && charMap.get(stream.charAt(markerPos - bufferLength - 1)) === markerPos - bufferLength - 1) {
      charMap.set(stream.charAt(markerPos - bufferLength - 1), -1)
      // charMap.set(currentChar, markerPos)
    }
    charMap.set(currentChar, markerPos)
    markerPos++
  }

  return markerPos
}

const getDataStreamBufferFromFile = function (file = '') {
  if (!file) {
    console.error('File not provided')
  }

  const fs = require('fs')
  return getDataStreamBufferFromFile(fs.readFileSync(file, 'utf8').toString())
}

module.exports = {
  getDataStreamBuffer, getDataStreamBufferFromFile
}

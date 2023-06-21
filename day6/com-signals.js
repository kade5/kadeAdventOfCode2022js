const getDataStreamBuffer = function (stream = '', bufferLength) {
  // const marker = []
  let markerPos = 0
  let startingPos = 0
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
      startingPos = Math.max(charMap.get(currentChar) + 1, startingPos)
      // charMap.set(currentChar, markerPos)
    }
    if (markerPos >= bufferLength - 1 && charMap.get(stream.charAt(markerPos - bufferLength + 1)) === markerPos - bufferLength + 1) {
      charMap.set(stream.charAt(markerPos - bufferLength + 1), -1)
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
  const buffer = getDataStreamBufferFromFile(fs.readFileSync(file, 'utf8'))
  return buffer.toString()
}

module.exports = {
  getDataStreamBuffer, getDataStreamBufferFromFile
}

const TreeNode = class {
  constructor (name, type, value = 0, parentNode = null) {
    this.name = name
    this.type = type
    this.value = value
    this.parentNode = parentNode
    this.descendents = []
  }
}

const addNewNode = function (currentTreeNode, input) {
  let newTreeNode = null
  if (input[0] === 'dir') {
    newTreeNode = new TreeNode(input[1], 'folder', 0, currentTreeNode)
  } else {
    newTreeNode = new TreeNode(input[1], 'file', input[0], currentTreeNode)
  }
  currentTreeNode.descendents.push(newTreeNode)
}

const changeDirectory = function (currentTreeNode, directoryName) {
  if (directoryName === '..') {
    return currentTreeNode.parentNode
  }
  for (let i = 0; i < currentTreeNode.descendents.length; i++) {
    if (currentTreeNode.descendents[i].type === 'folder' && currentTreeNode.descendents[i].name === directoryName) {
      return currentTreeNode.descendents[i]
    }
  }
  console.error('No directory ' + directoryName + ' found in ' + currentTreeNode.name)
  return null
}

const buildFileStructure = function (terminalOutput = []) {
  const tree = new TreeNode('/', 'folder')
  let currentTreeNode = tree

  let i = 1 // assuming first line is always "$ cd /" so it is skipped
  while (i < terminalOutput.length) {
    let input = terminalOutput[i].split(' ')

    if (input[0] === '$') {
      if (input[1] === 'ls') {
        i++
        input = terminalOutput[i].split(' ')
        while (input[0] !== '$' && i < terminalOutput.length) {
          addNewNode(currentTreeNode, input)
          i++
          if (i < terminalOutput.length) {
            input = terminalOutput[i].split(' ')
          }
        }
      }

      if (input[1] === 'cd') {
        currentTreeNode = changeDirectory(currentTreeNode, input[2])
      }
    }
    i++
  }

  return tree
}

const getTerminalOutputFromFile = function (file = '') {
  if (!file) {
    console.error('File not provided')
  }

  const fs = require('fs')
  return fs.readFileSync(file, 'utf8').toString().trim().split('\n')
}

module.exports = {
  getTerminalOutputFromFile, buildFileStructure
}

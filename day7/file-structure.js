const TreeNode = class {
  constructor (name, type, value = 0, fullpath = '/', parentNode = null) {
    this.name = name
    this.type = type
    this.value = value
    this.fullpath = fullpath
    this.parentNode = parentNode
    this.descendents = []
  }
}

const addNewNode = function (currentTreeNode, input) {
  let newTreeNode = null
  const dirName = currentTreeNode.fullpath + input[1]
  if (input[0] === 'dir') {
    newTreeNode = new TreeNode(input[1], 'folder', 0, dirName + '/', currentTreeNode)
  } else {
    newTreeNode = new TreeNode(input[1], 'file', input[0], dirName, currentTreeNode)
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

const calculateDirectorySize = function (parentNode, directoryMap) {
  let directorySize = 0
  if (parentNode.type === 'folder') {
    for (let item of parentNode.descendents) {
      if (item.type === 'file') {
        directorySize += Number(item.value)
      } else if (item.type === 'folder') {
        directorySize += calculateDirectorySize(item, directoryMap)
      }
    }
    directoryMap.set(parentNode.fullpath, directorySize)

    return directorySize
  }
}

const sumDirectorySizes = function(directoryMap) {
  let directorySize = 0

  for (const [key, value] of directoryMap.entries()) {
    if (value <= 100000) {
      directorySize += value
    }
  }
  return directorySize
}

const getTerminalOutputFromFile = function (file = '') {
  if (!file) {
    console.error('File not provided')
  }

  const fs = require('fs')
  return fs.readFileSync(file, 'utf8').toString().trim().split('\n')
}

const getRequiredSpace = function (totalDiskSpace, spaceNeeded, directoryMap) {
  const usedSpace = directoryMap.get('/')

  return spaceNeeded - (totalDiskSpace - usedSpace)
}

const getSpaceToDelete = function (totalDiskSpace, spaceNeeded, directoryMap) {
  let minimumDirectorySpace = totalDiskSpace
  const requiredSpace = getRequiredSpace(totalDiskSpace, spaceNeeded, directoryMap)
  for (const [key, value] of directoryMap.entries()) {
    if (value >= requiredSpace && value <= minimumDirectorySpace) {
      minimumDirectorySpace = value
    }
  }

  return minimumDirectorySpace
}
module.exports = {
  getTerminalOutputFromFile, buildFileStructure, calculateDirectorySize, sumDirectorySizes, getRequiredSpace, getSpaceToDelete
}

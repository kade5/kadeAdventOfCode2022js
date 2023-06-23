const fileStructure = require('./file-structure.js')

const terminalOutput = fileStructure.getTerminalOutputFromFile('test.txt')
const parentTree = fileStructure.buildFileStructure(terminalOutput)

const directoryMap = new Map()
const fullSize = fileStructure.calculateDirectorySize(parentTree, directoryMap)
const subDirectorySize = fileStructure.sumDirectorySizes(directoryMap)
console.assert(subDirectorySize === 95437, 'Test 1 95437:' + subDirectorySize)

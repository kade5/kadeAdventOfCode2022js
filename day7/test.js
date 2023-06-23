const fileStructure = require('./file-structure.js')

const terminalOutput = fileStructure.getTerminalOutputFromFile('test.txt')
const parentTree = fileStructure.buildFileStructure(terminalOutput)

const directoryMap = new Map()
const fullSize = fileStructure.calculateDirectorySize(parentTree, directoryMap)
const subDirectorySize = fileStructure.sumDirectorySizes(directoryMap)
console.assert(subDirectorySize === 95437, 'Test 1 95437:' + subDirectorySize)

const requiredSpace = fileStructure.getRequiredSpace(70000000, 30000000, directoryMap)
console.assert(requiredSpace === 8381165, 'Test 2 8381165:' + requiredSpace)

const directoryToDelete = fileStructure.getSpaceToDelete(70000000, 30000000, directoryMap)
console.assert(directoryToDelete === 24933642, 'Test 3 24933642:' + directoryToDelete)

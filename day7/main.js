const fileStructure = require('./file-structure.js')

const terminalOutput = fileStructure.getTerminalOutputFromFile('terminal.txt')
const parentTree = fileStructure.buildFileStructure(terminalOutput)

const directoryMap = new Map()
const fullSize = fileStructure.calculateDirectorySize(parentTree, directoryMap)
const subDirectorySize = fileStructure.sumDirectorySizes(directoryMap)
console.log("The sum of the total size of directories for part 1 is " + subDirectorySize)

const directoryToDelete = fileStructure.getSpaceToDelete(70000000, 30000000, directoryMap)
console.log("The directory that needs to be deleted for part 2 has a size of " + directoryToDelete)

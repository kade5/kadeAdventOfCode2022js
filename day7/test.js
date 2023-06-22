const fileStructure = require('./file-structure.js')

const terminalOutput = fileStructure.getTerminalOutputFromFile('test.txt')
const parentTree = fileStructure.buildFileStructure(terminalOutput)

console.log(parentTree.descendents)

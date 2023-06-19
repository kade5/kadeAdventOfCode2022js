const getNumStacks = function (stacks = '') {
  return stacks.trim().split('   ').length
}

const initializeStacks = function (numStacks) {
  const stacks = []
  for (let i = 0; i < numStacks; i++) {
    stacks.push([])
  }

  return stacks
}

const prepareCrates = function (crateDiagram = '') {
  const splitRows = crateDiagram.split('\n')
  const numStacks = getNumStacks(splitRows[splitRows.length - 1])
  const stacks = initializeStacks(numStacks)
  // console.log('Number of stacks: ' + numStacks)
  for (let i = splitRows.length - 2; i >= 0; i--) {
    const crates = splitRows[i]
    // console.log("'" + splitRows[i] + "'")
    let k = 0
    for (let j = 1; j < crates.length; j += 4) {
      if (crates[j] !== ' ') {
        stacks[k].push(crates[j])
      }
      k++
    }
  }
  return stacks
}

const performInstruction = function (stacks, instructionArray) {
  const numCrates = Number(instructionArray[1])
  const from = Number(instructionArray[3]) - 1
  const to = Number(instructionArray[5]) - 1

  // console.log('move ' + numCrates + ' to ' + to + ' from ' + from)

  for (let i = 1; i <= numCrates; i++) {
    stacks[to].push(stacks[from].pop())
  }
  return stacks
}

const moveCrates = function (file = '') {
  if (!file) {
    console.log('File not provided')
  }

  const fs = require('fs')
  const contents = fs.readFileSync(file, 'utf8').toString().split('\n\n')

  console.log(contents[0])
  const stacks = prepareCrates(contents[0])
  const instructions = contents[1].split('\n')
  let output = ''

  for (const instruction of instructions) {
    const instructionArray = instruction.split(' ')
    performInstruction(stacks, instructionArray)
  }

  for (let i = 0; i < stacks.length; i++) {
    output = output + stacks[i].pop()
  }

  return output
}

module.exports = {
  performInstruction, moveCrates, getNumStacks, prepareCrates
}

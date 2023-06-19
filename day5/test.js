const crates = require('./crate-stacking.js')

const test1 = crates.moveCrates('test.txt', crates.performInstruction9000)
console.assert(test1 === 'CMZ', 'moveCrates CMZ:' + test1)

const test9001 = crates.moveCrates('test.txt', crates.performInstruction9001)
console.assert(test9001 === 'MCD', 'moveCrates9001 MCD:' + test9001)

const test2 = crates.getNumStacks(' 1   2   3   4   5   6   7   8   9 ')
console.assert(test2 === 9, 'GetNumStacks 9:' + test2)

const crateDiagram =
`    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `
const stacks = crates.prepareCrates(crateDiagram)
console.assert(stacks[2][0] === 'P', 'prepareCrates P:' + stacks[2][0])

crates.performInstruction9000(stacks, 'move 1 from 2 to 1'.split(' '))
const test3 = stacks[0].pop()
console.assert(test3 === 'D', 'performInstruction t1 D:' + test3)
const test4 = stacks[1].pop()
console.assert(test4 === 'C', 'performInstruction t2 C:' + test4)

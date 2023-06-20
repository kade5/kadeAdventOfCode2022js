const comSigs = require('./com-signals.js')

const test1 = comSigs.getDataStreamBuffer('bvwbjplbgvbhsrlpgdmjqwftvncz')
const test2 = comSigs.getDataStreamBuffer('nppdvjthqldpwncqszvftbrmjlhg')
const test3 = comSigs.getDataStreamBuffer('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')
const test4 = comSigs.getDataStreamBuffer('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')

console.assert(test1 === 5, 'Test 1 5:' + test1)
console.assert(test2 === 6, 'Test 2 6:' + test2)
console.assert(test3 === 10, 'Test 3 10:' + test3)
console.assert(test4 === 11, 'Test 4 11:' + test4)

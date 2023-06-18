function getLargerRange (array = []) {
  let largestRange = 0
  let largestRangeIndex = 0

  for (let i = 0; i < array.length; i++) {
    const sub = array[i].split('-')
    const range = Number(sub[1]) - Number(sub[0])
    if (range > largestRange) {
      largestRange = range
      largestRangeIndex = i
    }
  }

  return largestRangeIndex
}

function rangeContained (assignments = []) {
  const largestRangeIndex = getLargerRange(assignments)
  const larger = assignments[largestRangeIndex].split('-')
  const smaller = assignments[(largestRangeIndex + 1) % 2].split('-')

  if (Number(larger[0]) <= Number(smaller[0]) && Number(larger[1]) >= Number(smaller[1])) {
    return true
  }

  return false
}

function cleaningAssignmentOverlap (file = '') {
  if (!file) {
    console.error('File not provided')
  }

  const fs = require('fs')
  const contents = fs.readFileSync(file, 'utf8').toString().trim().split('\n')
  let countContained = 0

  for (const pair of contents) {
    const assignments = pair.split(',')
    if (rangeContained(assignments)) {
      countContained += 1
    } else {
      console.log(assignments)
    }
  }

  return countContained
}

// const testArray = ['7-96', '16-47']
// console.log(rangeContained(testArray))
// console.log(getLargerRange(testArray))

console.log('Number of contained ranges: ' + cleaningAssignmentOverlap('assignments.txt'))
// Correct answer is 464

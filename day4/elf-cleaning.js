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

function rangeOverlap (assignments = []) {
  const range1 = assignments[0].split('-')
  const range2 = assignments[1].split('-')

  if (Number(range1[1]) >= Number(range2[0]) && Number(range2[1]) >= Number(range1[0])) {
    return true
  }
  return false
}

function cleaningAssignmentOverlap (file = '', logic) {
  if (!file) {
    console.error('File not provided')
  }

  const fs = require('fs')
  const contents = fs.readFileSync(file, 'utf8').toString().trim().split('\n')
  let countContained = 0

  for (const pair of contents) {
    const assignments = pair.split(',')
    if (logic(assignments)) {
      console.log(pair)
      countContained += 1
    }
  }

  return countContained
}

// const testArray = ['7-96', '16-47']
// console.log(rangeContained(testArray))
// console.log(getLargerRange(testArray))

// console.log('Number of contained ranges: ' + cleaningAssignmentOverlap('assignments.txt', rangeContained))
console.log('Number of contained ranges: ' + cleaningAssignmentOverlap('assignments.txt', rangeOverlap))
// Correct answer is 464

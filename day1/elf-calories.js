function isPositiveInt (value) {
  return /^\d+$/.test(value)
}

function sortElves (topElves) {
  if (topElves.sort) {
    return
  }
  for (let i = 0; i < topElves.elves.length; i++) {
    if (topElves.elves[i] < topElves.smallestMax) {
      topElves.smallestMax = topElves.elves[i]
      topElves.smallestMaxIndex = i
    }
  }
  // console.log('Smallest Max Function: ' + topElves.elves[0])
  topElves.sort = true
}

async function largestElfCalories (file = '', ofTopNElves = 1) {
  if (!file) {
    return
  }
  const separator = ''
  const topElves = {
    smallestMax: 0,
    smallestMaxIndex: 0,
    sort: true,
    elves: new Array(ofTopNElves).fill(0)
  }
  // let elfNum = 1
  let currentElfCalorieTotal = 0
  const fs = require('node:fs')
  const readline = require('node:readline')

  const fileInterface = readline.createInterface({
    input: fs.createReadStream(file)
  })
  for await (const line of fileInterface) {
    // console.log('Current Line: ' + line)
    if (line === separator) {
      // elfNum += 1
      await sortElves(topElves)
      if (currentElfCalorieTotal > topElves.smallestMax) {
        topElves.elves[topElves.smallestMaxIndex] = currentElfCalorieTotal
        topElves.smallestMax = currentElfCalorieTotal
        topElves.sort = false
      }
      console.log('Elf Calories Count: ' + currentElfCalorieTotal)
      console.log('Smallest Max:' + topElves.smallestMax)
      currentElfCalorieTotal = 0
    } else {
      if (!isPositiveInt(line)) {
        console.log('Not a valid File')
        return
      }
      currentElfCalorieTotal += Number(line)
      // console.log('Current Elf Calories Count: ' + currentElfCalorieTotal)
    }
  }
  await sortElves(topElves)
  if (currentElfCalorieTotal > topElves.smallestMax) {
    topElves.elves[topElves.smallestMaxIndex] = currentElfCalorieTotal
  }
  return topElves.elves
}

function sumElfCalories (elves) {
  let sum = 0
  for (let i = 0; i < elves.length; i++) {
    sum += elves[i]
  }
  return sum
}

async function printLargestAmount () {
  const elves = await largestElfCalories('elf.txt', 3)
  console.log(elves)
  const max = sumElfCalories(elves)
  console.log('Elf is carrying: ' + max)
}

printLargestAmount()

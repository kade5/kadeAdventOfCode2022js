function isPositiveInt (value) {
  return /^\d+$/.test(value)
}

async function largestElfCalories (file = '') {
  if (!file) {
    return
  }
  const separator = ''
  // let elfNum = 1
  let maxCalories = 0
  let currentElfCalorieTotal = 0
  const fs = require('node:fs')
  const readline = require('node:readline')

  const fileInterface = readline.createInterface({
    input: fs.createReadStream(file)
  })
  for await (const line of fileInterface) {
    console.log('Current Line: ' + line)
    console.log('Max Calorie Count: ' + maxCalories)
    if (line === separator) {
      // elfNum += 1
      if (currentElfCalorieTotal > maxCalories) {
        maxCalories = currentElfCalorieTotal
      }
      currentElfCalorieTotal = 0
    } else {
      if (!isPositiveInt(line)) {
        console.log('Not a valid File')
        return
      }
      currentElfCalorieTotal += Number(line)
      console.log('Current Elf Calories Count: ' + currentElfCalorieTotal)
    }
  }
  return currentElfCalorieTotal > maxCalories ? currentElfCalorieTotal : maxCalories
}

async function printLargestAmount () {
  const max = await largestElfCalories('elf.txt')
  console.log('Elf is carrying: ' + max)
}

printLargestAmount()

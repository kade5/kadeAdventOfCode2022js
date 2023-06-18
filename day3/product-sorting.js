function productPriorityValue (product) {
  const lowerA = 'a'.charCodeAt()
  const lowerZ = 'z'.charCodeAt()
  const upperA = 'A'.charCodeAt()
  const upperZ = 'Z'.charCodeAt()
  const pValue = product.charCodeAt()

  if (pValue >= lowerA && pValue <= lowerZ) {
    return pValue - lowerA + 1
  } else if (pValue >= upperA && pValue <= upperZ) {
    return pValue - upperA + 27
  } else {
    console.error('%s is not a valid character', product)
  }
}
function productSorting (file = '') {
  if (!file) {
    console.error('File not provided')
  }

  const fs = require('fs')
  const contents = fs.readFileSync(file, 'utf8').toString().trim().split('\n')
  let totalScore = 0

  for (const sack of contents) {
    console.log(sack)
    const itemMap = new Map()
    const midpoint = sack.length / 2
    let commonItem = null
    for (let i = 0; i < midpoint; i++) {
      itemMap.set(sack[i], true)
    }

    for (let i = midpoint; i < sack.length; i++) {
      if (itemMap.get(sack[i])) {
        commonItem = sack[i]
        break
      }
    }
    console.log('Common item: ' + commonItem)

    if (!commonItem) {
      console.error('No common item found')
    }

    totalScore += productPriorityValue(commonItem)
  }

  return totalScore
}

function badgeFinding (file = '') {
  if (!file) {
    console.error('File not provuded')
  }

  const fs = require('fs')
  const contents = fs.readFileSync(file, 'utf8').toString().trim().split('\n')
  let totalScore = 0
  const groupSize = 3

  for (let i = 0; i < contents.length; i += groupSize) {
    const firstSack = new Map()
    const sameProducts = new Map()
    let commonItem = null

    // console.log(contents[i] + '\n' + contents[i + 1] + '\n' + contents[i + 2])

    for (let c = 0; c < contents[i].length; c++) {
      firstSack.set(contents[i][c], true)
    }

    for (let c = 0; c < contents[i + 1].length; c++) {
      if (firstSack.get(contents[i + 1][c])) {
        sameProducts.set(contents[i + 1][c], true)
      }
    }

    for (let c = 0; c < contents[i + 2].length; c++) {
      if (sameProducts.get(contents[i + 2][c])) {
        commonItem = contents[i + 2][c]
        break
      }
    }

    if (!commonItem) {
      console.log('No common Item found')
    }

    totalScore += productPriorityValue(commonItem)
  }

  return totalScore
}

console.log('The sum of the priority values for part 1 are: ' + productSorting('products.txt'))
console.log('The sum of the priority values for part 2 are: ' + badgeFinding('products.txt'))

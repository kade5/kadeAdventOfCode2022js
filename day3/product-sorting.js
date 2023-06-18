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

console.log('The sum of the priority values are: ' + productSorting('products.txt'))

const getTreeMapFromFile = function (file = '') {
  if (!file) {
    console.error('File not provided')
  }

  const fs = require('fs')
  const treeMap = fs.readFileSync(file, 'utf8').toString().trim().split('\n')
  for (let i = 0; i < treeMap.length; i++) {
    treeMap[i] = treeMap[i].split('')
    for (let j = 0; j < treeMap[i].length; j++) {
      treeMap[i][j] = Number(treeMap[i][j])
    }
  }

  return treeMap
}

const setTreeVisibilityDirection = function (direction, treeMap, visibilityArray) {

  let tallestTree = -1

  if (direction === 'left') {
    for (let i = 0; i < treeMap.length; i++) {
      for (let j = 0; j < treeMap[i].length; j++) {
        if (treeMap[i][j] > tallestTree) {
          tallestTree = treeMap[i][j]
          visibilityArray[i][j] = 1
        } if (treeMap[i][j] === 9) {
          visibilityArray[i][j] = 1
          tallestTree = -1
          break
        }
      }
      tallestTree = -1
    }

  } else if (direction === 'up') {
    for (let j = 0; j < treeMap[0].length; j++) {
      for (let i = 0; i < treeMap.length; i++) {
        if (treeMap[i][j] > tallestTree) {
          tallestTree = treeMap[i][j]
          visibilityArray[i][j] = 1
        } if (treeMap[i][j] === 9) {
          visibilityArray[i][j] = 1
          tallestTree = -1
          break
        }
      }
      tallestTree = -1
    }
  } else if (direction === 'bottom') {
     for (let j = treeMap[0].length - 1; j >= 0; j--) {
       for (let i = treeMap.length - 1; i >= 0; i--) {
         if (treeMap[i][j] > tallestTree) {
          tallestTree = treeMap[i][j]
          visibilityArray[i][j] = 1
        } if (treeMap[i][j] === 9) {
          tallestTree = -1
          break
        }
      }
      tallestTree = -1
    }
  } else if (direction === 'right') {
    for (let i = 0; i < treeMap.length; i++) {
      for (let j = treeMap[0].length - 1; j >= 0; j--) {
         if (treeMap[i][j] > tallestTree) {
          tallestTree = treeMap[i][j]
          visibilityArray[i][j] = 1
        } if (treeMap[i][j] === 9) {
          tallestTree = -1
          break
        }
      }
      tallestTree = -1
    }
  } else {
    console.error('Invalid direction ' + direction)
  }
}

const findScenicScore = function (row, column, treeMap) {
  if (row <= 0 || column <= 0 || row >= treeMap.length || column >= treeMap[0].length) {
    return 0
  }

  let scenicScore = 1
  let currentCount = 0
  const treeSize = treeMap[row][column]

  //UP
  for (let i = row - 1; i >= 0; i--) {
    if (treeMap[i][column] >= treeSize) {
      currentCount += 1
      break
    } else {
    currentCount += 1
    }
  }
  if (currentCount === 0) {
    return 0
  }

  scenicScore = scenicScore * currentCount
  currentCount = 0

  //DOWN
  for (let i = row + 1; i < treeMap.length ; i++) {
    if (treeMap[i][column] >= treeSize) {
      currentCount += 1
      break
    } else {
    currentCount += 1
    }
  }
  if (currentCount === 0) {
    return 0
  }

  scenicScore = scenicScore * currentCount
  currentCount = 0


  //LEFT
  for (let j = column - 1; j >= 0; j--) {
    if (treeMap[row][j] >= treeSize) {
      currentCount += 1
      break
    } else {
    currentCount += 1
    }
  }
  if (currentCount === 0) {
    return 0
  }

  scenicScore = scenicScore * currentCount
  currentCount = 0

  //
  for (let j = column + 1; j  < treeMap[0].length; j++) {
    if (treeMap[row][j] >= treeSize) {
      currentCount += 1
      break
    } else {
    currentCount += 1
    }
  }
  if (currentCount === 0) {
    return 0
  }

  scenicScore = scenicScore * currentCount

  return scenicScore
}

const findBestScenicScore =  function (treeMap) {
  let bestScore = 0
  for (let i = 0; i < treeMap.length; i++) {
    for (let j = 0; j < treeMap[i].length; j++) {
      let score = findScenicScore(i, j, treeMap)
      if (score > bestScore) {
        bestScore = score
      }
    }
  }

  return bestScore
}

const getArraySize = function (treeMap) {
  const n = treeMap.length
  const m = treeMap[0].length
  return [m,n]
}

const setTreeVisibility = function (treeMap, visibilityArray) {
  setTreeVisibilityDirection('up', treeMap, visibilityArray)
  setTreeVisibilityDirection('right', treeMap, visibilityArray)
  setTreeVisibilityDirection('left', treeMap, visibilityArray)
  setTreeVisibilityDirection('bottom', treeMap, visibilityArray)
}

const countVisibleTrees = function (visibilityArray) {
  let sumVisibleTrees = 0
  for (let i = 0; i < visibilityArray.length; i++) {
    for (let j = 0; j < visibilityArray[i].length; j++) {
      sumVisibleTrees += visibilityArray[i][j]
    }
  }

  return sumVisibleTrees
}


module.exports = {
  getTreeMapFromFile, getArraySize, setTreeVisibilityDirection, setTreeVisibility, countVisibleTrees, findScenicScore, findBestScenicScore
}

const visible = require('./visible-trees.js')
const helpers = require('../modules/helpers.js')

const treeMap = visible.getTreeMapFromFile('test.txt')
const treeSize = visible.getArraySize(treeMap)
const visibilityArray = helpers.fillArray(treeSize[0], treeSize[1], 0)
console.log(treeMap)

visible.setTreeVisibility(treeMap, visibilityArray)
console.log(visibilityArray)
const sumVisibleTrees = visible.countVisibleTrees(visibilityArray)
console.assert(sumVisibleTrees === 21, 'Test 1 21:' + sumVisibleTrees)

const scenicScore = visible.findScenicScore(1, 2, treeMap)
console.assert(scenicScore === 4, 'Test 2 4:' + scenicScore)

const bestScenicScore = visible.findBestScenicScore(treeMap)
console.assert(bestScenicScore === 8, 'Test 3 8:' + bestScenicScore)

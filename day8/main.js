const visible = require('./visible-trees.js')
const helpers = require('../modules/helpers.js')

const treeMap = visible.getTreeMapFromFile('trees.txt')
const treeSize = visible.getArraySize(treeMap)
const visibilityArray = helpers.fillArray(treeSize[0], treeSize[1], 0)

visible.setTreeVisibility(treeMap, visibilityArray)
const sumVisibleTrees = visible.countVisibleTrees(visibilityArray)
console.log('The number of visible trees for part 1 is ' + sumVisibleTrees)

const bestScenicScore = visible.findBestScenicScore(treeMap)
console.log('The best scenic score for part 2 is ' + bestScenicScore)

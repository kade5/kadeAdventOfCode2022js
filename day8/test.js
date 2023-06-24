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

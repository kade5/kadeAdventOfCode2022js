const rpsValues = new Map()
rpsValues.set('A', 1) // Rock
rpsValues.set('B', 2) // Paper
rpsValues.set('C', 3) // Scissors
rpsValues.set('X', 1) // Rock
rpsValues.set('Y', 2) // Paper
rpsValues.set('Z', 3) // Scissors

const winner = new Map()
winner.set(1, 3) // Rock beats Scissors
winner.set(2, 1) // Paper beats Rock
winner.set(3, 2) // Scissors beats Paper

const draw = 3
const win = 6
const loss = 0

function gameScore (opponent, you) {
  const opponentPlay = rpsValues.get(opponent)
  const yourPlay = rpsValues.get(you)

  if (opponentPlay === yourPlay) {
    return yourPlay + draw
  } else if (winner.get(yourPlay) === opponentPlay) {
    return yourPlay + win
  } else {
    return yourPlay + loss
  }
}
function calculateScore (file = '') {
  if (!file) {
    return
  }
  const fs = require('fs')
  const contents = fs.readFileSync(file, 'utf8').toString().trim().split('\n')
  let totalScore = 0
  const separator = ' '
  const rpsValues = new Map()
  rpsValues.set('A', 1)
  rpsValues.set('B', 2)
  rpsValues.set('C', 3)
  rpsValues.set('X', 1)
  rpsValues.set('Y', 2)
  rpsValues.set('Z', 3)

  for (const game of contents) {
    const gameArray = game.split(separator)
    console.log(gameArray)
    totalScore += gameScore(gameArray[0], gameArray[1])
  }

  return totalScore
}

console.log('Your total score is: ' + calculateScore('strategy.txt'))

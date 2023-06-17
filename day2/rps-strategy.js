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

const loser = new Map()
loser.set(1, 2) // Rock loses to Paper
loser.set(2, 3) // Paper loses to Scissors
loser.set(3, 1) // Scissors loses to Rock

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

function gameScore2 (opponent, you) {
  const opponentPlay = rpsValues.get(opponent)
  if (you === 'X') {
    return winner.get(opponentPlay) + loss
  } else if (you === 'Z') {
    return loser.get(opponentPlay) + win
  } else {
    return opponentPlay + draw
  }
}
function calculateScore (file = '', gameLogic) {
  if (!file) {
    return
  }
  const fs = require('fs')
  const contents = fs.readFileSync(file, 'utf8').toString().trim().split('\n')
  let totalScore = 0
  const separator = ' '

  for (const game of contents) {
    const gameArray = game.split(separator)
    totalScore += gameLogic(gameArray[0], gameArray[1])
  }

  return totalScore
}

console.log('Your total score for part 1 is: ' + calculateScore('strategy.txt', gameScore))
console.log('Your total score for part 2 is: ' + calculateScore('strategy.txt', gameScore2))

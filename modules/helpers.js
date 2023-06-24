const fillArray = function (rows, columns, value) {
  return Array(rows).fill().map(() => Array(columns).fill(value))
}

module.exports = {
  fillArray
}

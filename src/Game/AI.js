// non-recursive minimax alpha-beta pruning
// https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning
export default class AI {
  minPlayer = 1 // (X)
  maxPlayer = 2 // (O)

  search (board) {
    let bestMoveValue = -Infinity
    let move = 0

    for (let i = 0; i < board.length; i++) {
      let newBoard = this.move(i, this.maxPlayer, board)
      if (newBoard) {
        let predictedMoveValue = this.minMoveValue(newBoard)
        if (predictedMoveValue > bestMoveValue) {
          bestMoveValue = predictedMoveValue
          move = i
        }
      }
    }

    return move
  }

  minMoveValue (board) {
    if (this.isWinner(this.maxPlayer, board)) return Infinity
    if (this.isWinner(this.minPlayer, board)) return -Infinity
    if (this.isTie(board)) return 0

    let bestMoveValue = Infinity

    for (let i = 0; i < board.length; i++) {
      let newBoard = this.move(i, this.minPlayer, board)
      if (newBoard) {
        let predictedMoveValue = this.maxMoveValue(newBoard)
        if (predictedMoveValue < bestMoveValue) bestMoveValue = predictedMoveValue
      }
    }

    return bestMoveValue
  }

  maxMoveValue (board) {
    if (this.isWinner(this.maxPlayer, board)) return Infinity
    if (this.isWinner(this.minPlayer, board)) return -Infinity
    if (this.isTie(board)) return 0

    let bestMoveValue = -Infinity

    for (let i = 0; i < board.length; i++) {
      let newBoard = this.move(i, this.maxPlayer, board)
      if (newBoard) {
        let predictedMoveValue = this.minMoveValue(newBoard)
        if (predictedMoveValue > bestMoveValue) bestMoveValue = predictedMoveValue
      }
    }

    return bestMoveValue
  }

  move (move, player, board) {
    let newBoard = this.clone(board)

    if (newBoard[move] === 0) {
      newBoard[move] = player
      return newBoard
    }
    return
  }

  clone (board) {
    return board.slice(0)
  }

  isWinner (player, board) {
    // hacky winning states table
    return (
      (board[0] === player && board[1] === player && board[2] === player) ||
      (board[3] === player && board[4] === player && board[5] === player) ||
      (board[6] === player && board[7] === player && board[8] === player) ||
      (board[0] === player && board[3] === player && board[6] === player) ||
      (board[1] === player && board[4] === player && board[7] === player) ||
      (board[2] === player && board[5] === player && board[8] === player) ||
      (board[0] === player && board[4] === player && board[8] === player) ||
      (board[2] === player && board[4] === player && board[6] === player)
    )
  }

  isTie (board) {
    return !board.some(x => x === 0)
  }
}

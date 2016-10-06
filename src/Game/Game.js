import { EventEmitter } from 'events'
import AI from './AI'

export default class Game extends EventEmitter {
  ai = new AI()
  board = this.init()
  scores = [0, 0]
  player = (Math.random() >= 0.5) ? 1 : 2

  setup () {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0]
  }

  init () {
    this.board = this.setup()
    this.emit('moved', {board: this.board})
  }

  update (msg) {
    this.player = msg.player

    if (msg.position) {
      this.board[msg.position] = msg.player
    } else {
      const aiMove = this.ai.search(this.board)
      this.board[aiMove] = msg.player
    }

    if (this.ai.isWinner(msg.player, this.board)) {
      this.scores[msg.player-1] += 1
      return this.emit('won', {player: msg.player, scores: this.scores})
    }

    if (this.ai.isTie(this.board)) {
      this.scores[0] += 1
      this.scores[1] += 1
      return this.emit('tie', {player: msg.player, scores: this.scores})
    }

    this.emit('moved', {board: this.board})
  }
}

import React from 'react'
import Board from './Board'
import Game from '../Game/Game'

export default class App extends React.Component {
  game = new Game()
  state = {
    1: '',
    2: '',
    scores: [0, 0],
  }

  constructor () {
    super()
    this.game.on('moved', msg => this.setState({1: '', 2: ''}))
    this.game.on('won', msg => this.setState({[msg.player]: 'WON', scores: msg.scores}))
    this.game.on('tie', msg => this.setState({[msg.player]: 'TIE', scores: msg.scores}))
  }

  componentDidMount () {
    this.game.init()
  }

  render () {
    const disabled = !(this.state[1] === '' && this.state[2] === '')
    return (
      <div className="container">
        <div className="score">
          <span>Player</span>
          <span>{this.state.scores[0]} : {this.state.scores[1]}</span>
          <span>AI</span>
        </div>
        <div className="status">
          <span>{this.state[1]}</span>
          <span><button className="btn" onClick={() => this.game.init()}>Restart</button></span>
          <span>{this.state[2]}</span>
        </div>
        <Board game={this.game} disabled={disabled} />
      </div>
    )
  }
}


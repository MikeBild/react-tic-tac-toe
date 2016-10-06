import React, { PropTypes } from 'react'

export default class Board extends React.Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  state = {
    tiles: [],
  }

  constructor (props) {
    super(props)

    props.game.on('moved', game => {
      this.setState({tiles: game.board})
      if (props.game.player === 1) props.game.update({ player: 2 })
    })
  }

  componentDidMount () {
    this.setState({tiles: this.props.game.board})
  }

  handleTileChoosed (position, tileNumber) {
    if (this.props.disabled) return
    if (position !== 0) return

    this.props.game.update({position: tileNumber, player: 1})
  }

  render () {
    return (
      <div className="board">
      {
        this.state.tiles.map((position, tileNumber) =>
          <div key={tileNumber} onClick={() => this.handleTileChoosed(position, tileNumber)} className="board-cell">
            {
              position === 0 ? '' : position === 1 ? <h1>X</h1> : <h1>O</h1>
            }
          </div>
        )
      }
      </div>
    )
  }
}

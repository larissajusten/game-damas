import React, { Component } from 'react';
import { connect } from 'react-redux';
import setGameType from '../../redux/gameType.action';
import './options.style.scss';

export const gameTypesArr = [
  { name: 'default-game-type', label: 'Brasileiro (64 casas)', value: {boardSize: 64, lineSize: 8, columnSize: 8, piecesPerPlayer: 12}},
  { name: 'global-game-type', label: 'Mundial (100 casas)', value: {boardSize: 100, lineSize: 10, columnSize: 10, piecesPerPlayer: 20}}
]

class OptionsScreen extends Component {

  renderTypes = () => {
    return gameTypesArr.map((type, key) => {
      console.log(this.props.setGameType)
      return (
        <div className="game-type-option">
          <input type="radio" className="game-type-radio" name='game-type' value={type.value} onClick={() => {this.props.setGameType(type.value)}}/>
          {type.label}
        </div>
      );
    })
  }
  
  render() {
    return (
      <>
        <h4 id="subtitle">Tipos de jogos:</h4>
        <div className="types-container">
          {this.renderTypes()}
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setGameType: (payload) => dispatch(setGameType(payload))
});

export const optionsScreen = connect(mapStateToProps, mapDispatchToProps)(OptionsScreen);
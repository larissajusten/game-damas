import React, { Component } from 'react';
import { connect } from 'react-redux';
import { House } from '../../components/index';
import setGameType from '../../redux/gameType.action';
import './board.style.scss';

class BoardScreen extends Component {
  
  constructor(props) {
    super(props);
    this.board = Array(this.props.gameType.lineSize).fill(Array(this.props.gameType.columnSize).fill(0));
  }

  handleClick(posLine, posColumn) { console.log('handle click on the house: ' + posLine + posColumn) }

  renderHouses = () => {
    return (
      <>
      {this.board.map((row, i) => (
        <div key={i}>
          {this.board.map((col, j) => (
            <span key={j}><House isOccupied={false} onClick={() => this.handleClick(i, j)}/></span>
          ))}
        </div>
      ))}
      </>
    );
  }

  render() {
    console.log(this.props)
    return (
      <>
      <div> Board </div>
      <div className="board-container">
        {this.renderHouses()} 
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

export const boardScreen = connect(mapStateToProps, mapDispatchToProps)(BoardScreen);

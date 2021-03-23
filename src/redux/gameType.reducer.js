const INITAL_STATE = {
  gameType: {
    boardSize: 64,
    lineSize: 8,
    columnSize: 8,
    piecesPerPlayer: 12
  }
}

const gameTypeReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case 'gameTypeChange':
      return {
        gameType: action.payload
      }
    default:
      return state
  }
}

export default gameTypeReducer
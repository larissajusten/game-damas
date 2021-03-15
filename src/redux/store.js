import { createStore, applyMiddleware } from "redux";
import reducer from "./gameType.reducer";

import { composeWithDevTools } from 'redux-devtools-extension';

function store(state = { gameType: {boardSize: 64, lineSize: 8, columnSize: 8, piecesPerPlayer: 12} }) {
  return createStore(reducer, state, composeWithDevTools(applyMiddleware()));
}

export default store;
import { createStore } from 'redux'
import gameTypeReducer from './gameType.reducer'

export const store = createStore(gameTypeReducer);

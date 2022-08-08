import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import asks from './asks';

const rootReducer = combineReducers({
  player,
  token,
  asks,
});

export default rootReducer;

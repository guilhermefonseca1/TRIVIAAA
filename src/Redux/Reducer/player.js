import { SAVE_PLAYER_INFO, GET_SCORE_POINTS, GET_NEXT_BTN_CLICK,
  HANDLE_DISABLE_BTNS,
  GET_TIMER,
  GET_ASSERTIONS } from '../Action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  nextBtnClick: false,
  isDisabled: false,
  timer: 30,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_PLAYER_INFO:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case GET_SCORE_POINTS:
    return {
      ...state,
      score: state.score + action.score,
    };
  case GET_NEXT_BTN_CLICK:
    return {
      ...state,
      nextBtnClick: action.bool,
    };
  case HANDLE_DISABLE_BTNS:
    return {
      ...state,
      isDisabled: action.bool,
    };
  case GET_TIMER:
    return {
      ...state,
      timer: action.timer,
    };
  case GET_ASSERTIONS:
    console.log(action);
    return {
      ...state,
      assertions: state.assertions + action.addPoint,
    };
  default:
    return state;
  }
};

export default player;

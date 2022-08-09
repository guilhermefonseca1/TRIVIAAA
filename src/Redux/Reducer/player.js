import { SAVE_PLAYER_INFO, GET_SCORE_POINTS, GET_NEXT_BTN_CLICK,
  HANDLE_DISABLE_BTNS,
  GET_TIMER,
  GET_ASSERTIONS } from '../Action';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
    console.log(state.nextBtnClick);
    return {
      ...state,
      nextBtnClick: state.bool,
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
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  default:
    return state;
  }
};

export default player;

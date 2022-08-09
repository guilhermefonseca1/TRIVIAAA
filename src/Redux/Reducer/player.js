import { SAVE_PLAYER_INFO, GET_SCORE_POINTS, GET_NEXT_BTN_CLICK,
  HANDLE_DISABLE_BTNS } from '../Action';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  nextBtnClick: false,
  isDisabled: false,
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
      score: state.score + 1,
    };
  case GET_NEXT_BTN_CLICK:
    console.log(state.nextBtnClick);
    return {
      ...state,
      nextBtnClick: !state.nextBtnClick,
    };
  case HANDLE_DISABLE_BTNS:
    console.log(action.bool);
    return {
      ...state,
      isDisabled: action.bool,
    };
  default:
    return state;
  }
};

export default player;

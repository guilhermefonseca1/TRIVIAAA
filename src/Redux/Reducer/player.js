import { SAVE_USER } from '../Action';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      name: action.payload.user,
      gravatarEmail: action.payload.email,
    };
  default:
    return state;
  }
};

export default player;

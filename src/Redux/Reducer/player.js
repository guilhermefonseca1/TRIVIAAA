<<<<<<< HEAD
import { SAVE_PLAYER_INFO } from '../Action';
=======
import { SAVE_USER } from '../Action';
>>>>>>> 997157b98d4a45bb69b72382fa2911f2437b05ae

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
<<<<<<< HEAD
  case SAVE_PLAYER_INFO:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
=======
  case SAVE_USER:
    return {
      ...state,
      name: action.payload.user,
      gravatarEmail: action.payload.email,
>>>>>>> 997157b98d4a45bb69b72382fa2911f2437b05ae
    };
  default:
    return state;
  }
};

export default player;

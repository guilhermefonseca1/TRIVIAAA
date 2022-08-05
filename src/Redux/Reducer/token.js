import { REQUEST_TOKEN, SAVE_TOKEN, FAILED_REQUEST } from '../Action';

const INITIAL_STATE = {
  responseCode: 0,
  responseMessage: '',
  token: '',
  isLoading: false,
  error: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      isLoading: true,
    };
  case SAVE_TOKEN:
    return {
      ...state,
      responseCode: action.data.response_code,
      responseMessage: action.data.response_message,
      token: action.data.token,
      isLoading: false,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default token;

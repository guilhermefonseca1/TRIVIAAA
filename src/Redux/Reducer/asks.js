import { GET_QUESTIONS } from '../Action';

const INITIAL_STATE = {
  responseCode: 0,
  results: [],
};

const asks = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return {
      ...state,
      responseCode: action.response_code,
      results: action.data.results,
    };
  default:
    return state;
  }
};

export default asks;

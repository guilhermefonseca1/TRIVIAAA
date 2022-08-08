import fetchToken from '../../services/fetchTokenApi';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SAVE_PLAYER_INFO = 'SAVE_PLAYER_INFO';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_USER = 'SAVE_USER';

export const requestToken = () => ({ type: REQUEST_TOKEN });

export const saveToken = (data) => ({ type: SAVE_TOKEN, data });

export const failedRequest = (error) => ({ type: FAILED_REQUEST, error });

export const savePlayerInfo = (name, email) => ({ type: SAVE_PLAYER_INFO, name, email });

export const getQuestions = (data) => ({ type: GET_QUESTIONS, data });

export const getToken = () => async (dispatch) => {
  dispatch(requestToken);
  try {
    const response = await fetchToken();
    dispatch(saveToken(response));

    const url = `https://opentdb.com/api.php?amount=5&token=${response.token}`;
    const responseAsk = await fetch(url);
    const json = await responseAsk.json();

    dispatch(getQuestions(json));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

// export const saveUser = (user, email) => ({
//   type: SAVE_USER,
//   payload: { user, email },
// });

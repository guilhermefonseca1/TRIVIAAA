import fetchToken from '../../services/fetchTokenApi';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SAVE_PLAYER_INFO = 'SAVE_PLAYER_INFO';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SAVE_USER = 'SAVE_USER';
export const GET_SCORE_POINTS = 'SCORE_POINTS';
export const GET_NEXT_BTN_CLICK = 'GET_NEXT_BTN_CLICK';
export const HANDLE_DISABLE_BTNS = 'HANDLE_DISABLE_BTNS';
export const GET_TIMER = 'GET_TIMER';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';
export const STOP_TIMER = 'STOP_TIMER';

export const requestToken = () => ({ type: REQUEST_TOKEN });

export const saveToken = (data) => ({ type: SAVE_TOKEN, data });

export const failedRequest = (error) => ({ type: FAILED_REQUEST, error });

export const savePlayerInfo = (name, email) => ({ type: SAVE_PLAYER_INFO, name, email });

export const getQuestions = (data) => ({ type: GET_QUESTIONS, data });

export const getScorePoints = (score) => ({ type: GET_SCORE_POINTS, score });

export const getNextBtnClick = (bool) => ({ type: GET_NEXT_BTN_CLICK, bool });

export const handleDisableBtns = (bool) => ({ type: HANDLE_DISABLE_BTNS, bool });

export const getTimer = (timer) => ({ type: GET_TIMER, timer });

export const getAssertions = () => ({ type: GET_ASSERTIONS });

export const stopTimer = () => ({ type: STOP_TIMER });

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

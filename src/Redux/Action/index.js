import fetchToken from '../../services/fetchTokenApi';

const REQUEST_TOKEN = 'REQUEST_TOKEN';
const SAVE_TOKEN = 'SAVE_TOKEN';
const FAILED_REQUEST = 'FAILED_REQUEST';

export const requestToken = () => ({ type: REQUEST_TOKEN, isLoading });

export const saveToken = (data) => ({ type: SAVE_TOKEN, data });

export const failedRequest = (error) => ({ type: FAILED_REQUEST, error });

export const getToken = () => async (dispatch) => {
  dispatch(requestToken);
  try {
    const response = await fetchToken();
    dispatch(saveToken(response));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

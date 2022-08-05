import fetchToken from '../../services/fetchTokenApi';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const requestToken = () => ({ type: REQUEST_TOKEN });

export const saveToken = (data) => ({ type: SAVE_TOKEN, data });

export const failedRequest = (error) => ({ type: FAILED_REQUEST, error });

export const getToken = () => async (dispatch) => {
  console.log('chamei getToken');
  dispatch(requestToken);
  try {
    const response = await fetchToken();
    dispatch(saveToken(response));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

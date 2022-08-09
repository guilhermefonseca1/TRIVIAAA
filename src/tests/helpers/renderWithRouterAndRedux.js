import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {  legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import React from 'react';
import { createMemoryHistory } from 'history';
import Reducer from '../../Redux/Reducer';

export const renderWithRouterAndRedux = (component, initialState, route = '/') => {
  const store = createStore(Reducer, initialState, applyMiddleware(thunk));
  const history = createMemoryHistory({ initialEntries: [route] });

  return {
    ...render(
      <Provider store={ store }>
        <Router history={ history }>
          {component}
        </Router>
      </Provider>,
    ),
    history,
    store,
  };
};

export default renderWithRouterAndRedux;

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { reduxObservable } from 'redux-observable';
import rootReducer from './reducers';
import Example from './components/Example';
import configureStore from './configureStore'

const store = configureStore();

render(
  <Provider store={store}>
    <Example />
  </Provider>,
  document.getElementById('app')
)

import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { fetchUserEpic } from './actions';
import rootReducer from './reducers';

// Epics handle async operations. An epic receives a stream of actions and
// outputs a stream of actions.
export const rootEpic = combineEpics(
  fetchUserEpic
);

const epicMiddleware = createEpicMiddleware(rootEpic);

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware)
  );
  return store;
}

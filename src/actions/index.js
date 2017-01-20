import * as Rx from 'rxjs';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_PENDING = 'FETCH_USER_PENDING';
export const FETCH_USER_FULFILLED = 'FETCH_USER_FULFILLED';
export const FETCH_USER_ABORTED = 'FETCH_USER_ABORTED';

var id = 0;

// An Epic operates on a stream of actions (by convention we suffix action with
// a dollar sign to indicate a stream of actions).
export const fetchUserEpic = action$ =>
  action$.ofType(FETCH_USER)
  // Discard in-flight request if fetchUser is called again.
  .switchMap(action =>
    Rx.Observable.of({ id: ++id, name: 'Bilbo Baggins', timestamp: new Date() })
    // Delaying to emulate an async request, like Rx.Observable.ajax('/api/path')
    .delay(1000)
    // When our request comes back, we transform it into an action
    // that is then automatically dispatched by the middleware
    .map(
      payload => createFetchUserFulfilledAction(payload)
    )
    // Abort fetching the user if someone dispatches an abort action
    .takeUntil(
      action$.ofType(FETCH_USER_ABORTED)
    )
    // Let's us immediately update the user's state so we can display
    // loading messages to the user, etc.
    .startWith({ type: FETCH_USER_PENDING });

// action creators
export const createFetchUserAction = username => ({ type: FETCH_USER, payload: username });
export const createFetchUserFulfilledAction = payload => ({ type: FETCH_USER_FULFILLED, payload });
export const createAbortFetchUserAction = () => ({ type: FETCH_USER_ABORTED });

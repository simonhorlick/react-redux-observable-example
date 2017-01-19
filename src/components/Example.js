import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createFetchUserAction, abortFetchUser } from '../actions';

// Component
const Example = ({ user, fetchUser, abortFetchUser }) => (
  <div>
    <button onClick={fetchUser}>fetch user</button>
    <button onClick={abortFetchUser}>abort fetch user</button>
    <div>Loading: {`${user.isLoading}`}</div>
    <pre>{JSON.stringify(user, null, 2)}</pre>
  </div>
);

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(createFetchUserAction('simonhorlick')),
  abortFetchUser: () => dispatch(abortFetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Example);

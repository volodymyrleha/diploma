import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginLayout from './components/login/LoginLayout';
import Workspace from './components/workspace/Workspace';

function App() {
  const token = useSelector(state => state.auth.token);
  const history = useHistory();

  useEffect(() => {
    if (token)
      history.replace('/');
    else
      history.replace('/login');
  }, [token, history]);

  return (
    <>
      <Switch>
        <Route exact path="/login" component={ LoginLayout } />
        <Route exact path="/" component={ Workspace } />
        <Route render={() => <Redirect to={{ pathname: "/" }} />} />
      </Switch>
      {<div id="loss-cont" />}
    </>
  );
}

export default App;

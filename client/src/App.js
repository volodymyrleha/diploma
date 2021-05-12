import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginLayout from './components/login/LoginLayout';
import Workspace from './components/workspace/Workspace';
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { suggestIcon } from './model';
import { trainModel } from "./model";

function App() {
  const token = useSelector(state => state.auth.token);
  const user = useSelector(state => state.user);
  const history = useHistory();
  const [model, setModel] = useState(null);
  const [encoder, setEncoder] = useState(null);
 
  const CONFIDENCE_THRESHOLD = 0.65;

  useEffect(() => {
    const loadModel = async () => {
      const sentenceEncoder = await use.load();
      const trainedModel = await trainModel(sentenceEncoder);
      setEncoder(sentenceEncoder);
      setModel(trainedModel);
    };
    loadModel();
  }, []);


  useEffect(() => {
    (async () => {
      if (!model)
        return;

      const predictedIcon = await suggestIcon(
        model,
        encoder,
        'read harry potter',
        CONFIDENCE_THRESHOLD
      );
      console.log(predictedIcon);
    })()
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

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

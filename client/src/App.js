import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginLayout from './components/login/LoginLayout';
import Workspace from './components/workspace/Workspace';
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { suggestTaskClass } from './model';
import { trainModel } from "./model";

function App() {
  const token = useSelector(state => state.auth.token);
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
    //loadModel();
  }, []);


  useEffect(() => {
    /*(async () => {
      if (!model)
        return;
      const prediction = await suggestTaskClass(
        model,
        encoder,
        'do 15 push ups',
        CONFIDENCE_THRESHOLD
      );
      console.log(prediction);
    })()*/
  });

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

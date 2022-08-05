import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './Pages/Game';
import Login from './Pages/Login';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
    </Switch>
  );
}

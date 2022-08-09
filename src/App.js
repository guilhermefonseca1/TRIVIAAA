import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Game from './Pages/Game';
import Login from './Pages/Login';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}

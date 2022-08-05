import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <div className="App">
      <Route path="/" exact component={ Login } />
      <Route path="/game" component={ Game } />
    </div>
  );
}

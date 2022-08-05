import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Config from './pages/Config';
import Login from './pages/Login';

export default function App() {
  return (
    <div className="App">
      <Route path="/" exact component={ Login } />
      <Route path="/config" exact component={ Config } />
    </div>
  );
}

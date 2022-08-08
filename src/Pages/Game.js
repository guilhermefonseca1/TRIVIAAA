import React, { Component } from 'react';
import Header from '../components/Header';
import logo from '../trivia.png';

export default class Game extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="App">
          <div className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>SUA VEZ</p>
          </div>
        </div>
      </div>
    );
  }
}

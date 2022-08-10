import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import '../Style/Header.css';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const gravatar = MD5(email).toString();

    return (
      <div className="header">
        <div className="userPicture">
          <img
            className="picture"
            src={ `https://www.gravatar.com/avatar/${gravatar}` }
            alt=""
            data-testid="header-profile-picture"
          />
          {/* <h2> Olá, </h2> */}
          <h2 data-testid="header-player-name">{name}</h2>
        </div>
        <div>
          <div className="App-header">
            <img src={ logo } className="logoHeader" alt="logo" />
          </div>
        </div>
        <div className="score">
          <h3>
            Your Score is:
          </h3>
          <h3 data-testid="header-score">{ score }</h3>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (store) => ({
  name: store.player.name,
  email: store.player.gravatarEmail,
  score: store.player.score,
});

export default connect(mapStateToProps)(Header);

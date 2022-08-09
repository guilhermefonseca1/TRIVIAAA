import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import '../Style/Header.css';
import logo from '../trivia.png';

class Header extends Component {
  render() {
    const { name, email } = this.props;
    const gravatar = MD5(email).toString();

    return (
      <div className="header">
        <div className="userPicture">
          <img
            src={ `https://www.gravatar.com/avatar/${gravatar}` }
            alt=""
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{name}</p>
        </div>
        <div>
          <div className="App-header">
            <img src={ logo } className="logoHeader" alt="logo" />
          </div>
        </div>
        <div className="score">
          <p>Your Score is:  </p>
          <p data-testid="header-score">0</p>
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
});

export default connect(mapStateToProps)(Header);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    const gravatar = MD5(email).toString();

    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt=""
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{ score }</p>
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

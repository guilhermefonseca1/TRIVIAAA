import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { MD5 } from 'crypto-js';
import fetchGravatar from '../services/fetchGravatar';

class Header extends Component {
  // getGravatar = async () => {
  //   const { email } = this.props;
  //   const user = MD5(email).toString();
  //   console.log(user);
  //   // fetch(`www.gravatar.com/avatar/${user}`);
  // }

  render() {
    const { name, email } = this.props;
    return (
      <div>
        {/* <img src={ fetchGravatar(email) } alt="" /> */}
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">0</p>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  name: store.player.name,
  email: store.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);

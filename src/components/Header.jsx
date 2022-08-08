import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { MD5 } from 'crypto-js';
import { MD5 } from 'crypto-js';

class Header extends Component {
  // getGravatar = async () => {
  //   const { email } = this.props;
  //   const user = MD5(email).toString();
  //   console.log(user);
  //   // fetch(`www.gravatar.com/avatar/${user}`);
  // }
  // async componentDidMount () {
  //   await fetchGravatar();
  // }

  render() {
    const { name, email } = this.props;
    const gravatar = MD5(email).toString();

    return (
      <div>
        <img
          src={ `https://www.gravatar.com/avatar/${gravatar}` }
          alt=""
          data-testid="header-profile-picture"
        />
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

import React from 'react';
import propTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      gravatarImageUrl: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const UrlEnd = md5(email).toString();
    this.setState({
      gravatarImageUrl: `https://www.gravatar.com/avatar/${UrlEnd}`,
    });
  }

  render() {
    const { username, score } = this.props;
    const { gravatarImageUrl } = this.state;
    const altText = `Imagem de ${username}`;
    return (
      <div>
        <header>
          <div>
            <img
              src={ gravatarImageUrl }
              data-testid="header-profile-picture"
              alt={ altText }
            />
            <p data-testid="header-player-name">{username}</p>
          </div>
          <h4 data-testid="header-score">{ `Score = ${score}` }</h4>
        </header>
      </div>
    );
  }
}

Game.propTypes = {
  username: propTypes.string.isRequired,
  email: propTypes.string.isRequired,
  score: propTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  username: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

export default connect(mapStateToProps, null)(Game);

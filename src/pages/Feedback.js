import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
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
    const { gravatarImageUrl } = this.state;
    const { username, scores } = this.props;
    const altText = `Imagem de ${username}`;
    return (
      <div>
        <header>
          <h1>header</h1>
          <img
            src={ gravatarImageUrl }
            data-testid="header-profile-picture"
            alt={ altText }
          />
          <p data-testid="header-player-name">{ username }</p>
          <p data-testid="header-score">{ scores }</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  username: store.player.name,
  scores: store.player.score,
  email: store.player.gravatarEmail,

});

Feedback.propTypes = {
  username: PropTypes.string.isRequired,
  scores: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);

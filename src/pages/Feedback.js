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

  getFeedback = () => {
    const { assertions } = this.props;
    const MIN_ASSERTIONS = 3;
    if (assertions >= MIN_ASSERTIONS) {
      return 'Well Done!';
    } return 'Could be better...';
  }

  render() {
    const { gravatarImageUrl } = this.state;
    const { username, scores } = this.props;
    const altText = `Imagem de ${username}`;
    return (
      <div>
        <header>
          <img
            src={ gravatarImageUrl }
            data-testid="header-profile-picture"
            alt={ altText }
          />
          <h1 data-testid="feedback-text">
            { this.getFeedback }
          </h1>
          <p data-testid="header-player-name">{ username }</p>
          <p data-testid="header-score">{ scores }</p>
          console.log('oi')
        </header>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  username: store.player.name,
  scores: store.player.score,
  email: store.player.gravatarEmail,
  feedbackText: store.player.feedback,

});

Feedback.propTypes = {
  username: PropTypes.string.isRequired,
  scores: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);

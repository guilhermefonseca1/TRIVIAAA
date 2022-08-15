import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import Header from '../components/Header';
import { getAssertions, getScorePoints } from '../Redux/Action';
import '../Style/Feedback.css';

class Feedback extends Component {
    countAsserts = () => {
      const { count } = this.props;
      const number = 3;
      if (count < number) {
        return 'Could be better...';
      }
      return 'Well Done!';
    };

    handleLocalStorageRanking = () => {
      const { name, email, score, history } = this.props;
      const gravatar = MD5(email).toString();
      const ranking = { name, score, gravatar };

      const token = localStorage.getItem('token');
      const playerInfo = { ranking, token };

      if (!localStorage.getItem('players')) {
        localStorage.setItem('players', '[]');
      }
      const loadPlayers = JSON.parse(localStorage.getItem('players'));
      const saveNewPlayers = [...loadPlayers, playerInfo];

      localStorage.setItem('players', JSON.stringify(saveNewPlayers));
      history.push('/ranking');
    }

    handlePlayAgainBtn = () => {
      const { history, score, dispatch, count } = this.props;
      const negative = -1;
      const resetScore = score * negative;
      const resetAssertions = count * negative;

      dispatch(getScorePoints(resetScore));
      dispatch(getAssertions(resetAssertions));
      history.push('/');
    }

    render() {
      const { count, score } = this.props;
      return (
        <div>
          <Header />
          <div className="feedbackConteiner">
            <h1
              data-testid="feedback-text"
            >
              { this.countAsserts() }
            </h1>
            <div className="pointsConteiner">
              <div className="pointsScore">
                <h2> Your score: </h2>
                <h1
                  data-testid="feedback-total-score"
                >
                  {score}
                </h1>
              </div>
              <div className="pointsHit">
                <h2> You hit: </h2>
                <h1
                  data-testid="feedback-total-question"
                >
                  {count}
                </h1>
              </div>
            </div>
            <div className="buttonsFeedback">
              <button
                className="buttonsFeed"
                data-testid="btn-play-again"
                type="button"
                onClick={ this.handlePlayAgainBtn }
              >
                Play Again
              </button>
              <button
                className="buttonsFeed"
                data-testid="btn-ranking"
                type="button"
                onClick={ this.handleLocalStorageRanking }
              >
                Ranking
              </button>
            </div>
          </div>
        </div>
      );
    }
}

Feedback.propTypes = {
  count: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  score: PropTypes.any,
}.isRequired;

const mapStateToProps = (store) => ({
  count: store.player.assertions,
  score: store.player.score,
  name: store.player.name,
  email: store.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);

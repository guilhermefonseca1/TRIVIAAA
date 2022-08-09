import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import Header from '../components/Header';
import Ranking from './Ranking';

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
      const ranking = [name, score, gravatar];
      // const token = localStorage.getItem('token');
      // console.log(name);
      localStorage.setItem('ranking', JSON.stringify(ranking));
      // history.push('/ranking');
    }

    render() {
      const { count, score, history } = this.props;
      return (
        <div>
          <Header />
          <h1
            data-testid="feedback-text"
          >
            { this.countAsserts }
          </h1>
          <h2> Your score: </h2>
          <h2
            data-testid="feedback-total-score"
          >
            {score}
          </h2>
          <h2> Your score: </h2>
          <h2
            data-testid="feedback-total-question"
          >
            {count}
          </h2>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.handleLocalStorageRanking }
          >
            Ranking
          </button>
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
  count: store.assertions,
  score: store.score,
  name: store.player.name,
  email: store.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);

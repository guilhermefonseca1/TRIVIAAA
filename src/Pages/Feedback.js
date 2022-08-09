import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
    countAsserts = () => {
      const { count } = this.props;
      const number = 3;
      if (count < number) {
        return 'Could be better...';
      }
      return 'Well Done!';
    };

    render() {
      const { count, score, history } = this.props;
      return (
        <div>
          <Header />
          <h1
            data-testid="feedback-text"
          >
            { this.countAsserts() }
          </h1>
          <h2> Your score: </h2>
          <h2
            data-testid="feedback-total-score"
          >
            {score}
          </h2>
          <h2> You hit: </h2>
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
            onClick={ () => history.push('/ranking') }
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
  count: store.player.assertions,
  score: store.player.score,
});

export default connect(mapStateToProps)(Feedback);

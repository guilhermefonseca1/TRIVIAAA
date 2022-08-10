import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssertions, getScorePoints } from '../Redux/Action';

class Ranking extends React.Component {
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
    const ranking = JSON.parse(localStorage.getItem('players'));
    const array = ranking.map((el) => Object.values(el.ranking))
      .sort((a, b) => b[1] - a[1]);
    console.log(array);

    return (
      <div>
        <section>
          <h1 data-testid="ranking-title">TITLE</h1>
          <ol>
            {
              array && array.map((el, index) => (
                <li key={ index }>
                  <div>
                    <p data-testid={ `player-name-${index}` }>
                      { el[0] }
                    </p>
                    <p data-testid={ `player-score-${index}` }>
                      { el[1] }
                    </p>
                    <img
                      src={ `https://www.gravatar.com/avatar/${el[2]}` }
                      alt="ranking"
                    />
                  </div>
                </li>
              ))
            }
          </ol>
        </section>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ this.handlePlayAgainBtn }
        >
          home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (store) => ({
  count: store.player.assertions,
  name: store.player.name,
  email: store.player.gravatarEmail,
  score: store.player.score,
});

export default connect(mapStateToProps)(Ranking);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAssertions, getScorePoints } from '../Redux/Action';
import '../Style/Ranking.css';

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
      <div className="rankingContainer">
        <section>
          <h1
            className="titleRank"
            data-testid="ranking-title"
          >
            Ranking
          </h1>
          <ol className="olRank">
            {
              array && array.map((el, index) => (
                <ul
                  key={ index }
                  className="rankitem"
                >
                  <div className="itemConteiner">
                    <h1
                      data-testid={ `player-score-${index}` }
                      className="rankScore"
                    >
                      { el[1] }
                    </h1>
                    <img
                      src={ `https://www.gravatar.com/avatar/${el[2]}` }
                      alt="ranking"
                      className="imgRank"
                    />
                    <h1
                      data-testid={ `player-name-${index}` }
                      className="playerRank"
                    >
                      { el[0] }
                    </h1>
                  </div>
                </ul>
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

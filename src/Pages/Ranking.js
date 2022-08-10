import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {
    const { history } = this.props;
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
                <li key={ el[0] }>
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
          onClick={ () => history.push('/') }
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
  name: store.player.name,
  email: store.player.gravatarEmail,
  score: store.player.score,
});

export default connect(mapStateToProps)(Ranking);
